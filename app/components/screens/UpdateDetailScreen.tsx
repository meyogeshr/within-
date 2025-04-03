import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Share } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  Clock,
  MapPin,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface UpdateDetailScreenProps {
  route?: { params: { updateId: string } };
  navigation?: any;
}

export default function UpdateDetailScreen({
  route,
  navigation,
}: UpdateDetailScreenProps) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // In a real app, you would fetch the update details based on the updateId
  const updateId = route?.params?.updateId || "1";

  // Sample update data
  const update = {
    id: updateId,
    title: "Road Closure on Main Street",
    content:
      "Due to construction, Main Street will be closed this weekend from Friday 8 PM to Monday 6 AM. Alternative routes have been set up via Oak Street and Pine Avenue. Please plan your travel accordingly and expect delays in the area.\n\nThe construction is part of the city's infrastructure improvement project aimed at enhancing road quality and drainage systems. The work includes repaving the road surface, installing new drainage pipes, and upgrading street lighting.\n\nEmergency vehicles will still have access to Main Street during the closure. Residents living on Main Street will be provided with special access permits to reach their homes.\n\nFor more information, please contact the City Transportation Department at 555-1234 or visit the city's official website.",
    time: "2 hours ago",
    source: "City Transportation Department",
    location: "Main Street, Downtown",
    category: "Traffic",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80",
    likes: 24,
    comments: 8,
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation?.goBack();
  };

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(!liked);
  };

  const handleBookmark = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setBookmarked(!bookmarked);
  };

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        message: `${update.title}\n\n${update.content.substring(0, 100)}...\n\nSource: ${update.source}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would open a comment input or comments list
    alert("Open comments");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>

        <Text className="font-bold text-lg">Update Details</Text>

        <TouchableOpacity onPress={handleShare}>
          <Share2 size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Update Image */}
        {update.image && (
          <Image
            source={{ uri: update.image }}
            className="w-full h-48"
            contentFit="cover"
          />
        )}

        {/* Update Content */}
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-2">
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-600 text-sm">{update.category}</Text>
            </View>
            <View className="flex-row items-center">
              <Clock size={14} color="#6B7280" />
              <Text className="ml-1 text-gray-500 text-sm">{update.time}</Text>
            </View>
          </View>

          <Text className="text-2xl font-bold mb-2">{update.title}</Text>

          <View className="flex-row items-center mb-4">
            <Text className="text-gray-600">Source: {update.source}</Text>
          </View>

          {update.location && (
            <View className="flex-row items-center mb-4">
              <MapPin size={16} color="#6B7280" />
              <Text className="ml-2 text-gray-600">{update.location}</Text>
            </View>
          )}

          <Text className="text-gray-700 leading-6 mb-6">
            {update.content.split("\n").map((paragraph, index) => (
              <Text key={index}>
                {paragraph}
                {index < update.content.split("\n").length - 1 && "\n\n"}
              </Text>
            ))}
          </Text>

          {/* Action Buttons */}
          <View className="flex-row justify-between items-center border-t border-gray-200 pt-4">
            <TouchableOpacity
              onPress={handleLike}
              className="flex-row items-center"
            >
              <Heart
                size={24}
                color={liked ? "#EF4444" : "#6B7280"}
                fill={liked ? "#EF4444" : "transparent"}
              />
              <Text className="ml-2 text-gray-600">{update.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleComment}
              className="flex-row items-center"
            >
              <MessageCircle size={24} color="#6B7280" />
              <Text className="ml-2 text-gray-600">{update.comments}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBookmark}>
              <Bookmark
                size={24}
                color={bookmarked ? "#3B82F6" : "#6B7280"}
                fill={bookmarked ? "#3B82F6" : "transparent"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Related Updates */}
        <View className="p-4 border-t border-gray-200">
          <Text className="text-lg font-bold mb-4">Related Updates</Text>

          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <Text className="font-bold mb-1">
              New Bus Routes During Road Closure
            </Text>
            <Text className="text-gray-600 mb-2" numberOfLines={2}>
              The city has announced temporary bus routes to accommodate the
              Main Street closure.
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 text-sm">1 day ago</Text>
              <Text className="text-blue-600">Read more</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4">
            <Text className="font-bold mb-1">
              Infrastructure Project Timeline Updated
            </Text>
            <Text className="text-gray-600 mb-2" numberOfLines={2}>
              The city has released an updated timeline for the ongoing
              infrastructure improvement project.
            </Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500 text-sm">3 days ago</Text>
              <Text className="text-blue-600">Read more</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
