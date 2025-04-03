import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity } from "react-native";
import { useUserPreference } from "../context/UserPreferenceContext";
import { useTranslation } from "react-i18next";
import {
  Home,
  Calendar,
  Briefcase,
  Bell,
  Tag,
  Search,
} from "lucide-react-native";

// Screens
import HomeScreen from "../components/screens/HomeScreen";
import UpdatesScreen from "../components/screens/UpdatesScreen";
import EventsScreen from "../components/screens/EventsScreen";
import JobsScreen from "../components/screens/JobsScreen";
import PromotionsScreen from "../components/screens/PromotionsScreen";
import SearchScreen from "../components/screens/SearchScreen";

// Navigation components
import TopNavBar from "../components/navigation/TopNavBar";
import ProfileModal from "../components/navigation/ProfileModal";
import NotificationsModal from "../components/navigation/NotificationsModal";
import SearchModal from "../components/navigation/SearchModal";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  const { t } = useTranslation();
  const { userPreference } = useUserPreference();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Determine which tab layout to use based on user preference
  const isJobsLayout = userPreference === "jobs";

  const handleLogout = () => {
    // In a real app, you would implement logout functionality here
    console.log("Logout");
  };

  // Custom header component with TopNavBar
  const renderHeader = () => (
    <TopNavBar
      onProfilePress={() => setShowProfileModal(true)}
      onNotificationPress={() => setShowNotificationsModal(true)}
    />
  );

  return (
    <View className="flex-1">
      <Tab.Navigator
        screenOptions={{
          header: renderHeader,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: "#3B82F6",
          tabBarInactiveTintColor: "#6B7280",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          }}
        />

        {isJobsLayout && (
          <Tab.Screen
            name="Jobs"
            component={JobsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Briefcase size={size} color={color} />
              ),
            }}
          />
        )}

        <Tab.Screen
          name="Updates"
          component={UpdatesScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
          }}
        />

        <Tab.Screen
          name="Events"
          component={EventsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Calendar size={size} color={color} />
            ),
          }}
        />

        {!isJobsLayout && (
          <Tab.Screen
            name="Promotions"
            component={PromotionsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Tag size={size} color={color} />
              ),
            }}
          />
        )}

        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Search size={size} color={color} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={() => setShowSearchModal(true)}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/* Modals */}
      <ProfileModal
        visible={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onLogout={handleLogout}
      />

      <NotificationsModal
        visible={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      <SearchModal
        visible={showSearchModal}
        onClose={() => setShowSearchModal(false)}
      />
    </View>
  );
}
