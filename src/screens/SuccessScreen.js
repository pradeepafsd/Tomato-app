import { Text, View, Image, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

// Screen shown after successful order placement
const SuccessScreen = ({ navigation, route }) => {
  const cartItems = route?.params?.cartItems || []; // Get cart items from route params

  // Request permission (simple - local only)
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted"; // Check if permission granted
  };

  // Trigger local notification
  const triggerOrderNotification = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return; // Exit if no permission

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order Placed! ✅", // Notification title
        body: "Your order has been placed successfully.", // Notification body
        sound: true, // Play sound
      },
      trigger: null, // instant notification
    });
  };

  useEffect(() => {
    // Android channel (required for Android notifications)
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("orders", {
        name: "Orders",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    triggerOrderNotification(); // Trigger notification on mount
  }, []);

  return (
    <View className="flex-1 justify-center p-10 mt-2 bg-slate-50">
      <View className="flex-row justify-center">
        <Image
          source={require("../../assets/images/celeberate.png")} // Celebration image
          className="w-full h-32 ms-2"
        />
        <View className="p-3 bg-green-600 rounded-full absolute top-10 mt-6">
          <Ionicons name="checkmark" size={24} color={"white"} /> {/* Checkmark icon */}
        </View>
      </View>

      <Text className="text-black text-center font-extrabold text-4xl mt-7">
        Order Confirmed! {/* Confirmation message */}
      </Text>

      <Text className="text-gray-500 text-lg text-center">
        Your order has been placed successfully. {/* Subtext message */}
      </Text>

      <View className="flex-row justify-center mt-4">
        {cartItems.slice(0, 3).map((item, index) => {
          let sizeClass = "w-28 h-28"; // Default image size

          if (cartItems.length === 1) sizeClass = "w-[100%] h-80"; // Single item full width
          else if (cartItems.length === 2) sizeClass = "w-52 h-52"; // Two items medium size

          return (
            <Image
              key={index}
              source={item.image} // Product image
              className={`rounded-lg mx-1 ${sizeClass}`}
            />
          );
        })}
      </View>

      <TouchableOpacity
        onPress={() => navigation.replace("MainTabs")} // Navigate back to home
        className="p-5 bg-red-600 rounded-2xl mt-12"
      >
        <Text className="text-white text-center font-bold text-xl">
          Back to Home {/* Button text */}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;