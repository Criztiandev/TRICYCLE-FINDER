import { useState, useEffect, useCallback } from "react";

const useActivityTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && startTime !== null) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, startTime]);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime * 1000);
  }, [elapsedTime]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setElapsedTime(0);
    setStartTime(null);
  }, []);

  return { elapsedTime, isRunning, startTimer, stopTimer, resetTimer };
};

export default useActivityTimer;
