import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  X,
  Search,
  Mic,
  Clock,
  TrendingUp,
  Calendar,
  Briefcase,
  Bell,
  Tag,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

interface SearchItem {
  id: string;
  text: string;
  type: "recent" | "popular" | "result";
  category?: "event" | "job" | "update" | "promotion";
}

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);

  // Sample recent searches
  const recentSearches: SearchItem[] = [
    { id: "r1", text: "Community events", type: "recent" },
    { id: "r2", text: "Software developer jobs", type: "recent" },
    { id: "r3", text: "Local news", type: "recent" },
  ];

  // Sample popular searches
  const popularSearches: SearchItem[] = [
    { id: "p1", text: "Weekend events", type: "popular" },
    { id: "p2", text: "Remote jobs", type: "popular" },
    { id: "p3", text: "Restaurant deals", type: "popular" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Simulate search results
    if (query.length > 2) {
      const results: SearchItem[] = [
        {
          id: "1",
          text: "Community Festival",
          type: "result",
          category: "event",
        },
        {
          id: "2",
          text: "Software Developer at TechCorp",
          type: "result",
          category: "job",
        },
        {
          id: "3",
          text: "Local Park Renovation Update",
          type: "result",
          category: "update",
        },
        {
          id: "4",
          text: "50% Off at Local Restaurants",
          type: "result",
          category: "promotion",
        },
      ].filter((item) => item.text.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleVoiceSearch = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, you would implement voice search here
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
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

  const renderSearchItem = ({ item }: { item: SearchItem }) => {
    let icon;
    switch (item.type) {
      case "recent":
        icon = <Clock size={16} color="#6B7280" />;
        break;
      case "popular":
        icon = <TrendingUp size={16} color="#6B7280" />;
        break;
      case "result":
        icon = getCategoryIcon(item.category);
        break;
    }

    return (
      <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-100">
        <View className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center">
          {icon}
        </View>
        <Text className="flex-1 ml-3">{item.text}</Text>
      </TouchableOpacity>
    );
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
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
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
                  <X size={18} color="#6B7280" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleVoiceSearch}>
                  <Mic size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <ScrollView className="flex-1">
            {searchQuery.length > 2 ? (
              <View>
                <Text className="px-4 pt-4 pb-2 text-sm font-medium text-gray-500">
                  Search Results
                </Text>
                {searchResults.length > 0 ? (
                  <FlatList
                    data={searchResults}
                    renderItem={renderSearchItem}
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
                <Text className="px-4 pt-4 pb-2 text-sm font-medium text-gray-500">
                  Recent Searches
                </Text>
                <FlatList
                  data={recentSearches}
                  renderItem={renderSearchItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />

                <Text className="px-4 pt-4 pb-2 text-sm font-medium text-gray-500">
                  Popular Searches
                </Text>
                <FlatList
                  data={popularSearches}
                  renderItem={renderSearchItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            )}
          </ScrollView>

          <View className="p-4 border-t border-gray-200">
            <TouchableOpacity
              onPress={onClose}
              className="py-3 items-center bg-gray-100 rounded-full"
            >
              <Text className="font-medium">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
