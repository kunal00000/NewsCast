import { notFound } from 'next/navigation'
import { CLOUDFLARE_R2_MEDIA_SUBDOMAIN, TOPICS } from '@/lib/constants'
import React from 'react'
import prisma from '@/lib/prisma'
import AudioPlayer from '@/components/home/audio-player'

async function Page({params}: {params: {topic: string}}) {
  if (!params.topic || !TOPICS.includes(params.topic)) {
    return notFound()
  }

  const podcast = await prisma.podcast.findFirst({
    where: {
      topic: params.topic
    }
  })

  const episodes = await prisma.episode.findMany({
    where: {
      podcastType: params.topic,
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  return (
    <div className='z-10'>
      <div className="space-y-4 text-center font-oswald">
        <h2 className="bg-gradient-to-br from-white to-[#757575] bg-clip-text text-3xl text-transparent drop-shadow-sm [text-wrap:balance] md:text-5xl md:leading-[5rem]">
        {podcast?.title}
        </h2>
        <p className="text-md mx-auto mt-4 max-w-2xl tracking-wider text-white/50 md:text-lg">
        {podcast?.description}
        </p>
      </div>

      {episodes.map((episode,i) => 
        <AudioPlayer
          key={episode.id}
          episodeTitle={episode.title || 'Untitled'}
          episodeNumber={`${i+1}`}
          src={`${CLOUDFLARE_R2_MEDIA_SUBDOMAIN}/${episode.filename}`}
          date={episode.createdAt ? formatDate(new Date(episode.createdAt)) : 'Unknown date'}
          captions={episode.raw_script || 'No description'}
        />
      )}
    </div>
  )
}

export default Page

function formatDate(date: Date) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const day = date.getDate();
  const suffix = getOrdinalSuffix(day);
  const month = months[date.getMonth()];

  return `${month} ${day}'${suffix}`;
}

function getOrdinalSuffix(day:number) {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}