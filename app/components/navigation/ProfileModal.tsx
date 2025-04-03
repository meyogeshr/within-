import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  X,
  User,
  Settings,
  LogOut,
  Moon,
  Bookmark,
  ChevronRight,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useLanguage } from "../../context/LanguageContext";

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  navigation?: any;
}

export default function ProfileModal({
  visible,
  onClose,
  onLogout,
  navigation,
}: ProfileModalProps) {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onLogout();
  };

  const toggleDarkMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setDarkMode(!darkMode);
    // In a real app, you would apply the dark mode theme here
  };

  const handleBookmarksPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
    if (navigation) {
      navigation.navigate("Details", { screen: "Bookmarks" });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black bg-opacity-50">
        <View className="flex-1 mt-20 bg-white rounded-t-3xl">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-blue-600">Profile</Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
            >
              <X size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            <View className="p-6 items-center border-b border-gray-200">
              <View className="w-24 h-24 rounded-full bg-blue-100 mb-4 overflow-hidden">
                <Image
                  source={{
                    uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
                  }}
                  className="w-full h-full"
                />
              </View>
              <Text className="text-xl font-bold mb-1">John Doe</Text>
              <Text className="text-gray-500 mb-4">john.doe@example.com</Text>
              <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-full">
                <Text className="text-white font-medium">Edit Profile</Text>
              </TouchableOpacity>
            </View>

            <View className="p-4">
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <View className="flex-row items-center">
                  <Moon size={20} color="#4B5563" />
                  <Text className="ml-3 text-base">Dark Mode</Text>
                </View>
                <Switch
                  trackColor={{ false: "#e5e7eb", true: "#bfdbfe" }}
                  thumbColor={darkMode ? "#3b82f6" : "#f4f3f4"}
                  ios_backgroundColor="#e5e7eb"
                  onValueChange={toggleDarkMode}
                  value={darkMode}
                />
              </View>

              <TouchableOpacity
                className="flex-row items-center justify-between py-4 border-b border-gray-100"
                onPress={handleBookmarksPress}
              >
                <View className="flex-row items-center">
                  <Bookmark size={20} color="#4B5563" />
                  <Text className="ml-3 text-base">Bookmarks</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <View className="flex-row items-center">
                  <Settings size={20} color="#4B5563" />
                  <Text className="ml-3 text-base">Settings</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogout}
                className="flex-row items-center py-4"
              >
                <LogOut size={20} color="#EF4444" />
                <Text className="ml-3 text-base text-red-500">Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
