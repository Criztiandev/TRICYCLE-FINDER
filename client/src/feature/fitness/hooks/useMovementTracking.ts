import { useState, useCallback } from "react";
import * as Location from "expo-location";

const useMovementTracking = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<Location.LocationSubscription | null>(
    null
  );
  const [movements, setMovements] = useState<Location.LocationObject[]>([]);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const startTracking = useCallback(async () => {
    if (isTracking) return;

    try {
      const initialLocation = await Location.getCurrentPositionAsync({});
      setMovements([initialLocation]);

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (newLocation) => {
          setMovements((prev) => {
            const updatedMovements = [...prev, newLocation];

            if (updatedMovements.length > 1) {
              const lastTwo = updatedMovements.slice(-2);
              const newDistance = calculateDistance(
                lastTwo[0].coords.latitude,
                lastTwo[0].coords.longitude,
                lastTwo[1].coords.latitude,
                lastTwo[1].coords.longitude
              );
              setTotalDistance((prevDistance) => prevDistance + newDistance);
            }

            return updatedMovements;
          });
        }
      );
      setWatchId(subscription);
      setIsTracking(true);
    } catch (err) {
      setErrorMsg(
        "Failed to start tracking: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  }, [isTracking]);

  const stopTracking = useCallback(() => {
    if (!isTracking || watchId === null) return;

    watchId.remove();
    setWatchId(null);
    setIsTracking(false);
  }, [isTracking, watchId]);

  return {
    isTracking,
    movements,
    totalDistance,
    errorMsg,
    startTracking,
    stopTracking,
  };
};

export default useMovementTracking;
