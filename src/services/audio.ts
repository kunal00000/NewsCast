import textToSpeech from '@google-cloud/text-to-speech';
import util from 'util';
import fs from 'fs';

type SynthesizeSpeechRequest = {
  input: { ssml: string };
  voice: { languageCode: string; name: string; ssmlGender: 'MALE' };
  audioConfig: { audioEncoding: 'MP3' };
};

process.env.GOOGLE_APPLICATION_CREDENTIALS = './service_account.json';
const client = new textToSpeech.TextToSpeechClient();

export async function convertScriptToAudio(script: string) {
  const request: SynthesizeSpeechRequest = {
    input: { ssml: script },
    voice: {
      languageCode: 'en-IN',
      name: 'en-IN-NEURAL2-A',
      ssmlGender: 'MALE',
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);

  const writeFile = util.promisify(fs.writeFile);
  // @ts-expect-error
  await writeFile('demo.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: output.mp3');
}
