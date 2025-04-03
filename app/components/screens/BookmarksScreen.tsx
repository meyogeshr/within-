import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  Tag,
  Bell,
  Bookmark,
  Filter,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface BookmarksScreenProps {
  navigation?: any;
  route?: { params: { type?: string } };
}

export default function BookmarksScreen({
  navigation,
  route,
}: BookmarksScreenProps) {
  const { t } = useTranslation();
  const initialType = route?.params?.type || "all";
  const [activeType, setActiveType] = useState(initialType);

  // Sample bookmarked items
  const bookmarks = {
    events: [
      {
        id: "e1",
        title: "Community Festival at Central Park",
        date: "This Weekend",
        image:
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80",
      },
      {
        id: "e2",
        title: "Local Art Exhibition",
        date: "Tomorrow",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
      },
    ],
    jobs: [
      {
        id: "j1",
        title: "Software Developer",
        company: "TechCorp",
        salary: "₹15-20 LPA",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
      },
      {
        id: "j2",
        title: "Customer Service Representative",
        company: "ServiceHub",
        salary: "₹3-5 LPA",
        logo: "https://api.dicebear.com/7.x/initials/svg?seed=SH",
      },
    ],
    updates: [
      {
        id: "u1",
        title: "Road Closure on Main Street",
        time: "2 hours ago",
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&q=80",
      },
    ],
    promotions: [
      {
        id: "p1",
        title: "50% Off on All Meals",
        business: "Local Bistro",
        validUntil: "Valid until June 30",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
      },
      {
        id: "p2",
        title: "Buy 1 Get 1 Free on All Clothing",
        business: "Fashion Store",
        validUntil: "This weekend only",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80",
      },
    ],
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation?.goBack();
  };

  const handleTypeChange = (type: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveType(type);
  };

  const handleItemPress = (type: string, id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would navigate to the detail screen for the item
    switch (type) {
      case "events":
        navigation?.navigate("EventDetail", { eventId: id });
        break;
      case "jobs":
        navigation?.navigate("JobDetail", { jobId: id });
        break;
      case "updates":
        navigation?.navigate("UpdateDetail", { updateId: id });
        break;
      case "promotions":
        navigation?.navigate("PromotionDetail", { promotionId: id });
        break;
    }
  };

  const renderEventItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-xl overflow-hidden shadow-sm mb-4"
      onPress={() => handleItemPress("events", item.id)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-32"
        contentFit="cover"
      />
      <View className="p-3">
        <View className="flex-row items-center mb-1">
          <Calendar size={14} color="#8B5CF6" />
          <Text className="ml-1 text-purple-600 text-xs font-medium">
            {item.date}
          </Text>
        </View>
        <Text className="font-bold">{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderJobItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-4 shadow-sm"
      onPress={() => handleItemPress("jobs", item.id)}
    >
      <View className="flex-row mb-3">
        <View className="w-12 h-12 rounded-lg bg-blue-100 overflow-hidden mr-3">
          <Image
            source={{ uri: item.logo }}
            className="w-full h-full"
            contentFit="cover"
          />
        </View>
        <View className="flex-1">
          <Text className="font-bold">{item.title}</Text>
          <Text className="text-gray-600">{item.company}</Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-700 font-medium">{item.salary}</Text>
        <View className="bg-blue-100 px-2 py-1 rounded-full">
          <Text className="text-blue-600 text-xs">Bookmarked</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderUpdateItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-xl overflow-hidden shadow-sm mb-4"
      onPress={() => handleItemPress("updates", item.id)}
    >
      {item.image && (
        <Image
          source={{ uri: item.image }}
          className="w-full h-32"
          contentFit="cover"
        />
      )}
      <View className="p-3">
        <Text className="font-bold mb-1">{item.title}</Text>
        <Text className="text-gray-500 text-sm">{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderPromotionItem = ({ item }: any) => (
    <TouchableOpacity
      className="bg-white rounded-xl overflow-hidden shadow-sm mb-4"
      onPress={() => handleItemPress("promotions", item.id)}
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-32"
        contentFit="cover"
      />
      <View className="p-3">
        <Text className="font-bold mb-1">{item.title}</Text>
        <Text className="text-blue-600 font-medium mb-1">{item.business}</Text>
        <Text className="text-gray-500 text-sm">{item.validUntil}</Text>
      </View>
    </TouchableOpacity>
  );

  const getFilteredBookmarks = () => {
    if (activeType === "all") {
      return {
        events: bookmarks.events,
        jobs: bookmarks.jobs,
        updates: bookmarks.updates,
        promotions: bookmarks.promotions,
      };
    }
    return {
      [activeType]: bookmarks[activeType as keyof typeof bookmarks],
    };
  };

  const filteredBookmarks = getFilteredBookmarks();

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 flex-row items-center border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={handleBack} className="mr-4">
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Bookmarks</Text>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="py-2 px-4 bg-white border-b border-gray-200"
      >
        {["all", "events", "jobs", "updates", "promotions"].map((type) => (
          <TouchableOpacity
            key={type}
            className={`mr-2 px-4 py-2 rounded-full ${activeType === type ? "bg-blue-600" : "bg-gray-100"}`}
            onPress={() => handleTypeChange(type)}
          >
            <Text
              className={`font-medium ${activeType === type ? "text-white" : "text-gray-700"}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView className="flex-1 p-4">
        {/* Events Section */}
        {filteredBookmarks.events && filteredBookmarks.events.length > 0 && (
          <View className="mb-6">
            {activeType === "all" && (
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Events</Text>
                <TouchableOpacity
                  onPress={() => handleTypeChange("events")}
                  className="flex-row items-center"
                >
                  <Text className="text-blue-600 mr-1">See all</Text>
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={filteredBookmarks.events}
              renderItem={renderEventItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Jobs Section */}
        {filteredBookmarks.jobs && filteredBookmarks.jobs.length > 0 && (
          <View className="mb-6">
            {activeType === "all" && (
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Jobs</Text>
                <TouchableOpacity
                  onPress={() => handleTypeChange("jobs")}
                  className="flex-row items-center"
                >
                  <Text className="text-blue-600 mr-1">See all</Text>
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={filteredBookmarks.jobs}
              renderItem={renderJobItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Updates Section */}
        {filteredBookmarks.updates && filteredBookmarks.updates.length > 0 && (
          <View className="mb-6">
            {activeType === "all" && (
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Updates</Text>
                <TouchableOpacity
                  onPress={() => handleTypeChange("updates")}
                  className="flex-row items-center"
                >
                  <Text className="text-blue-600 mr-1">See all</Text>
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={filteredBookmarks.updates}
              renderItem={renderUpdateItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Promotions Section */}
        {filteredBookmarks.promotions &&
          filteredBookmarks.promotions.length > 0 && (
            <View className="mb-6">
              {activeType === "all" && (
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-bold">Promotions</Text>
                  <TouchableOpacity
                    onPress={() => handleTypeChange("promotions")}
                    className="flex-row items-center"
                  >
                    <Text className="text-blue-600 mr-1">See all</Text>
                  </TouchableOpacity>
                </View>
              )}
              <FlatList
                data={filteredBookmarks.promotions}
                renderItem={renderPromotionItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          )}

        {/* Empty State */}
        {Object.values(filteredBookmarks).every(
          (items) => !items || items.length === 0,
        ) && (
          <View className="items-center justify-center py-12">
            <Bookmark size={64} color="#D1D5DB" />
            <Text className="text-xl font-bold text-gray-400 mt-4 mb-2">
              No bookmarks yet
            </Text>
            <Text className="text-gray-500 text-center px-8">
              Items you bookmark will appear here for easy access
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
