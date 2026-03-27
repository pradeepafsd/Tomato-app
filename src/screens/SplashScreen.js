import { useEffect } from "react";
import { Text, View, Image } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { StatusBar } from "expo-status-bar";

// Splash screen shown on app launch
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    let timer;

    // Listen for Firebase authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      timer = setTimeout(() => {
        navigation.replace(user ? "MainTabs" : "Login"); // Navigate based on auth
      }, 2000); // 2 seconds delay
    });

    return () => {
      if (timer) clearTimeout(timer); // correct cleanup of timer
      unsubscribe(); // remove firebase listener
    };
  }, []);

  return (
    <>
      <StatusBar style="light" /> {/* Set status bar to light mode */}
      <View className=" flex-1 p-10 bg-red-500">
        <View className="flex-1 justify-center">
          <Text className="font-bold text-5xl text-white text-center">
            Tomato {/* App name */}
          </Text>
        </View>
        <View className="flex-2 mb-3">
          <Image
            source={require("../../assets/images/Floating-burger.png")} // Splash image
            className="w-96 h-96"
          />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;