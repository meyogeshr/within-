import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Slider,
  StyleSheet,
  Animated,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  Check,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface UserPreferencesProps {
  onComplete?: () => void;
  onBack?: () => void;
}

export default function UserPreferences({
  onComplete = () => {},
  onBack = () => {},
}: UserPreferencesProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(10);
  const [interests, setInterests] = useState<string[]>([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  // Animation effect when component mounts
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // Animation effect when step changes
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 30,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [step]);

  const handleInterestToggle = (interest: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const renderLocationStep = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="flex-1"
    >
      <Text className="text-2xl font-bold mb-6 text-center text-blue-600">
        {t("preferences.setLocation")}
      </Text>

      <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <View className="flex-row items-center mb-4">
          <MapPin size={24} color="#3b82f6" />
          <Text className="text-lg font-medium ml-2">
            {t("preferences.yourLocation")}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4"
          onPress={() => {
            // In a real app, this would open a location picker
            setLocation("Current Location");
          }}
        >
          <Text className="text-blue-600 font-medium">
            {location || t("preferences.useCurrentLocation")}
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-700 mb-2">
          {t("preferences.selectRadius")}
        </Text>

        <View className="mb-2">
          <Slider
            value={radius}
            onValueChange={(value) => setRadius(value)}
            minimumValue={1}
            maximumValue={40}
            step={1}
            minimumTrackTintColor="#3b82f6"
            maximumTrackTintColor="#e5e7eb"
            thumbTintColor="#3b82f6"
          />
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-500">1 km</Text>
          <Text className="text-blue-600 font-medium">{radius} km</Text>
          <Text className="text-gray-500">40 km</Text>
        </View>
      </View>

      <Text className="text-gray-600 text-center mb-6">
        {t("preferences.locationDescription")}
      </Text>
    </Animated.View>
  );

  const renderInterestsStep = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="flex-1"
    >
      <Text className="text-2xl font-bold mb-6 text-center text-blue-600">
        {t("preferences.selectInterests")}
      </Text>

      <Text className="text-gray-600 mb-4 text-center">
        {t("preferences.interestsDescription")}
      </Text>

      <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <TouchableOpacity
          className={`flex-row items-center p-4 mb-4 rounded-lg ${interests.includes("updates") ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"}`}
          onPress={() => handleInterestToggle("updates")}
        >
          <View
            className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${interests.includes("updates") ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <Calendar size={16} color="white" />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-lg">
              {t("preferences.dailyUpdates")}
            </Text>
            <Text className="text-gray-600">
              {t("preferences.updatesDescription")}
            </Text>
          </View>
          {interests.includes("updates") && <Check size={20} color="#3b82f6" />}
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center p-4 mb-4 rounded-lg ${interests.includes("jobs") ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"}`}
          onPress={() => handleInterestToggle("jobs")}
        >
          <View
            className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${interests.includes("jobs") ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <Briefcase size={16} color="white" />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-lg">
              {t("preferences.jobOpportunities")}
            </Text>
            <Text className="text-gray-600">
              {t("preferences.jobsDescription")}
            </Text>
          </View>
          {interests.includes("jobs") && <Check size={20} color="#3b82f6" />}
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center p-4 rounded-lg ${interests.includes("both") ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200"}`}
          onPress={() => handleInterestToggle("both")}
        >
          <View
            className={`w-6 h-6 rounded-full mr-3 items-center justify-center ${interests.includes("both") ? "bg-blue-500" : "bg-gray-300"}`}
          >
            <Check size={16} color="white" />
          </View>
          <View className="flex-1">
            <Text className="font-medium text-lg">{t("preferences.both")}</Text>
            <Text className="text-gray-600">
              {t("preferences.bothDescription")}
            </Text>
          </View>
          {interests.includes("both") && <Check size={20} color="#3b82f6" />}
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderNotificationStep = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="flex-1"
    >
      <Text className="text-2xl font-bold mb-6 text-center text-blue-600">
        {t("preferences.notifications")}
      </Text>

      <Text className="text-gray-600 mb-4 text-center">
        {t("preferences.notificationsDescription")}
      </Text>

      <View className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <Text className="font-medium">
            {t("preferences.pushNotifications")}
          </Text>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#bfdbfe" }}
            thumbColor={true ? "#3b82f6" : "#f4f3f4"}
            ios_backgroundColor="#e5e7eb"
            value={true}
            onValueChange={() => {}}
          />
        </View>

        <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
          <Text className="font-medium">{t("preferences.emailUpdates")}</Text>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#bfdbfe" }}
            thumbColor={true ? "#3b82f6" : "#f4f3f4"}
            ios_backgroundColor="#e5e7eb"
            value={true}
            onValueChange={() => {}}
          />
        </View>

        <View className="flex-row items-center justify-between p-4">
          <Text className="font-medium">
            {t("preferences.locationBasedAlerts")}
          </Text>
          <Switch
            trackColor={{ false: "#e5e7eb", true: "#bfdbfe" }}
            thumbColor={true ? "#3b82f6" : "#f4f3f4"}
            ios_backgroundColor="#e5e7eb"
            value={true}
            onValueChange={() => {}}
          />
        </View>
      </View>

      <Text className="text-gray-500 text-center text-sm mb-6">
        {t("preferences.privacyNote")}
      </Text>
    </Animated.View>
  );

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <View className="pt-12 px-6 pb-4 flex-row items-center">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>
        <View className="flex-1 items-center">
          <View className="flex-row">
            <View
              className={`h-2 w-12 rounded-full mx-1 ${step >= 1 ? "bg-blue-500" : "bg-gray-300"}`}
            />
            <View
              className={`h-2 w-12 rounded-full mx-1 ${step >= 2 ? "bg-blue-500" : "bg-gray-300"}`}
            />
            <View
              className={`h-2 w-12 rounded-full mx-1 ${step >= 3 ? "bg-blue-500" : "bg-gray-300"}`}
            />
          </View>
        </View>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView className="flex-1 px-6">
        {step === 1 && renderLocationStep()}
        {step === 2 && renderInterestsStep()}
        {step === 3 && renderNotificationStep()}
      </ScrollView>

      <View className="p-6">
        <TouchableOpacity
          className="py-4 px-6 rounded-full bg-blue-600 flex-row items-center justify-center"
          onPress={handleNext}
        >
          <Text className="text-white font-bold text-lg mr-2">
            {step < 3 ? t("preferences.next") : t("preferences.finish")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
