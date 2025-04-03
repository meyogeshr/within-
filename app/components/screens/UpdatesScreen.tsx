import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { Filter, MapPin } from "lucide-react-native";

interface UpdateItem {
  id: string;
  title: string;
  description: string;
  time: string;
  image?: string;
}

export default function UpdatesScreen() {
  const { t } = useTranslation();

  const updates: UpdateItem[] = [
    {
      id: "1",
      title: "Road Closure on Main Street",
      description:
        "Due to construction, Main Street will be closed this weekend.",
      time: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80",
    },
    {
      id: "2",
      title: "New Community Center Opening",
      description:
        "The new community center will open next month with free activities.",
      time: "5 hours ago",
    },
    {
      id: "3",
      title: "Local School Wins National Award",
      description:
        "Central High School has been recognized for excellence in education.",
      time: "1 day ago",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80",
    },
    {
      id: "4",
      title: "Farmers Market Extended Hours",
      description:
        "The weekly farmers market will now be open until 8 PM on Saturdays.",
      time: "2 days ago",
    },
    {
      id: "5",
      title: "New Bus Route Added",
      description:
        "A new bus route connecting the east and west sides of town starts next week.",
      time: "3 days ago",
      image:
        "https://images.unsplash.com/photo-1556122071-e404cb6f31c0?w=500&q=80",
    },
  ];

  const renderUpdateItem = ({ item }: { item: UpdateItem }) => (
    <TouchableOpacity className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-48"
          contentFit="cover"
        />
      )}
      <View className="p-4">
        <Text className="text-lg font-bold mb-2">{item.title}</Text>
        <Text className="text-gray-600 mb-3">{item.description}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-500 text-sm">{item.time}</Text>
          <Text className="text-blue-600 font-medium">Read more</Text>
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

        <Text className="text-2xl font-bold mb-6">Local Updates</Text>

        <FlatList
          data={updates}
          renderItem={renderUpdateItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
