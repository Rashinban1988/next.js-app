'use client';
import React, { useEffect, useState } from 'react';
import axios, { AxiosInstance } from 'axios';

interface Transcription {
  start_time: number;
  text: string;
}

interface TranscriptionDetailProps {
  transcription: Transcription[];
  file: string;
}

const TranscriptionDetail: React.FC<TranscriptionDetailProps> = ({ transcription, file }) => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>(transcription);
  const [currentTime, setCurrentTime] = useState(0); // 現在の再生時間を追跡するための状態

  useEffect(() => {
    const player = document.getElementById('videoPlayer') as HTMLVideoElement;
    const updateTime = () => {
      setCurrentTime(player.currentTime);
    };
    player.addEventListener('timeupdate', updateTime);

    return () => {
      player.removeEventListener('timeupdate', updateTime);
    };
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout | null = null;

    const jumpToHighlighted = () => {
      const highlighted = document.querySelector('.bg-yellow-200');
      if (highlighted) {
        highlighted.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };

    const handleUserActivity = () => {
      clearTimeout(timeoutId);
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      timeoutId = setTimeout(() => {
        intervalId = setInterval(jumpToHighlighted, 333); // 1秒ごとに実行
      }, 3000); // 操作後3秒で開始
    };

    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keypress', handleUserActivity);

    return () => {
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keypress', handleUserActivity);
      clearTimeout(timeoutId);
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center my-8">
        <video id="videoPlayer" className="w-full max-w-lg shadow-lg rounded-lg" controls>
          <source src='/uploads/sampleSuper_BzJTk.mp3' type="video/mp4" />
          {/* <source src={`uploads/${file}`} type="video/mp4" /> */}
        </video>
      </div>
      <ul id="transcriptionList" className="max-w-lg mx-auto my-8 bg-white rounded-lg shadow overflow-auto" style={{ maxHeight: '500px' }}>
        {transcriptions.map((t, index) => {
          const minutes = Math.floor(t.start_time / 60).toString().padStart(2, '0');
          const seconds = (t.start_time % 60).toString().padStart(2, '0');
          return (
            <li
              key={index}
              className={`cursor-pointer p-4 hover:bg-gray-100 ${currentTime >= t.start_time && currentTime < (transcriptions[index + 1]?.start_time || Infinity) ? 'bg-yellow-200' : ''}`}
              onClick={() => {
                const player = document.getElementById('videoPlayer') as HTMLVideoElement;
                player.currentTime = t.start_time;
                player.play();
              }}
            >
              <span className="text-sm font-semibold mr-2">{`${minutes}:${seconds}`}</span><br />
              {t.text}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TranscriptionDetail;