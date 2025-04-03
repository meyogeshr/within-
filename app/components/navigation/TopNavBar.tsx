import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { User, Bell } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface TopNavBarProps {
  onProfilePress: () => void;
  onNotificationPress: () => void;
}

export default function TopNavBar({
  onProfilePress,
  onNotificationPress,
}: TopNavBarProps) {
  const { t } = useTranslation();

  const handleProfilePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onProfilePress();
  };

  const handleNotificationPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onNotificationPress();
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity
        onPress={handleProfilePress}
        className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center"
      >
        <User size={20} color="#3b82f6" />
      </TouchableOpacity>

      <Text className="text-xl font-bold text-blue-600">{t("appName")}</Text>

      <TouchableOpacity
        onPress={handleNotificationPress}
        className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center"
      >
        <Bell size={20} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  );
}
