import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { X, Settings, Bell, Calendar, Briefcase } from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "event" | "update" | "job" | "promotion";
}

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function NotificationsModal({
  visible,
  onClose,
}: NotificationsModalProps) {
  const { t } = useTranslation();

  // Sample notifications data
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "New Event",
      message: "Community festival this weekend!",
      time: "2h ago",
      read: false,
      type: "event",
    },
    {
      id: "2",
      title: "Job Alert",
      message: "5 new jobs match your profile",
      time: "5h ago",
      read: false,
      type: "job",
    },
    {
      id: "3",
      title: "Local News",
      message: "Road closure on Main Street",
      time: "1d ago",
      read: true,
      type: "update",
    },
    {
      id: "4",
      title: "Special Offer",
      message: "50% off at local restaurants",
      time: "2d ago",
      read: true,
      type: "promotion",
    },
  ];

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "event":
        return "bg-purple-100 text-purple-600";
      case "job":
        return "bg-blue-100 text-blue-600";
      case "update":
        return "bg-green-100 text-green-600";
      case "promotion":
        return "bg-orange-100 text-orange-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar size={16} color="#8B5CF6" />;
      case "job":
        return <Briefcase size={16} color="#3B82F6" />;
      case "update":
        return <Bell size={16} color="#10B981" />;
      case "promotion":
        return <Bell size={16} color="#F97316" />;
      default:
        return <Bell size={16} color="#6B7280" />;
    }
  };

  const markAllAsRead = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, you would update the notification state here
  };

  const renderNotificationItem = ({ item }: { item: NotificationItem }) => {
    const colorClass = getNotificationColor(item.type);
    const iconComponent = getNotificationIcon(item.type);

    return (
      <TouchableOpacity
        className={`p-4 border-b border-gray-100 ${!item.read ? "bg-blue-50" : ""}`}
      >
        <View className="flex-row items-start">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${colorClass.split(" ")[0]}`}
          >
            {iconComponent}
          </View>
          <View className="flex-1 ml-3">
            <View className="flex-row justify-between">
              <Text className="font-bold">{item.title}</Text>
              <Text className="text-xs text-gray-500">{item.time}</Text>
            </View>
            <Text className="text-gray-600 mt-1">{item.message}</Text>
          </View>
          {!item.read && (
            <View className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
          )}
        </View>
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
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-blue-600">
              Notifications
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
            >
              <X size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center px-4 py-2 bg-gray-50">
            <TouchableOpacity onPress={markAllAsRead}>
              <Text className="text-blue-600 font-medium">
                Mark all as read
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Settings size={16} color="#4B5563" />
              <Text className="ml-1 text-gray-600">Settings</Text>
            </TouchableOpacity>
          </View>

          {notifications.length > 0 ? (
            <FlatList
              data={notifications}
              renderItem={renderNotificationItem}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View className="flex-1 items-center justify-center p-6">
              <Bell size={48} color="#D1D5DB" />
              <Text className="text-lg font-medium text-gray-500 mt-4">
                No notifications yet
              </Text>
              <Text className="text-center text-gray-400 mt-2">
                We'll notify you when something new happens
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
