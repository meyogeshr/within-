import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import {
  Search,
  Mic,
  Calendar,
  Briefcase,
  Bell,
  Tag,
  MapPin,
  ArrowLeft,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  type: "event" | "job" | "update" | "promotion";
  image?: string;
}

export default function SearchScreen({ navigation }: any) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Community events",
    "Software developer jobs",
    "Local news",
  ]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Simulate search results
    if (query.length > 2) {
      const results: SearchResultItem[] = [
        {
          id: "1",
          title: "Community Festival at Central Park",
          description: "This Weekend",
          type: "event",
          image:
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80",
        },
        {
          id: "2",
          title: "Software Developer at TechCorp",
          description: "₹15-20 LPA • Full-time",
          type: "job",
          image: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
        },
        {
          id: "3",
          title: "Road Closure on Main Street",
          description:
            "Due to construction, Main Street will be closed this weekend.",
          type: "update",
        },
        {
          id: "4",
          title: "50% Off at Local Restaurants",
          description: "Valid until June 30",
          type: "promotion",
          image:
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
        },
      ].filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleVoiceSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, you would implement voice search here
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar size={16} color="#8B5CF6" />;
      case "job":
        return <Briefcase size={16} color="#3B82F6" />;
      case "update":
        return <Bell size={16} color="#10B981" />;
      case "promotion":
        return <Tag size={16} color="#F97316" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "event":
        return "text-purple-600";
      case "job":
        return "text-blue-600";
      case "update":
        return "text-green-600";
      case "promotion":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const renderSearchResultItem = ({ item }: { item: SearchResultItem }) => (
    <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
      {item.image ? (
        <View className="w-12 h-12 rounded-lg overflow-hidden mr-3">
          <Image
            source={{ uri: item.image }}
            className="w-full h-full"
            contentFit="cover"
          />
        </View>
      ) : (
        <View className="w-12 h-12 rounded-lg bg-gray-100 items-center justify-center mr-3">
          {getTypeIcon(item.type)}
        </View>
      )}
      <View className="flex-1">
        <Text className="font-medium">{item.title}</Text>
        <View className="flex-row items-center">
          {getTypeIcon(item.type)}
          <Text className={`ml-1 text-sm ${getTypeColor(item.type)}`}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <ArrowLeft size={24} color="#4B5563" />
          </TouchableOpacity>
          <View className="flex-row flex-1 items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder="Search for events, jobs, updates..."
              value={searchQuery}
              onChangeText={handleSearch}
              autoFocus
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Text className="text-blue-600 font-medium">Clear</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleVoiceSearch}>
                <Mic size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {searchQuery.length > 2 ? (
          <View>
            <View className="flex-row items-center justify-between p-4">
              <Text className="font-medium">Search Results</Text>
              <Text className="text-gray-500 text-sm">
                {searchResults.length} results
              </Text>
            </View>
            {searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderSearchResultItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="p-4 items-center">
                <Text className="text-gray-500">No results found</Text>
              </View>
            )}
          </View>
        ) : (
          <View>
            <View className="p-4">
              <Text className="font-medium mb-2">Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  className="flex-row items-center py-3 border-b border-gray-100"
                  onPress={() => handleRecentSearch(search)}
                >
                  <Search size={16} color="#6B7280" />
                  <Text className="ml-3">{search}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="p-4">
              <Text className="font-medium mb-2">Popular Near You</Text>
              <View className="bg-white rounded-lg overflow-hidden shadow-sm">
                <TouchableOpacity
                  className="p-4 border-b border-gray-100"
                  onPress={() => handleRecentSearch("Weekend events")}
                >
                  <View className="flex-row items-center">
                    <Calendar size={16} color="#8B5CF6" />
                    <Text className="ml-2 text-purple-600">Weekend events</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-4 border-b border-gray-100"
                  onPress={() => handleRecentSearch("Remote jobs")}
                >
                  <View className="flex-row items-center">
                    <Briefcase size={16} color="#3B82F6" />
                    <Text className="ml-2 text-blue-600">Remote jobs</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  className="p-4"
                  onPress={() => handleRecentSearch("Restaurant deals")}
                >
                  <View className="flex-row items-center">
                    <Tag size={16} color="#F97316" />
                    <Text className="ml-2 text-orange-600">
                      Restaurant deals
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View className="p-4">
              <Text className="font-medium mb-2">Explore Categories</Text>
              <View className="flex-row flex-wrap">
                {[
                  "Events",
                  "Jobs",
                  "Updates",
                  "Promotions",
                  "Community",
                  "Education",
                ].map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-white m-1 px-4 py-2 rounded-full border border-gray-200"
                    onPress={() => handleRecentSearch(category)}
                  >
                    <Text>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
