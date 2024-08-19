import { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";

const usePedometer = () => {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);

  useEffect(() => {
    let subscription: ReturnType<typeof Pedometer.watchStepCount>;

    (async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable);

      if (isAvailable) {
        subscription = Pedometer.watchStepCount((result) => {
          setStepCount(result.steps);
        });
      }
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { stepCount, isPedometerAvailable };
};

export default usePedometer;
