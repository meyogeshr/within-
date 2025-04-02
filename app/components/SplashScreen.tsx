import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

interface SplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export default function SplashScreen({
  onComplete = () => {},
  duration = 3000,
}: SplashScreenProps) {
  const { t } = useTranslation();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const router = useRouter();

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();

    // Set timeout to navigate away after duration
    const timer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, rotateAnim, pulseAnim, duration, onComplete]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "10deg"],
  });

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <Animated.View
        className="items-center justify-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Animated Background Circle */}
        <Animated.View
          className="absolute w-64 h-64 rounded-full bg-blue-100 opacity-70"
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        />

        {/* App Logo with rotation */}
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
          }}
        >
          <Image
            source={require("../../assets/images/splash-icon.png")}
            className="w-40 h-40 mb-6"
            contentFit="contain"
          />
        </Animated.View>

        {/* App Name */}
        <Animated.Text
          className="text-4xl font-bold text-blue-600 mb-2"
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          {t("appName")}
        </Animated.Text>

        {/* Tagline */}
        <Text className="text-lg text-gray-600 mb-10 text-center px-6">
          {t("tagline")}
        </Text>

        {/* Loading Indicator */}
        <ActivityIndicator size="large" color="#3b82f6" />
      </Animated.View>
    </View>
  );
}
