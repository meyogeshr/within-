import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Import detail screens
import EventDetailScreen from "../components/screens/EventDetailScreen";
import JobDetailScreen from "../components/screens/JobDetailScreen";
import UpdateDetailScreen from "../components/screens/UpdateDetailScreen";
import PromotionDetailScreen from "../components/screens/PromotionDetailScreen";
import BookmarksScreen from "../components/screens/BookmarksScreen";
import PaymentHistoryScreen from "../components/screens/PaymentHistoryScreen";

const Stack = createStackNavigator();

export default function DetailNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
      <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      <Stack.Screen name="UpdateDetail" component={UpdateDetailScreen} />
      <Stack.Screen name="PromotionDetail" component={PromotionDetailScreen} />
      <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
    </Stack.Navigator>
  );
}
