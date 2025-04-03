import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserPreferenceType = "updates" | "jobs" | "both" | null;

type UserPreferenceContextType = {
  userPreference: UserPreferenceType;
  setUserPreference: (preference: UserPreferenceType) => void;
};

const UserPreferenceContext = createContext<UserPreferenceContextType>({
  userPreference: null,
  setUserPreference: () => {},
});

export const useUserPreference = () => useContext(UserPreferenceContext);

export const UserPreferenceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [userPreference, setUserPreferenceState] =
    useState<UserPreferenceType>(null);

  useEffect(() => {
    // Load saved preference
    const loadPreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem("userPreference");
        if (savedPreference) {
          setUserPreferenceState(savedPreference as UserPreferenceType);
        }
      } catch (error) {
        console.error("Failed to load user preference:", error);
      }
    };

    loadPreference();
  }, []);

  const setUserPreference = async (preference: UserPreferenceType) => {
    try {
      if (preference) {
        await AsyncStorage.setItem("userPreference", preference);
      } else {
        await AsyncStorage.removeItem("userPreference");
      }
      setUserPreferenceState(preference);
    } catch (error) {
      console.error("Failed to save user preference:", error);
    }
  };

  return (
    <UserPreferenceContext.Provider
      value={{ userPreference, setUserPreference }}
    >
      {children}
    </UserPreferenceContext.Provider>
  );
};
