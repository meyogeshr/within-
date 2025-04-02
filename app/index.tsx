import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const value = await AsyncStorage.getItem("hasLaunched");
        if (value === null) {
          // First time launching the app
          await AsyncStorage.setItem("hasLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking first launch:", error);
        setIsFirstLaunch(false); // Default to not first launch on error
      }
    };

    checkFirstLaunch();
  }, []);

  if (showSplash) {
    return (
      <SplashScreen onComplete={() => setShowSplash(false)} duration={3000} />
    );
  }

  if (isFirstLaunch === null) {
    // Still loading
    return <View className="w-full h-full bg-white" />;
  }

  if (isFirstLaunch) {
    return <LanguageSelection />;
  }

  // If not first launch, show auth screens
  return (
    <View className="w-full h-full">
      <LanguageSelection />
    </View>
  );
}
