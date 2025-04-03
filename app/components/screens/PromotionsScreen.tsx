import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Filter, MapPin, Tag, Clock, Calendar } from "lucide-react-native";

interface PromotionItem {
  id: string;
  title: string;
  business: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  category: string;
}

export default function PromotionsScreen() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    "Food",
    "Shopping",
    "Entertainment",
    "Services",
    "Health",
  ];

  const promotions: PromotionItem[] = [
    {
      id: "1",
      title: "50% Off on All Meals",
      business: "Local Bistro",
      description:
        "Enjoy 50% off on all meals from Monday to Thursday. Valid for dine-in only.",
      discount: "50% OFF",
      validUntil: "Valid until June 30",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
      category: "Food",
    },
    {
      id: "2",
      title: "Buy 1 Get 1 Free on All Clothing",
      business: "Fashion Store",
      description:
        "Buy any clothing item and get another one of equal or lesser value for free.",
      discount: "BUY 1 GET 1",
      validUntil: "This weekend only",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
      category: "Shopping",
    },
    {
      id: "3",
      title: "Movie Tickets at ₹150",
      business: "City Cinemas",
      description:
        "Watch any movie for just ₹150 on Tuesdays. Popcorn and drink combo at special price.",
      discount: "SPECIAL PRICE",
      validUntil: "Every Tuesday",
      image:
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500&q=80",
      category: "Entertainment",
    },
    {
      id: "4",
      title: "30% Off on Spa Services",
      business: "Wellness Center",
      description:
        "Relax and rejuvenate with 30% off on all spa services. Advance booking required.",
      discount: "30% OFF",
      validUntil: "Valid until July 15",
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80",
      category: "Health",
    },
    {
      id: "5",
      title: "Free Car Wash with Service",
      business: "Auto Care",
      description: "Get a free car wash with any service worth ₹2000 or more.",
      discount: "FREE ADD-ON",
      validUntil: "Ongoing offer",
      image:
        "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&q=80",
      category: "Services",
    },
  ];

  const filteredPromotions =
    selectedCategory && selectedCategory !== "All"
      ? promotions.filter((promo) => promo.category === selectedCategory)
      : promotions;

  const renderPromotionItem = ({ item }: { item: PromotionItem }) => (
    <TouchableOpacity className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
      <View className="relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-48"
          contentFit="cover"
        />
        <View className="absolute top-0 right-0 bg-red-500 px-3 py-1 rounded-bl-lg">
          <Text className="text-white font-bold">{item.discount}</Text>
        </View>
      </View>
      <View className="p-4">
        <Text className="text-lg font-bold mb-1">{item.title}</Text>
        <Text className="text-blue-600 font-medium mb-2">{item.business}</Text>
        <Text className="text-gray-600 mb-3">{item.description}</Text>
        <View className="flex-row items-center">
          <Calendar size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-600">{item.validUntil}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <MapPin size={16} color="#3b82f6" />
            <Text className="ml-1 text-blue-600 font-medium">
              Bangalore, India
            </Text>
          </View>
          <TouchableOpacity className="bg-white p-2 rounded-full shadow-sm">
            <Filter size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <Text className="text-2xl font-bold mb-4">Local Promotions</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`mr-2 px-4 py-2 rounded-full ${selectedCategory === category || (category === "All" && !selectedCategory) ? "bg-blue-600" : "bg-white"}`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`font-medium ${selectedCategory === category || (category === "All" && !selectedCategory) ? "text-white" : "text-gray-700"}`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredPromotions}
          renderItem={renderPromotionItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
