import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Calendar, Briefcase, Check } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

interface PreferenceSelectionProps {
  onComplete?: (preferences: string[]) => void;
  onBack?: () => void;
}

export default function PreferenceSelection({
  onComplete = () => {},
  onBack = () => {},
}: PreferenceSelectionProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  // Animation effect when component mounts
  React.useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handlePreferenceToggle = (preference: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (selectedPreferences.includes(preference)) {
      setSelectedPreferences(
        selectedPreferences.filter((p) => p !== preference),
      );
    } else {
      // For simplicity, we'll allow selecting multiple preferences
      // but in a real app you might want to limit to one selection
      setSelectedPreferences([...selectedPreferences, preference]);
    }
  };

  const handleContinue = () => {
    if (selectedPreferences.length === 0) {
      // Require at least one selection
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    // Save user preference
    const preference = selectedPreferences.includes("jobs")
      ? "jobs"
      : "updates";

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onComplete(selectedPreferences);
    router.push("/components/UserPreferences");
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <View className="pt-12 px-6 pb-4">
        <TouchableOpacity onPress={onBack} className="p-2">
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Text className="text-3xl font-bold mb-4 text-center text-blue-600">
            {t("preferences.whatLookingFor")}
          </Text>

          <Text className="text-gray-600 mb-8 text-center">
            {t("preferences.selectPreferences")}
          </Text>

          <TouchableOpacity
            className={`mb-6 bg-white rounded-xl overflow-hidden shadow-sm ${selectedPreferences.includes("updates") ? "border-2 border-blue-500" : ""}`}
            onPress={() => handlePreferenceToggle("updates")}
            activeOpacity={0.8}
          >
            <View className="h-40 bg-blue-100">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&q=80",
                }}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
            <View className="p-5">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Calendar size={20} color="#3b82f6" />
                  <Text className="text-xl font-bold ml-2 text-blue-600">
                    {t("preferences.dailyUpdates")}
                  </Text>
                </View>
                {selectedPreferences.includes("updates") && (
                  <View className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center">
                    <Check size={18} color="white" />
                  </View>
                )}
              </View>
              <Text className="text-gray-600">
                {t("preferences.updatesDescription")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className={`mb-6 bg-white rounded-xl overflow-hidden shadow-sm ${selectedPreferences.includes("jobs") ? "border-2 border-blue-500" : ""}`}
            onPress={() => handlePreferenceToggle("jobs")}
            activeOpacity={0.8}
          >
            <View className="h-40 bg-blue-100">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
                }}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
            <View className="p-5">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <Briefcase size={20} color="#3b82f6" />
                  <Text className="text-xl font-bold ml-2 text-blue-600">
                    {t("preferences.jobOpportunities")}
                  </Text>
                </View>
                {selectedPreferences.includes("jobs") && (
                  <View className="bg-blue-500 w-8 h-8 rounded-full items-center justify-center">
                    <Check size={18} color="white" />
                  </View>
                )}
              </View>
              <Text className="text-gray-600">
                {t("preferences.jobsDescription")}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>

      <View className="p-6">
        <TouchableOpacity
          className={`py-4 px-6 rounded-full flex-row items-center justify-center ${selectedPreferences.length > 0 ? "bg-blue-600" : "bg-gray-300"}`}
          onPress={handleContinue}
          disabled={selectedPreferences.length === 0}
        >
          <Text className="text-white font-bold text-lg">
            {t("preferences.continue")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
