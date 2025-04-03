import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Share,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Share2,
  Heart,
  Bookmark,
  Ticket,
  Info,
  MessageCircle,
  ChevronDown,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface EventDetailScreenProps {
  route?: { params: { eventId: string } };
  navigation?: any;
}

export default function EventDetailScreen({
  route,
  navigation,
}: EventDetailScreenProps) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // In a real app, you would fetch the event details based on the eventId
  const eventId = route?.params?.eventId || "1";

  // Sample event data
  const event = {
    id: eventId,
    title: "Community Festival at Central Park",
    description:
      "Join us for a day of music, food, and fun activities for the whole family. The festival will feature local artists, food vendors, and activities for children. There will be live performances throughout the day, including music, dance, and theater. Food vendors will offer a variety of cuisines, from local favorites to international dishes. Activities for children include face painting, games, and crafts. The festival is free to attend, but some activities may require tickets.",
    date: "This Weekend",
    time: "10:00 AM - 6:00 PM",
    location: "Central Park, Main Entrance",
    address: "123 Park Avenue, Bangalore, India",
    organizer: "Community Events Association",
    ticketPrice: "Free Entry",
    ticketStatus: "Available",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=500&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&q=80",
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=500&q=80",
    ],
    attendees: 128,
    comments: 24,
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
        message: `Check out this event: ${event.title} at ${event.location} on ${event.date}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetTickets = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, this would navigate to a ticket purchase screen
    alert("Navigate to ticket purchase");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="absolute top-0 left-0 right-0 z-10 p-4 flex-row justify-between">
        <TouchableOpacity
          onPress={handleBack}
          className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
        >
          <ArrowLeft size={20} color="#4B5563" />
        </TouchableOpacity>

        <View className="flex-row">
          <TouchableOpacity
            onPress={handleBookmark}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm mr-2"
          >
            <Bookmark
              size={20}
              color={bookmarked ? "#3B82F6" : "#4B5563"}
              fill={bookmarked ? "#3B82F6" : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
          >
            <Share2 size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Event Image */}
        <View className="h-72 w-full">
          <Image
            source={{ uri: event.image }}
            className="w-full h-full"
            contentFit="cover"
          />
        </View>

        {/* Event Details */}
        <View className="p-4">
          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="#8B5CF6" />
            <Text className="ml-2 text-purple-600 text-sm font-medium">
              {event.date}
            </Text>
          </View>

          <Text className="text-2xl font-bold mb-2">{event.title}</Text>

          <View className="flex-row items-center mb-4">
            <MapPin size={16} color="#6B7280" />
            <Text className="ml-2 text-gray-600">{event.location}</Text>
          </View>

          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={handleLike}
                className="flex-row items-center mr-4"
              >
                <Heart
                  size={20}
                  color={liked ? "#EF4444" : "#6B7280"}
                  fill={liked ? "#EF4444" : "transparent"}
                />
                <Text className="ml-1 text-gray-600">{event.attendees}</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center">
                <MessageCircle size={20} color="#6B7280" />
                <Text className="ml-1 text-gray-600">{event.comments}</Text>
              </TouchableOpacity>
            </View>

            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-600 font-medium">
                {event.ticketStatus}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">About Event</Text>
            <Text
              className="text-gray-600 leading-6"
              numberOfLines={showFullDescription ? undefined : 3}
            >
              {event.description}
            </Text>
            {event.description.length > 150 && (
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}
                className="mt-2"
              >
                <Text className="text-blue-600 font-medium">
                  {showFullDescription ? "Show Less" : "Read More"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Event Details */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Event Details</Text>

            <View className="bg-gray-50 rounded-lg p-4">
              <View className="flex-row items-center mb-3">
                <Clock size={18} color="#6B7280" />
                <View className="ml-3">
                  <Text className="text-gray-500 text-sm">Time</Text>
                  <Text className="font-medium">{event.time}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3">
                <MapPin size={18} color="#6B7280" />
                <View className="ml-3">
                  <Text className="text-gray-500 text-sm">Location</Text>
                  <Text className="font-medium">{event.address}</Text>
                </View>
              </View>

              <View className="flex-row items-center mb-3">
                <Info size={18} color="#6B7280" />
                <View className="ml-3">
                  <Text className="text-gray-500 text-sm">Organizer</Text>
                  <Text className="font-medium">{event.organizer}</Text>
                </View>
              </View>

              <View className="flex-row items-center">
                <Ticket size={18} color="#6B7280" />
                <View className="ml-3">
                  <Text className="text-gray-500 text-sm">Entry</Text>
                  <Text className="font-medium">{event.ticketPrice}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Gallery */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Gallery</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-1"
            >
              {event.gallery.map((image, index) => (
                <TouchableOpacity key={index} className="mx-1">
                  <Image
                    source={{ uri: image }}
                    className="w-24 h-24 rounded-lg"
                    contentFit="cover"
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Map placeholder */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Location</Text>
            <View className="h-40 bg-gray-200 rounded-lg items-center justify-center">
              <MapPin size={32} color="#9CA3AF" />
              <Text className="text-gray-500 mt-2">Map View</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-sm">Price</Text>
            <Text className="text-xl font-bold">{event.ticketPrice}</Text>
          </View>

          <TouchableOpacity
            onPress={handleGetTickets}
            className="bg-blue-600 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-bold">Get Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
