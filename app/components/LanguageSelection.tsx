import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../context/LanguageContext";

interface Language {
  id: string;
  name: string;
  code: string;
  flag: string;
}

interface LanguageSelectionProps {
  onLanguageSelected?: (language: Language) => void;
  onContinue?: () => void;
}

const LanguageSelection = ({
  onLanguageSelected = () => {},
  onContinue = () => {},
}: LanguageSelectionProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    null,
  );
  const [listAnimation] = useState(new Animated.Value(0));

  const languages: Language[] = [
    {
      id: "1",
      name: "English",
      code: "en",
      flag: "https://api.dicebear.com/7.x/avataaars/svg?seed=en",
    },
    {
      id: "2",
      name: "हिन्दी",
      code: "hi",
      flag: "https://api.dicebear.com/7.x/avataaars/svg?seed=hi",
    },
    {
      id: "3",
      name: "ಕನ್ನಡ",
      code: "kn",
      flag: "https://api.dicebear.com/7.x/avataaars/svg?seed=kn",
    },
    {
      id: "4",
      name: "తెలుగు",
      code: "te",
      flag: "https://api.dicebear.com/7.x/avataaars/svg?seed=te",
    },
    {
      id: "5",
      name: "मराठी",
      code: "mr",
      flag: "https://api.dicebear.com/7.x/avataaars/svg?seed=mr",
    },
    {
      id: "6",
      name: "தமிழ்",
      code: "ta",
      flag: "https://api.dicebear.com/7.x/avataaars/svg?seed=ta",
    },
  ];

  useEffect(() => {
    // Find the current language in our language list
    const currentLang = languages.find((lang) => lang.code === currentLanguage);
    if (currentLang) {
      setSelectedLanguage(currentLang);
    }

    // Animate the list items in sequence
    Animated.timing(listAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [currentLanguage]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    changeLanguage(language.code);
    onLanguageSelected(language);
  };

  const handleContinue = () => {
    onContinue();
    // Navigate to the next screen (auth screens)
    router.push("/components/AuthScreens");
  };

  const renderLanguageItem = ({
    item,
    index,
  }: {
    item: Language;
    index: number;
  }) => {
    const animatedStyle = {
      opacity: listAnimation,
      transform: [
        {
          translateY: listAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[{ delay: index * 100 }, animatedStyle]}>
        <TouchableOpacity
          className="flex-row items-center p-4 border-b border-gray-200"
          onPress={() => handleLanguageSelect(item)}
        >
          <View className="w-10 h-10 rounded-full overflow-hidden mr-4 bg-blue-50">
            <Image
              source={{ uri: item.flag }}
              className="w-full h-full"
              style={styles.flagImage}
            />
          </View>
          <Text className="flex-1 text-lg">{item.name}</Text>
          {selectedLanguage?.id === item.id && (
            <View className="w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
              <Text className="text-white font-bold">✓</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <View className="pt-16 px-6 pb-6">
        <Text className="text-3xl font-bold text-center mb-2 text-blue-600">
          {t("language.title")}
        </Text>
        <Text className="text-gray-500 text-center mb-6">
          {t("language.subtitle")}
        </Text>
      </View>

      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item.id}
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      <View className="p-6">
        <TouchableOpacity
          className={`py-4 px-6 rounded-full flex-row items-center justify-center ${selectedLanguage ? "bg-blue-500" : "bg-gray-300"}`}
          onPress={handleContinue}
          disabled={!selectedLanguage}
        >
          <Text className="text-white font-bold text-lg mr-2">
            {t("language.continue")}
          </Text>
          <ChevronRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flagImage: {
    resizeMode: "cover",
  },
});

export default LanguageSelection;
