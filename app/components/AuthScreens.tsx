import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  Check,
  Mail,
  Lock,
  User,
  AlertCircle,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";

type AuthScreenType =
  | "login"
  | "signup"
  | "forgot-password"
  | "password-changed";

interface AuthScreensProps {
  onAuthenticated?: () => void;
  initialScreen?: AuthScreenType;
}

export default function AuthScreens({
  onAuthenticated = () => {},
  initialScreen = "login",
}: AuthScreensProps) {
  const { t } = useTranslation();
  const [currentScreen, setCurrentScreen] =
    useState<AuthScreenType>(initialScreen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError(t("errors.fillAllFields"));
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const handleSignUp = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError(t("errors.fillAllFields"));
      return;
    }

    if (password !== confirmPassword) {
      setError(t("errors.passwordsDoNotMatch"));
      return;
    }

    if (!agreeToTerms) {
      setError(t("errors.agreeToTerms"));
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError(t("errors.enterEmail"));
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen("password-changed");
    }, 1500);
  };

  const handleSocialLogin = (platform: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 1500);
  };

  const renderPasswordStrength = () => {
    if (!password) return null;

    let strength = 0;
    let color = "bg-red-500";
    let text = t("passwordStrength.weak");

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (strength === 2) {
      color = "bg-yellow-500";
      text = t("passwordStrength.medium");
    } else if (strength === 3) {
      color = "bg-blue-500";
      text = t("passwordStrength.good");
    } else if (strength === 4) {
      color = "bg-green-500";
      text = t("passwordStrength.strong");
    }

    return (
      <View className="mt-1">
        <View className="flex-row items-center">
          <View className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <View
              className={`h-full ${color}`}
              style={{ width: `${25 * strength}%` }}
            />
          </View>
          <Text className="ml-2 text-xs text-gray-600">{text}</Text>
        </View>
      </View>
    );
  };

  const renderLoginScreen = () => (
    <View className="flex-1 p-6">
      <Text className="text-3xl font-bold mb-6 text-center">
        {t("auth.welcomeBack")}
      </Text>

      {error ? (
        <View className="mb-4 p-3 bg-red-100 rounded-lg flex-row items-center">
          <AlertCircle size={18} color="#EF4444" />
          <Text className="ml-2 text-red-600">{error}</Text>
        </View>
      ) : null}

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">
          {t("auth.email")}
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
          <Mail size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder={t("auth.enterEmail")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">
          {t("auth.password")}
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
          <Lock size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder={t("auth.enterPassword")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <EyeOff size={20} color="#6B7280" />
            ) : (
              <Eye size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCurrentScreen("forgot-password");
        }}
        className="self-end mb-6"
      >
        <Text className="text-blue-600 font-medium">
          {t("auth.forgotPassword")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-blue-600 py-3 rounded-lg items-center mb-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">
            {t("auth.login")}
          </Text>
        )}
      </TouchableOpacity>

      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">{t("auth.orContinueWith")}</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <View className="flex-row justify-around mb-8">
        <TouchableOpacity
          onPress={() => handleSocialLogin("google")}
          className="bg-white border border-gray-300 rounded-lg p-3 w-24 items-center"
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocialLogin("facebook")}
          className="bg-white border border-gray-300 rounded-lg p-3 w-24 items-center"
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
            }}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSocialLogin("apple")}
          className="bg-white border border-gray-300 rounded-lg p-3 w-24 items-center"
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            }}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center">
        <Text className="text-gray-600">{t("auth.dontHaveAccount")} </Text>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCurrentScreen("signup");
          }}
        >
          <Text className="text-blue-600 font-medium">{t("auth.signup")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSignUpScreen = () => (
    <ScrollView className="flex-1">
      <View className="p-6">
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCurrentScreen("login");
          }}
          className="mb-4"
        >
          <ArrowLeft size={24} color="#4B5563" />
        </TouchableOpacity>

        <Text className="text-3xl font-bold mb-6 text-center">
          {t("auth.createAccount")}
        </Text>

        {error ? (
          <View className="mb-4 p-3 bg-red-100 rounded-lg flex-row items-center">
            <AlertCircle size={18} color="#EF4444" />
            <Text className="ml-2 text-red-600">{error}</Text>
          </View>
        ) : null}

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">
            {t("auth.fullName")}
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
            <User size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder={t("auth.enterFullName")}
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">
            {t("auth.email")}
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
            <Mail size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder={t("auth.enterEmail")}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">
            {t("auth.password")}
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder={t("auth.createPassword")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
          {renderPasswordStrength()}
        </View>

        <View className="mb-4">
          <Text className="text-gray-700 mb-2 font-medium">
            {t("auth.confirmPassword")}
          </Text>
          <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder={t("auth.confirmYourPassword")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={20} color="#6B7280" />
              ) : (
                <Eye size={20} color="#6B7280" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          className="flex-row items-center mb-6"
        >
          <View
            className={`w-5 h-5 border rounded mr-2 items-center justify-center ${agreeToTerms ? "bg-blue-600 border-blue-600" : "border-gray-400"}`}
          >
            {agreeToTerms && <Check size={16} color="white" />}
          </View>
          <Text className="text-gray-700">
            {t("auth.agreeToTerms")}{" "}
            <Text className="text-blue-600">
              {t("auth.termsAndConditions")}
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-blue-600 py-3 rounded-lg items-center mb-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">
              {t("auth.createAccount")}
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500">{t("auth.orSignUpWith")}</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <View className="flex-row justify-around mb-8">
          <TouchableOpacity
            onPress={() => handleSocialLogin("google")}
            className="bg-white border border-gray-300 rounded-lg p-3 w-24 items-center"
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
              }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSocialLogin("facebook")}
            className="bg-white border border-gray-300 rounded-lg p-3 w-24 items-center"
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
              }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSocialLogin("apple")}
            className="bg-white border border-gray-300 rounded-lg p-3 w-24 items-center"
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
              }}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center">
          <Text className="text-gray-600">{t("auth.alreadyHaveAccount")} </Text>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setCurrentScreen("login");
            }}
          >
            <Text className="text-blue-600 font-medium">{t("auth.login")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderForgotPasswordScreen = () => (
    <View className="flex-1 p-6">
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCurrentScreen("login");
        }}
        className="mb-4"
      >
        <ArrowLeft size={24} color="#4B5563" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold mb-2 text-center">
        {t("auth.resetPassword")}
      </Text>
      <Text className="text-gray-600 mb-6 text-center">
        {t("auth.resetPasswordDesc")}
      </Text>

      {error ? (
        <View className="mb-4 p-3 bg-red-100 rounded-lg flex-row items-center">
          <AlertCircle size={18} color="#EF4444" />
          <Text className="ml-2 text-red-600">{error}</Text>
        </View>
      ) : null}

      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">
          {t("auth.email")}
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-2">
          <Mail size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder={t("auth.enterEmail")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={handleForgotPassword}
        className="bg-blue-600 py-3 rounded-lg items-center mb-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">
            {t("auth.sendResetLink")}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderPasswordChangedScreen = () => (
    <View className="flex-1 p-6 justify-center items-center">
      <View className="bg-green-100 rounded-full p-4 mb-6">
        <Check size={48} color="#10B981" />
      </View>

      <Text className="text-2xl font-bold mb-2 text-center">
        {t("auth.passwordResetSent")}
      </Text>
      <Text className="text-gray-600 mb-8 text-center">
        {t("auth.checkEmail")}
      </Text>

      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setCurrentScreen("login");
        }}
        className="bg-blue-600 py-3 px-6 rounded-lg items-center"
      >
        <Text className="text-white font-bold text-lg">
          {t("auth.backToLogin")}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      {currentScreen === "login" && renderLoginScreen()}
      {currentScreen === "signup" && renderSignUpScreen()}
      {currentScreen === "forgot-password" && renderForgotPasswordScreen()}
      {currentScreen === "password-changed" && renderPasswordChangedScreen()}
    </KeyboardAvoidingView>
  );
}
