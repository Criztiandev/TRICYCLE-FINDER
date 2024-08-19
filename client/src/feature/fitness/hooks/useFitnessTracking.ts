import { useState, useEffect } from "react";
import usePedometer from "./usePedoMeter";
import useMovementTracking from "./useMovementTracking";
import useTimer from "./useActivityTimer";
import useLocation from "@/common/hooks/utils/useLocation";

const useFitnessTracking = () => {
  const { location } = useLocation();
  const { stepCount, isPedometerAvailable } = usePedometer();
  const {
    isTracking,
    movements,
    totalDistance,
    errorMsg,
    startTracking,
    stopTracking,
  } = useMovementTracking();
  const { elapsedTime, isRunning, startTimer, stopTimer, resetTimer } =
    useTimer();
  const [averagePace, setAveragePace] = useState<number | null>(null);

  useEffect(() => {
    if (totalDistance > 0 && elapsedTime > 0) {
      const paceInMinutesPerKm = elapsedTime / 60 / (totalDistance / 1000);
      setAveragePace(paceInMinutesPerKm);
    }
  }, [totalDistance, elapsedTime]);

  const startAllTracking = () => {
    startTracking();
    startTimer();
  };

  const stopAllTracking = () => {
    stopTracking();
    stopTimer();
  };

  return {
    location,
    stepCount,
    isPedometerAvailable,
    isTracking,
    movements,
    totalDistance,
    elapsedTime,
    averagePace,
    errorMsg,
    startAllTracking,
    stopAllTracking,
    resetTimer,
  };
};

export default useFitnessTracking;
