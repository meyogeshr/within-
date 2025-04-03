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
  Briefcase,
  Building,
  ChevronDown,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface JobDetailScreenProps {
  route?: { params: { jobId: string } };
  navigation?: any;
}

export default function JobDetailScreen({
  route,
  navigation,
}: JobDetailScreenProps) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // In a real app, you would fetch the job details based on the jobId
  const jobId = route?.params?.jobId || "1";

  // Sample job data
  const job = {
    id: jobId,
    title: "Software Developer",
    company: "TechCorp",
    location: "Bangalore, India",
    salary: "₹15-20 LPA",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We are looking for a skilled software developer with experience in React Native and TypeScript. The ideal candidate will have a strong understanding of mobile app development and be able to work in a fast-paced environment. You will be responsible for developing and maintaining mobile applications, collaborating with cross-functional teams, and ensuring the performance and quality of applications.",
    responsibilities: [
      "Develop and maintain mobile applications using React Native",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Identify and correct bottlenecks and fix bugs",
      "Help maintain code quality, organization, and automatization",
    ],
    requirements: [
      "3+ years of experience in mobile app development",
      "Strong proficiency in JavaScript and TypeScript",
      "Experience with React Native",
      "Familiarity with native build tools",
      "Understanding of REST APIs and offline storage",
    ],
    benefits: [
      "Competitive salary",
      "Flexible working hours",
      "Health insurance",
      "Annual bonus",
      "Professional development opportunities",
    ],
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=TC",
    applicants: 42,
    deadline: "30 days left",
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
        message: `Check out this job: ${job.title} at ${job.company} - ${job.salary}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleApply = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, this would navigate to a job application screen
    alert("Navigate to job application");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="p-4 flex-row justify-between items-center border-b border-gray-200">
        <TouchableOpacity onPress={handleBack}>
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>

        <View className="flex-row">
          <TouchableOpacity onPress={handleBookmark} className="mr-4">
            <Bookmark
              size={24}
              color={bookmarked ? "#3B82F6" : "#4B5563"}
              fill={bookmarked ? "#3B82F6" : "transparent"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Share2 size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Job Header */}
        <View className="p-4 border-b border-gray-200">
          <View className="flex-row mb-4">
            <View className="w-16 h-16 rounded-lg bg-blue-100 overflow-hidden mr-4">
              <Image
                source={{ uri: job.logo }}
                className="w-full h-full"
                contentFit="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-2xl font-bold mb-1">{job.title}</Text>
              <View className="flex-row items-center">
                <Building size={16} color="#6B7280" />
                <Text className="ml-1 text-gray-600">{job.company}</Text>
              </View>
            </View>
          </View>

          <View className="flex-row flex-wrap mb-4">
            <View className="bg-blue-50 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-blue-600">{job.type}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-gray-600">{job.salary}</Text>
            </View>
            <View className="bg-gray-100 px-3 py-1 rounded-full mr-2 mb-2">
              <Text className="text-gray-600">{job.location}</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-row items-center">
              <Clock size={16} color="#6B7280" />
              <Text className="ml-1 text-gray-600">Posted {job.posted}</Text>
            </View>
            <View className="flex-row items-center">
              <User size={16} color="#6B7280" />
              <Text className="ml-1 text-gray-600">
                {job.applicants} applicants
              </Text>
            </View>
          </View>
        </View>

        {/* Job Description */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold mb-2">Job Description</Text>
          <Text
            className="text-gray-600 leading-6"
            numberOfLines={showFullDescription ? undefined : 5}
          >
            {job.description}
          </Text>
          {job.description.length > 150 && (
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

        {/* Responsibilities */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold mb-2">Responsibilities</Text>
          {job.responsibilities.map((item, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <CheckCircle size={16} color="#10B981" className="mt-1" />
              <Text className="ml-2 text-gray-600 flex-1">{item}</Text>
            </View>
          ))}
        </View>

        {/* Requirements */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold mb-2">Requirements</Text>
          {job.requirements.map((item, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <CheckCircle size={16} color="#3B82F6" className="mt-1" />
              <Text className="ml-2 text-gray-600 flex-1">{item}</Text>
            </View>
          ))}
        </View>

        {/* Benefits */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold mb-2">Benefits</Text>
          {job.benefits.map((item, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <CheckCircle size={16} color="#8B5CF6" className="mt-1" />
              <Text className="ml-2 text-gray-600 flex-1">{item}</Text>
            </View>
          ))}
        </View>

        {/* Company Info Placeholder */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-lg font-bold mb-2">About {job.company}</Text>
          <Text className="text-gray-600 mb-4">
            TechCorp is a leading technology company specializing in innovative
            software solutions. With a team of talented professionals, we strive
            to deliver high-quality products that meet our clients' needs.
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-blue-600 font-medium mr-1">
              Visit Company Profile
            </Text>
            <ChevronDown size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Similar Jobs Placeholder */}
        <View className="p-4">
          <Text className="text-lg font-bold mb-2">Similar Jobs</Text>
          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <Text className="font-bold mb-1">Frontend Developer</Text>
            <Text className="text-gray-600 mb-2">WebTech Solutions</Text>
            <View className="flex-row">
              <View className="bg-gray-100 px-2 py-1 rounded-full mr-2">
                <Text className="text-xs text-gray-600">₹12-15 LPA</Text>
              </View>
              <View className="bg-gray-100 px-2 py-1 rounded-full">
                <Text className="text-xs text-gray-600">Bangalore</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg p-4">
            <Text className="font-bold mb-1">Mobile App Developer</Text>
            <Text className="text-gray-600 mb-2">AppWorks Inc.</Text>
            <View className="flex-row">
              <View className="bg-gray-100 px-2 py-1 rounded-full mr-2">
                <Text className="text-xs text-gray-600">₹15-18 LPA</Text>
              </View>
              <View className="bg-gray-100 px-2 py-1 rounded-full">
                <Text className="text-xs text-gray-600">Remote</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View className="p-4 border-t border-gray-200 bg-white">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-sm">Application Deadline</Text>
            <Text className="font-medium">{job.deadline}</Text>
          </View>

          <TouchableOpacity
            onPress={handleApply}
            className="bg-blue-600 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-bold">Apply Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
