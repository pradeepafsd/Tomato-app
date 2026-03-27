import { Text, View, TouchableOpacity, TextInput, Platform } from "react-native";
import Validation from "../utils/Validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

// Login screen with validation, Firebase auth, and local notifications
const LoginScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = Validation({
    email: "",
    password: "",
  }); // Initialize form state and validation

  const handleLogin = async () => {
    if (!validate("login")) return; // Validate inputs before login

    try {
      // 1. Firebase login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // 2. Store Firebase ID token
      const token = await user.getIdToken();
      await AsyncStorage.setItem("token", token); // Save token locally

      console.log("Login Success");

      // 3. Setup local notification (Expo)
      if (!Platform.OS) {
        alert("Use a real device for notifications"); // Notify if not real device
        return;
      }

      // Request notification permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permission denied"); // Log denial
      } else {
        console.log("Notification permission granted");

        // Schedule a local notification immediately
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Welcome Back",
            body: "Login successful!",
            sound: true,
          },
          trigger: null, // trigger immediately
        });
      }

      // 4. Navigate to main app tabs
      navigation.replace("MainTabs");
    } catch (error) {
      alert(error.message); // Show login errors
    }
  };

  return (
    <View className="flex-1 justify-center p-10 bg-white">
      {/* App logo and tagline */}
      <View className="mb-20">
        <Text className="font-bold text-6xl text-red-600 text-center">
          Tomato
        </Text>
        <Text className="text-center text-xl text-gray-500 mt-2">
          Food you love, delivered fast
        </Text>
      </View>

      {/* Email input */}
      <View
        className={`w-full p-3 bg-white shadow-lg rounded-lg mt-4 border ${
          errors.email
            ? "border-red-500"
            : values.email
            ? "border-green-500"
            : "border-gray-100"
        }`}
      >
        <TextInput
          placeholder="Email"
          placeholderTextColor="#6B7280"
          value={values.email}
          onChangeText={(text) => handleChange("email", text)}
          className="w-full text-black"
        />
      </View>
      {errors.email && (
        <Text className="text-red-500 mb-2 mt-2">{errors.email}</Text>
      )}

      {/* Password input */}
      <View
        className={`w-full p-3 bg-white shadow-lg rounded-lg mt-4 border ${
          errors.password
            ? "border-red-500"
            : values.password
            ? "border-green-500"
            : "border-gray-100"
        }`}
      >
        <TextInput
          placeholder="Password"
           placeholderTextColor="#6B7280"
          secureTextEntry
          value={values.password}
          onChangeText={(text) => handleChange("password", text)}
          className="w-full text-black"
        />
      </View>
      {errors.password && (
        <Text className="text-red-500 mb-2 mt-2">{errors.password}</Text>
      )}

      {/* Login button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="w-70 p-5 rounded-2xl bg-red-600 mt-14"
      >
        <Text className="text-white text-center text-xl">Login</Text>
      </TouchableOpacity>

      {/* Navigation to Signup */}
      <View className=" m-3 flex-row justify-center">
        <Text className="text-red-600 me-2 text-lg">
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text className="text-red-700 text-lg">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;