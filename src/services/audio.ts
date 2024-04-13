import textToSpeech from '@google-cloud/text-to-speech';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { CLOUDFLARE_R2_ACCESS_KEY, CLOUDFLARE_R2_BUCKET_NAME, CLOUDFLARE_R2_ENDPOINT, CLOUDFLARE_R2_SECRET_KEY } from '@/lib/constants';

type SynthesizeSpeechRequest = {
  input: { ssml: string };
  voice: { languageCode: string; name: string; ssmlGender: 'MALE' };
  audioConfig: { audioEncoding: 'MP3' };
};

// Expected error: service_account.json not found
process.env.GOOGLE_APPLICATION_CREDENTIALS = './service_account.json';
const client = new textToSpeech.TextToSpeechClient();

export async function convertScriptToAudio(script: string, filename: string) {
  const request: SynthesizeSpeechRequest = {
    input: { ssml: script },
    voice: {
      languageCode: 'en-IN',
      name: 'en-IN-NEURAL2-B',
      ssmlGender: 'MALE',
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);

  let fileData;
  if (typeof response.audioContent === 'string') {
    fileData = Buffer.from(response.audioContent, 'base64');
  } else if (response.audioContent instanceof Uint8Array) {
    fileData = Buffer.from(response.audioContent);
  } else if (
    response.audioContent === null ||
    response.audioContent === undefined
  ) {
    console.error('No audio data provided.');
    return;
  }

  const s3Client = new S3Client({
    endpoint: CLOUDFLARE_R2_ENDPOINT,
    region: 'auto',
    credentials: {
      accessKeyId: CLOUDFLARE_R2_ACCESS_KEY || '',
      secretAccessKey: CLOUDFLARE_R2_SECRET_KEY || '',
    },
  });

  const putObjectCommand = new PutObjectCommand({
    Bucket: CLOUDFLARE_R2_BUCKET_NAME,
    Key: filename,
    Body: fileData,
    ContentType: 'audio/mpeg',
  });

  await s3Client.send(putObjectCommand);

  console.log('Audio content uploaded to S3');
}
