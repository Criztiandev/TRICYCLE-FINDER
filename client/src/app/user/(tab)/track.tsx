import { Stack } from "expo-router";
import ScreenBaseLayout from "@/layout/ScreenBaseLayout";
import XStack from "@/common/components/stacks/XStack";
import Button from "@/common/components/ui/Button";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { useEffect, useState } from "react";
import useFitnessTracking from "@/feature/fitness/hooks/useFitnessTracking";

const RootScreen = () => {
  const {
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
  } = useFitnessTracking();

  const [mapRegion, setMapRegion] = useState<any>(null);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <TrackHeader />
      <ScreenBaseLayout>
        <View className="flex-1">
          {errorMsg ? (
            <Text>{errorMsg}</Text>
          ) : mapRegion ? (
            <MapView
              provider={PROVIDER_GOOGLE}
              initialRegion={mapRegion}
              region={mapRegion}
              className="flex-1"
              showsUserLocation
              showsMyLocationButton
            >
              {movements.length > 1 && (
                <Polyline
                  coordinates={movements.map((m) => ({
                    latitude: m.coords.latitude,
                    longitude: m.coords.longitude,
                  }))}
                  strokeColor="#000"
                  strokeWidth={3}
                />
              )}
            </MapView>
          ) : (
            <Text>Loading location...</Text>
          )}
        </View>
        <View className="p-4">
          <Text>Time: {formatTime(elapsedTime)}</Text>
          <Text>Distance: {(totalDistance / 1000).toFixed(2)} km</Text>
          <Text>
            Pace: {averagePace ? `${averagePace.toFixed(2)} min/km` : "N/A"}
          </Text>
          {isPedometerAvailable && <Text>Steps: {stepCount}</Text>}
        </View>
        <XStack className="space-x-4 p-4">
          <Button
            className="flex-1"
            onPress={isTracking ? stopAllTracking : startAllTracking}
          >
            {isTracking ? "Stop" : "Start"}
          </Button>
          <Button className="flex-1" onPress={resetTimer}>
            Reset
          </Button>
        </XStack>
      </ScreenBaseLayout>
    </>
  );
};

export default RootScreen;

const TrackHeader = () => {
  return (
    <Stack.Screen
      options={{
        title: "Activity",
      }}
    />
  );
};
