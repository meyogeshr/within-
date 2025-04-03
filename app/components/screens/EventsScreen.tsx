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
import {
  Filter,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
} from "lucide-react-native";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}

export default function EventsScreen() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    "Music",
    "Art",
    "Sports",
    "Food",
    "Education",
    "Community",
  ];

  const events: EventItem[] = [
    {
      id: "1",
      title: "Community Festival at Central Park",
      description:
        "Join us for a day of music, food, and fun activities for the whole family.",
      date: "This Weekend",
      time: "10:00 AM - 6:00 PM",
      location: "Central Park",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
      category: "Community",
    },
    {
      id: "2",
      title: "Local Art Exhibition",
      description:
        "Featuring works from local artists showcasing the culture and heritage of our community.",
      date: "Tomorrow",
      time: "11:00 AM - 7:00 PM",
      location: "City Gallery",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
      category: "Art",
    },
    {
      id: "3",
      title: "Farmers Market",
      description:
        "Fresh produce, handmade crafts, and local delicacies from farmers and artisans.",
      date: "Every Saturday",
      time: "8:00 AM - 1:00 PM",
      location: "Town Square",
      image:
        "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=500&q=80",
      category: "Food",
    },
    {
      id: "4",
      title: "Charity Run for Education",
      description:
        "5K run to raise funds for local schools and educational programs.",
      date: "Next Sunday",
      time: "7:00 AM - 10:00 AM",
      location: "Riverside Park",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=80",
      category: "Sports",
    },
    {
      id: "5",
      title: "Live Music Night",
      description:
        "Local bands performing a variety of music genres. Food and drinks available.",
      date: "Friday",
      time: "7:00 PM - 11:00 PM",
      location: "The Venue",
      image:
        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&q=80",
      category: "Music",
    },
  ];

  const filteredEvents =
    selectedCategory && selectedCategory !== "All"
      ? events.filter((event) => event.category === selectedCategory)
      : events;

  const renderEventItem = ({ item }: { item: EventItem }) => (
    <TouchableOpacity className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
      <Image
        source={{ uri: item.image }}
        className="w-full h-48"
        contentFit="cover"
      />
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <Calendar size={16} color="#8B5CF6" />
          <Text className="ml-2 text-purple-600 text-sm font-medium">
            {item.date}
          </Text>
        </View>
        <Text className="text-lg font-bold mb-1">{item.title}</Text>
        <Text className="text-gray-600 mb-3">{item.description}</Text>
        <View className="flex-row items-center mb-3">
          <Clock size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-600">{item.time}</Text>
        </View>
        <View className="flex-row items-center mb-3">
          <MapPin size={16} color="#6B7280" />
          <Text className="ml-2 text-gray-600">{item.location}</Text>
        </View>
        <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded-full self-start">
          <Text className="text-white font-medium">Learn More</Text>
        </TouchableOpacity>
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

        <Text className="text-2xl font-bold mb-4">Events Near You</Text>

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
          data={filteredEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
