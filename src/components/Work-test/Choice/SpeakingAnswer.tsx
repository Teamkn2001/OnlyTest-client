import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, X, RotateCcw } from 'lucide-react';

interface SpeakingAnswerProps {
  onRecordingComplete?: (audioBlob: Blob, audioUrl: string) => void;
  onRecordingStart?: () => void;
  onRecordingStop?: () => void;
  maxDuration?: number; // in seconds
  className?: string;
}

export default function SpeakingAnswer({
  onRecordingComplete,
  onRecordingStart,
  onRecordingStop,
  maxDuration = 300, // 5 minutes default
  className = ""
}: SpeakingAnswerProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecording, setHasRecording] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async (): Promise<void> => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecording(true);
        onRecordingComplete?.(audioBlob, url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      onRecordingStart?.();

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= maxDuration) {
            stopRecording();
          }
          return newTime;
        });
      }, 1000);

    } catch (err) {
      setError("Could not access microphone. Please check permissions.");
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = (): void => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      onRecordingStop?.();

      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const playRecording = (): void => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pausePlayback = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) {
      setPlaybackTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      // Only set duration if it's a valid number
      if (isFinite(audioDuration) && !isNaN(audioDuration)) {
        setDuration(audioDuration);
      } else {
        setDuration(0);
      }
    }
  };

  const handleEnded = (): void => {
    setIsPlaying(false);
    setPlaybackTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (audioRef.current && duration > 0 && isFinite(duration)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const seekTime = percent * duration;
      audioRef.current.currentTime = seekTime;
      setPlaybackTime(seekTime);
    }
  };

  const resetRecording = (): void => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl("");
    setHasRecording(false);
    setIsPlaying(false);
    setPlaybackTime(0);
    setDuration(0);
    setRecordingTime(0);
    setError("");
  };

  const formatTime = (time: number): string => {
    // Handle invalid time values
    if (!isFinite(time) || isNaN(time) || time < 0) {
      return '00:00';
    }
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 && isFinite(duration) ? (playbackTime / duration) * 100 : 0;

  return (
    <div className={`w-full max-w-4xl mx-auto bg-white ${className}`}>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Recording State */}
      {!hasRecording && (
        <div className="text-center py-8">
          {!isRecording ? (
            <div className="space-y-4">
              <button
                onClick={startRecording}
                className="w-16 h-16 bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center justify-center transition-colors duration-200 mx-auto shadow-lg"
              >
                <Mic className="w-8 h-8 text-white" />
              </button>
              <p className="text-gray-600 text-sm">Click to start recording</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={stopRecording}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors duration-200 shadow-lg"
                >
                  <Square className="w-8 h-8 text-white" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-600 font-medium">Recording...</span>
                </div>
                <p className="text-lg font-mono text-gray-700">{formatTime(recordingTime)}</p>
                <p className="text-sm text-gray-500">Max duration: {formatTime(maxDuration)}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Playback State */}
      {hasRecording && audioUrl && (
        <div className="space-y-4 py-8">
          <div className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg">
            <button
              onClick={isPlaying ? pausePlayback : playRecording}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-800 rounded flex items-center justify-center transition-colors duration-200"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            <div className="flex-1">
              <div
                className="relative cursor-pointer h-2 bg-gray-300 rounded-full overflow-hidden"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-gray-600 transition-all duration-150"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="text-sm text-gray-600 font-mono min-w-[40px]">
              {formatTime(duration)}
            </div>

            <button
              onClick={resetRecording}
              className="w-10 h-10 bg-gray-700 hover:bg-gray-800 rounded flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex justify-center">
            <button
              onClick={resetRecording}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="text-sm">Record again</span>
            </button>
          </div>

          <audio
            ref={audioRef}
            src={audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            preload="metadata"
          />
        </div>
      )}
    </div>
  );
}