import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserPreference } from "./context/UserPreferenceContext";

export default function HomeScreen() {
  const router = useRouter();
  const { userPreference } = useUserPreference();
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Ensure splash screen shows immediately
    setShowSplash(true);

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

        // Check if user is authenticated
        const authValue = await AsyncStorage.getItem("isAuthenticated");
        setIsAuthenticated(authValue === "true");
      } catch (error) {
        console.error("Error checking first launch:", error);
        setIsFirstLaunch(false); // Default to not first launch on error
        setIsAuthenticated(false);
      }
    };

    checkFirstLaunch();
  }, []);

  // Always show splash screen first
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

  // If authenticated and has preference, go to main app
  useEffect(() => {
    if (isAuthenticated && userPreference) {
      router.push("/navigation/AppNavigator");
    }
  }, [isAuthenticated, userPreference, router]);

  // If not first launch, show auth screens
  return (
    <View className="w-full h-full">
      <LanguageSelection />
    </View>
  );
}
