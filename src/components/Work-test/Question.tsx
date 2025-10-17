import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionProps {
  question?: string;
  image?: string;
  audio?: string;
  guideline?: string;
}

export default function Question({
  question,
  image,
  audio,
  guideline,
}: QuestionProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if any content is provided
  const hasContent = question || image || audio || guideline;

  // Audio control functions
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

  // Show message if no content is provided
  if (!hasContent) {
    return (
      <div className="w-full mx-auto bg-white">
        <div className="py-6">
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 text-lg">Question data not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full  mx-auto">
      <div className="py-6">
        {/* Question Text Section */}
        {question && (
          <div className="p-4 px-10">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
              {question}
            </p>
          </div>
        )}
        {/* Audio Player Section */}
        {audio && (
          <div className="mb-6 px-8">
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg">
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
                    className="h-full bg-blue-500 transition-all duration-150"
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
          </div>
        )}

        {/* Image Section */}
        {image && (
          <div className="mb-6 flex justify-center">
            <img
              src={image}
              alt="Question content"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
