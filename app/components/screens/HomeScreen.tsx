import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";
import { MapPin, Calendar, Briefcase, ChevronRight } from "lucide-react-native";

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row items-center mb-4">
          <MapPin size={16} color="#3b82f6" />
          <Text className="ml-1 text-blue-600 font-medium">
            Bangalore, India
          </Text>
        </View>

        <Text className="text-2xl font-bold mb-6">Welcome to Within</Text>

        {/* Featured Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Featured</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 mr-1">See all</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-xl overflow-hidden shadow-sm">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80",
              }}
              className="w-full h-48"
              contentFit="cover"
            />
            <View className="p-4">
              <View className="flex-row items-center mb-2">
                <Calendar size={16} color="#8B5CF6" />
                <Text className="ml-2 text-purple-600 text-sm font-medium">
                  This Weekend
                </Text>
              </View>
              <Text className="text-lg font-bold mb-1">
                Community Festival at Central Park
              </Text>
              <Text className="text-gray-600 mb-3">
                Join us for a day of music, food, and fun activities for the
                whole family.
              </Text>
              <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded-full self-start">
                <Text className="text-white font-medium">Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nearby Events Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Nearby Events</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 mr-1">See all</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-1"
          >
            {[1, 2, 3].map((item) => (
              <TouchableOpacity
                key={item}
                className="w-64 mx-2 bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <Image
                  source={{
                    uri: `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80`,
                  }}
                  className="w-full h-32"
                  contentFit="cover"
                />
                <View className="p-3">
                  <View className="flex-row items-center mb-1">
                    <Calendar size={14} color="#8B5CF6" />
                    <Text className="ml-1 text-purple-600 text-xs font-medium">
                      Tomorrow
                    </Text>
                  </View>
                  <Text className="font-bold mb-1">Local Art Exhibition</Text>
                  <Text className="text-gray-600 text-sm">
                    Featuring works from local artists
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Latest Updates Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Latest Updates</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 mr-1">See all</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          {[1, 2].map((item) => (
            <TouchableOpacity
              key={item}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm"
            >
              <Text className="text-lg font-bold mb-2">
                {item === 1
                  ? "Road Closure on Main Street"
                  : "New Community Center Opening"}
              </Text>
              <Text className="text-gray-600 mb-3">
                {item === 1
                  ? "Due to construction, Main Street will be closed this weekend."
                  : "The new community center will open next month with free activities."}
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-sm">2 hours ago</Text>
                <Text className="text-blue-600 font-medium">Read more</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Job Opportunities Section */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Job Opportunities</Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 mr-1">See all</Text>
              <ChevronRight size={16} color="#3b82f6" />
            </TouchableOpacity>
          </View>

          {[1, 2].map((item) => (
            <TouchableOpacity
              key={item}
              className="bg-white rounded-xl p-4 mb-3 shadow-sm"
            >
              <View className="flex-row items-center mb-2">
                <Briefcase size={16} color="#3b82f6" />
                <Text className="ml-2 text-blue-600 text-sm font-medium">
                  {item === 1 ? "Full-time" : "Part-time"}
                </Text>
              </View>
              <Text className="text-lg font-bold mb-1">
                {item === 1
                  ? "Software Developer at TechCorp"
                  : "Customer Service Representative"}
              </Text>
              <Text className="text-gray-600 mb-3">
                {item === 1
                  ? "5+ years experience, React Native, TypeScript"
                  : "No experience required, training provided"}
              </Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-sm">
                  {item === 1 ? "₹15-20 LPA" : "₹3-5 LPA"}
                </Text>
                <Text className="text-blue-600 font-medium">Apply now</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
