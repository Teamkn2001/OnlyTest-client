import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PracticeProps {
  title: string;
  audio?: string | null;
  instruction?: string | null;
  passage?: string | null;
  image?: string | null;
}

// useage example
{
  /* <Passage
        audio="https://www.soundjay.com/misc/sounds/bell-ringing-05.wav" ===> audio file (optional)
        image="https://picsum.photos/id/237/200/300" ===> image file (optional)
        title="Sample Question " ===> title (required)
        instruction={"Instructions: Listen to the audio clip and answer the question."} ===> instruction (optional)
        passage={"Harry Potter is a series of seven fantasy novels "} ==> passage (optional)
      /> */
}

export default function Passage({
  title,
  audio = null,
  instruction = null,
  passage = null,
  image = null,
}: PracticeProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (): void => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = (): void => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const seekTime = percent * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage: number =
    duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full mx-auto min-h-50 bg-white">
      <div className="py-6">
        {/* Title and Audio Section */}
        <div className="flex items-stretch mb-6">
          {/* Title Section */}
          <div className="bg-orange-400 px-4 py-2 font-extrabold w-[30%] flex-shrink-0 flex items-center">
            {title}
          </div>

          {/* Audio Player Section */}
          {audio && (
            <div className="flex items-center gap-3 flex-1 bg-gray-100 px-4">
              <Button
                onClick={togglePlay}
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 bg-white border-gray-300 hover:bg-gray-50 flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-gray-600" />
                ) : (
                  <Play className="h-4 w-4 text-gray-600" />
                )}
              </Button>

              <div className="flex-1 mx-2">
                <div
                  className="relative cursor-pointer h-2 bg-gray-300 rounded-full overflow-hidden w-full"
                  onClick={handleSeek}
                >
                  <div
                    className="h-full bg-orange-400 transition-all duration-150"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="text-sm text-gray-600 font-mono min-w-[40px] flex-shrink-0">
                {formatTime(duration)}
              </div>

              <audio
                ref={audioRef}
                src={audio}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                preload="metadata"
              />
            </div>
          )}
        </div>

        {/* Image Section */}
        {image && (
          <div className="mb-6 flex justify-center">
            <img
              src={image}
              alt="Learning content"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Instruction Section */}
        {instruction && (
          <div className="p-4 px-10 rounded-lg">
            <p className="text-gray-700 font-medium leading-relaxed">
              {instruction}
            </p>
          </div>
        )}

        {/* Passage Section */}
        {passage && (
          <div className="p-4 px-10 rounded-lg">
            <p className="text-gray-800 font-semibold leading-relaxed whitespace-pre-wrap">
              {passage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
