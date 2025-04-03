import React from "react";
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
  Download,
  CreditCard,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";

interface PaymentHistoryScreenProps {
  navigation?: any;
}

export default function PaymentHistoryScreen({
  navigation,
}: PaymentHistoryScreenProps) {
  const { t } = useTranslation();

  // Sample payment history data
  const payments = [
    {
      id: "p1",
      eventName: "Community Festival at Central Park",
      date: "May 15, 2023",
      amount: "₹500",
      status: "completed",
      ticketType: "General Admission",
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&q=80",
    },
    {
      id: "p2",
      eventName: "Local Art Exhibition",
      date: "April 22, 2023",
      amount: "₹300",
      status: "completed",
      ticketType: "VIP Access",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
    },
    {
      id: "p3",
      eventName: "Tech Conference 2023",
      date: "March 10, 2023",
      amount: "₹1,200",
      status: "completed",
      ticketType: "Full Pass",
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80",
    },
  ];

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation?.goBack();
  };

  const handleDownloadReceipt = (paymentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would download or display the receipt
    alert(`Download receipt for payment ${paymentId}`);
  };

  const handleViewTicket = (paymentId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, this would navigate to the ticket details
    alert(`View ticket for payment ${paymentId}`);
  };

  const renderPaymentItem = ({ item }: any) => (
    <View className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
      <View className="flex-row">
        <Image
          source={{ uri: item.image }}
          className="w-24 h-full"
          contentFit="cover"
        />
        <View className="flex-1 p-3">
          <Text className="font-bold mb-1">{item.eventName}</Text>
          <View className="flex-row items-center mb-1">
            <Calendar size={14} color="#6B7280" />
            <Text className="ml-1 text-gray-600 text-sm">{item.date}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-gray-600 text-sm">
              {item.ticketType} x {item.quantity}
            </Text>
          </View>
        </View>
      </View>
      <View className="border-t border-gray-100 p-3">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            {item.status === "completed" ? (
              <CheckCircle size={16} color="#10B981" />
            ) : (
              <Clock size={16} color="#F59E0B" />
            )}
            <Text
              className={`ml-1 text-sm ${item.status === "completed" ? "text-green-600" : "text-yellow-600"}`}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
          <Text className="font-bold">{item.amount}</Text>
        </View>
        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => handleDownloadReceipt(item.id)}
            className="flex-row items-center"
          >
            <Download size={14} color="#3B82F6" />
            <Text className="ml-1 text-blue-600 text-sm">Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleViewTicket(item.id)}
            className="bg-blue-600 px-3 py-1 rounded-full"
          >
            <Text className="text-white text-sm">View Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="p-4 flex-row items-center justify-between border-b border-gray-200 bg-white">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleBack} className="mr-4">
            <ArrowLeft size={24} color="#4B5563" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Payment History</Text>
        </View>
        <TouchableOpacity>
          <Filter size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Payment Summary */}
      <View className="p-4 bg-white border-b border-gray-200">
        <Text className="text-gray-500 mb-1">Total Spent</Text>
        <Text className="text-2xl font-bold mb-4">₹2,000</Text>

        <View className="flex-row">
          <View className="flex-1 border-r border-gray-200 pr-4">
            <Text className="text-gray-500 text-sm mb-1">Transactions</Text>
            <Text className="font-bold">{payments.length}</Text>
          </View>
          <View className="flex-1 pl-4">
            <Text className="text-gray-500 text-sm mb-1">Payment Methods</Text>
            <View className="flex-row items-center">
              <CreditCard size={16} color="#6B7280" />
              <Text className="ml-1 font-bold">2 Cards</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Payment List */}
      <FlatList
        data={payments}
        renderItem={renderPaymentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <CreditCard size={64} color="#D1D5DB" />
            <Text className="text-xl font-bold text-gray-400 mt-4 mb-2">
              No payment history
            </Text>
            <Text className="text-gray-500 text-center px-8">
              Your ticket purchases will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}
