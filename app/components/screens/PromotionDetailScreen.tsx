import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Share } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Share2,
  Heart,
  Bookmark,
  Calendar,
  MapPin,
  Tag,
  Copy,
  CheckCircle,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface PromotionDetailScreenProps {
  route?: { params: { promotionId: string } };
  navigation?: any;
}

export default function PromotionDetailScreen({
  route,
  navigation,
}: PromotionDetailScreenProps) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  // In a real app, you would fetch the promotion details based on the promotionId
  const promotionId = route?.params?.promotionId || "1";

  // Sample promotion data
  const promotion = {
    id: promotionId,
    title: "50% Off on All Meals",
    business: "Local Bistro",
    description:
      "Enjoy 50% off on all meals from Monday to Thursday. Valid for dine-in only. Cannot be combined with other offers or discounts. Tax and gratuity not included. Reservations recommended but not required. Please mention this offer when ordering.",
    discount: "50% OFF",
    validUntil: "Valid until June 30",
    couponCode: "BISTRO50",
    termsAndConditions: [
      "Valid for dine-in only",
      "Cannot be combined with other offers",
      "Valid Monday to Thursday",
      "Tax and gratuity not included",
      "Management reserves the right to modify or cancel the promotion",
    ],
    location: "123 Main Street, Bangalore",
    contactInfo: "Phone: (555) 123-4567, Email: info@localbistro.com",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
    category: "Food",
    likes: 42,
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
        message: `Check out this deal: ${promotion.title} at ${promotion.business}. Use code ${promotion.couponCode} to get ${promotion.discount}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCopyCoupon = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, this would copy the coupon code to clipboard
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 3000);
  };

  const handleUsePromotion = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, this might navigate to a map, open the business website, etc.
    alert("Use promotion");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>

        <Text className="font-bold text-lg">Promotion Details</Text>

        <TouchableOpacity onPress={handleShare}>
          <Share2 size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Promotion Image */}
        <View className="relative">
          <Image
            source={{ uri: promotion.image }}
            className="w-full h-56"
            contentFit="cover"
          />
          <View className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded-lg">
            <Text className="text-white font-bold">{promotion.discount}</Text>
          </View>
        </View>

        {/* Promotion Content */}
        <View className="p-4">
          <View className="flex-row items-center mb-2">
            <Tag size={16} color="#F97316" />
            <Text className="ml-2 text-orange-500 text-sm font-medium">
              {promotion.category}
            </Text>
          </View>

          <Text className="text-2xl font-bold mb-1">{promotion.title}</Text>
          <Text className="text-blue-600 font-medium mb-4">
            {promotion.business}
          </Text>

          <View className="flex-row items-center mb-2">
            <Calendar size={16} color="#6B7280" />
            <Text className="ml-2 text-gray-600">{promotion.validUntil}</Text>
          </View>

          <View className="flex-row items-center mb-4">
            <MapPin size={16} color="#6B7280" />
            <Text className="ml-2 text-gray-600">{promotion.location}</Text>
          </View>

          <Text className="text-gray-700 leading-6 mb-6">
            {promotion.description}
          </Text>

          {/* Coupon Code */}
          <View className="bg-gray-50 rounded-lg p-4 mb-6">
            <Text className="text-center text-gray-500 mb-2">Coupon Code</Text>
            <View className="flex-row items-center justify-center bg-white border border-gray-200 rounded-lg p-3">
              <Text className="text-xl font-bold text-blue-600 mr-2">
                {promotion.couponCode}
              </Text>
              <TouchableOpacity onPress={handleCopyCoupon}>
                {couponCopied ? (
                  <CheckCircle size={20} color="#10B981" />
                ) : (
                  <Copy size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Terms & Conditions</Text>
            {promotion.termsAndConditions.map((term, index) => (
              <View key={index} className="flex-row items-start mb-2">
                <View className="w-2 h-2 rounded-full bg-gray-400 mt-1.5 mr-2" />
                <Text className="text-gray-600 flex-1">{term}</Text>
              </View>
            ))}
          </View>

          {/* Contact Info */}
          <View className="mb-6">
            <Text className="text-lg font-bold mb-2">Contact Information</Text>
            <Text className="text-gray-600">{promotion.contactInfo}</Text>
          </View>

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
              <Text className="ml-2 text-gray-600">{promotion.likes}</Text>
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

        {/* Similar Promotions */}
        <View className="p-4 border-t border-gray-200">
          <Text className="text-lg font-bold mb-4">Similar Promotions</Text>

          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <View className="flex-row">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
                }}
                className="w-16 h-16 rounded-lg mr-3"
                contentFit="cover"
              />
              <View className="flex-1">
                <Text className="font-bold mb-1">Buy 1 Get 1 Free Coffee</Text>
                <Text className="text-gray-600 mb-1">Coffee House</Text>
                <Text className="text-gray-500 text-sm">
                  Valid until July 15
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4">
            <View className="flex-row">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=500&q=80",
                }}
                className="w-16 h-16 rounded-lg mr-3"
                contentFit="cover"
              />
              <View className="flex-1">
                <Text className="font-bold mb-1">30% Off on Dinner Buffet</Text>
                <Text className="text-gray-600 mb-1">Spice Garden</Text>
                <Text className="text-gray-500 text-sm">
                  Valid until June 30
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <TouchableOpacity
          onPress={handleUsePromotion}
          className="bg-blue-600 py-3 rounded-lg items-center"
        >
          <Text className="text-white font-bold text-lg">
            Use This Promotion
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
