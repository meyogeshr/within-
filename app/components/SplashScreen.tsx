import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Image } from "expo-image";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import * as Haptics from "expo-haptics";

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
  const slideUpAnim = React.useRef(new Animated.Value(50)).current;
  const router = useRouter();

  useEffect(() => {
    // Provide haptic feedback when splash screen appears
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Start animations immediately
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
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
      // Fade out animation before completing
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        onComplete();
      });
    }, duration - 500); // Subtract animation duration

    return () => clearTimeout(timer);
  }, [
    fadeAnim,
    scaleAnim,
    rotateAnim,
    pulseAnim,
    slideUpAnim,
    duration,
    onComplete,
  ]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "15deg"],
  });

  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <Animated.View
        className="items-center justify-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideUpAnim }],
        }}
      >
        {/* Animated Background Circles */}
        <Animated.View
          className="absolute w-72 h-72 rounded-full bg-blue-100 opacity-60"
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        />
        <Animated.View
          className="absolute w-56 h-56 rounded-full bg-blue-200 opacity-40"
          style={{
            transform: [{ scale: Animated.multiply(pulseAnim, 0.9) }],
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
            className="w-44 h-44 mb-8"
            contentFit="contain"
          />
        </Animated.View>

        {/* App Name */}
        <Animated.Text
          className="text-5xl font-bold text-blue-600 mb-3"
          style={{
            transform: [{ scale: pulseAnim }],
          }}
        >
          {t("appName")}
        </Animated.Text>

        {/* Tagline */}
        <Animated.Text
          className="text-lg text-gray-600 mb-12 text-center px-6"
          style={{
            opacity: Animated.multiply(fadeAnim, 0.9),
            transform: [{ translateY: Animated.multiply(slideUpAnim, 0.5) }],
          }}
        >
          {t("tagline")}
        </Animated.Text>

        {/* Loading Indicator */}
        <ActivityIndicator size="large" color="#3b82f6" />
      </Animated.View>
    </View>
  );
}
