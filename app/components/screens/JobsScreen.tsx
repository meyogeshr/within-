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
  Briefcase,
  Clock,
  Building,
} from "lucide-react-native";

interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  logo: string;
  category: string;
}

export default function JobsScreen() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    "Technology",
    "Healthcare",
    "Education",
    "Retail",
    "Hospitality",
    "Finance",
  ];

  const jobs: JobItem[] = [
    {
      id: "1",
      title: "Software Developer",
      company: "TechCorp",
      location: "Bangalore, India",
      salary: "₹15-20 LPA",
      type: "Full-time",
      posted: "2 days ago",
      description:
        "We are looking for a skilled software developer with experience in React Native and TypeScript.",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
      category: "Technology",
    },
    {
      id: "2",
      title: "Customer Service Representative",
      company: "ServiceHub",
      location: "Remote",
      salary: "₹3-5 LPA",
      type: "Part-time",
      posted: "1 day ago",
      description:
        "No experience required, training provided. Excellent communication skills needed.",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=SH",
      category: "Retail",
    },
    {
      id: "3",
      title: "Nurse Practitioner",
      company: "City Hospital",
      location: "Bangalore, India",
      salary: "₹8-12 LPA",
      type: "Full-time",
      posted: "3 days ago",
      description:
        "Seeking a licensed nurse practitioner to join our growing team.",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CH",
      category: "Healthcare",
    },
    {
      id: "4",
      title: "Math Teacher",
      company: "Central High School",
      location: "Bangalore, India",
      salary: "₹6-8 LPA",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "Teaching mathematics to high school students. B.Ed required.",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CHS",
      category: "Education",
    },
    {
      id: "5",
      title: "Financial Analyst",
      company: "Global Finance",
      location: "Bangalore, India",
      salary: "₹10-15 LPA",
      type: "Full-time",
      posted: "5 days ago",
      description:
        "Analyzing financial data and preparing reports for management.",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=GF",
      category: "Finance",
    },
  ];

  const filteredJobs =
    selectedCategory && selectedCategory !== "All"
      ? jobs.filter((job) => job.category === selectedCategory)
      : jobs;

  const renderJobItem = ({ item }: { item: JobItem }) => (
    <TouchableOpacity className="bg-white rounded-xl p-4 mb-4 shadow-sm">
      <View className="flex-row mb-3">
        <View className="w-12 h-12 rounded-lg bg-blue-100 overflow-hidden mr-3">
          <Image
            source={{ uri: item.logo }}
            className="w-full h-full"
            contentFit="cover"
          />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold">{item.title}</Text>
          <View className="flex-row items-center">
            <Building size={14} color="#6B7280" />
            <Text className="ml-1 text-gray-600">{item.company}</Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center mb-2">
        <Briefcase size={16} color="#3b82f6" />
        <Text className="ml-2 text-blue-600 text-sm font-medium">
          {item.type}
        </Text>
      </View>

      <Text className="text-gray-600 mb-3">{item.description}</Text>

      <View className="flex-row items-center mb-2">
        <MapPin size={14} color="#6B7280" />
        <Text className="ml-1 text-gray-600 text-sm">{item.location}</Text>
      </View>

      <View className="flex-row items-center mb-3">
        <Clock size={14} color="#6B7280" />
        <Text className="ml-1 text-gray-600 text-sm">Posted {item.posted}</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-700 font-medium">{item.salary}</Text>
        <TouchableOpacity className="bg-blue-600 py-2 px-4 rounded-full">
          <Text className="text-white font-medium">Apply</Text>
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

        <Text className="text-2xl font-bold mb-4">Job Opportunities</Text>

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
          data={filteredJobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
