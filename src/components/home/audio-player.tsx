'use client';

import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({
  episodeTitle,
  episodeNumber,
  src,
}: {
  episodeTitle: string;
  episodeNumber: string;
  src: string;
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      // @ts-ignore
      audioRef.current.pause();
    } else {
      // @ts-ignore
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const audio = document.getElementsByTagName('audio')[0];

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateCurrentTime);

    return () => {
      audio.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative col-span-1 mx-auto my-12 max-w-md rounded-lg bg-gradient-to-br from-white/30 via-white/25 to-white/30 p-4 shadow-md backdrop-blur-xl">
      <div className="flex items-center px-4">
        <button
          onClick={togglePlay}
          className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50"
        >
          {isPlaying ? (
            <svg
              className="h-8 w-7 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-7 text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.872v4.256a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>

        <div>
          <h3 className="text-lg font-medium text-stone-300">{episodeTitle}</h3>
          <p className="text-sm text-white/50">
            Amara Night | Episode {episodeNumber} | {formatTime(duration)}
          </p>
        </div>
      </div>

      <div className="mt-4 px-6">
        <div className="h-2 w-full rounded-full bg-gray-800">
          <div
            className="h-2 rounded-full bg-red-600"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
