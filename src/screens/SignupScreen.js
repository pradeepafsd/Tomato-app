import { Text, View, TouchableOpacity, TextInput, Platform } from "react-native";
import Validation from "../utils/Validation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

// Signup screen for new users
const SignupScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = Validation({
    name: "",
    email: "",
    password: "",
  }); // Initialize form validation

  const handleSignup = async () => {
    if (!validate("signup")) return; // Stop if validation fails

    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // 2. Save display name to Firebase profile
      await updateProfile(user, {
        displayName: values.name,
      });

      // 3. Store Firebase ID token locally
      const token = await user.getIdToken();
      await AsyncStorage.setItem("token", token);

      console.log("Signup Success");

      // 4. Setup local notification
      if (!Platform.OS) {
        alert("Use a real device for notifications"); // Warn if simulator
        return;
      }

      // Request notification permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permission denied"); // Log denial
      } else {
        console.log("Notification permission granted"); // Log approval

        // Schedule immediate local notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Welcome",
            body: "Signup successful!",
            sound: true,
          },
          trigger: null, // triggers immediately
        });
      }

      // 5. Navigate to main app
      navigation.replace("MainTabs");
    } catch (error) {
      alert(error.message); // Show error alert
    }
  };

  return (
    <View className="flex-1 justify-center p-10 bg-white">
      <View className="mb-20">
        <Text className="font-bold text-6xl text-red-600 text-center">
          Tomato {/* App name */}
        </Text>
        <Text className="text-center text-xl text-gray-500 mt-2">
          Food you love, delivered fast {/* App tagline */}
        </Text>
      </View>

      {/* Name input */}
      <View
        className={`w-full p-3 bg-white shadow-lg rounded-lg mt-3 border ${
          errors.name
            ? "border-red-500"
            : values.name
            ? "border-green-500"
            : "border-gray-100"
        }`}
      >
        <TextInput
          placeholder="Name"
          placeholderTextColor="#6B7280"
          value={values.name}
          onChangeText={(text) => handleChange("name", text)}
          className="w-full text-black"
        />
      </View>
      {errors.name && <Text className="text-red-500 mb-2">{errors.name}</Text>}

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
      {errors.email && <Text className="text-red-500 mb-2 mt-2">{errors.email}</Text>}

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
      {errors.password && <Text className="text-red-500 mb-2 mt-2">{errors.password}</Text>}

      {/* Signup button */}
      <TouchableOpacity
        className="w-70 p-5 rounded-2xl bg-red-600 mt-14"
        onPress={handleSignup}
      >
        <Text className="text-white text-center text-xl">Sign up</Text>
      </TouchableOpacity>

      {/* Navigate to login */}
      <View className=" m-3 flex-row justify-center">
        <Text className="text-red-600 me-2 text-lg">Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-red-700 text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;