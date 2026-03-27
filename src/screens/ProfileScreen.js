import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Profile screen to display user info and logout option
const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState(auth.currentUser?.displayName || "User"); // User name
  const [latestAddress, setLatestAddress] = useState("No address set"); // Latest order address
  const [ordersCount, setOrdersCount] = useState(0); // Number of orders

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const ordersCol = collection(db, "orders");

        // 🔹 Get all orders of current user, newest first
        const q = query(
          ordersCol,
          where("userId", "==", auth.currentUser.uid),
          orderBy("createdAt", "desc"),
        );

        const snap = await getDocs(q);
        setOrdersCount(snap.size); // Update orders count

        if (!snap.empty) {
          // Latest address comes from the newest order
          const latestOrder = snap.docs[0].data();
          setLatestAddress(latestOrder.address || "No address set"); // Update latest address
        }
      } catch (error) {
        console.log("Error fetching profile data:", error); // Log any errors
      }
    };

    fetchProfile(); // Fetch profile data on mount
  }, []);

  const firstLetter = name.charAt(0).toUpperCase(); // First letter for avatar

  const handleLogout = async () => {
    try {
      // Firebase logout
      await signOut(auth);

      // Clear AsyncStorage tokens
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("expoPushToken");

      // Navigate to Login screen
      navigation.replace("Login");
    } catch (error) {
      console.log("Logout Error:", error); // Log logout errors
    }
  };

  return (
    <View className="flex-1 items-center justify-start bg-white pt-16 px-5">
      {/* Avatar */}
      <View className="w-24 h-24 rounded-full bg-red-500 items-center justify-center mb-5">
        <Text className="text-white text-3xl font-bold">{firstLetter}</Text>
      </View>

      {/* Username */}
      <Text className="text-xl font-bold mb-5">{name}</Text>

      {/* Email */}
      <View className="w-full bg-gray-100 p-4 rounded-lg mb-3">
        <Text className="text-gray-600">Email: {auth.currentUser?.email}</Text>
      </View>

      {/* Orders count */}
      <View className="w-full bg-gray-100 p-4 rounded-lg mb-3">
        <Text className="text-gray-600">Orders: {ordersCount}</Text>
      </View>

      {/* Latest address */}
      <View className="w-full bg-gray-100 p-4 rounded-lg mb-10">
        <Text className="text-gray-600">Address: {latestAddress}</Text>
      </View>

      {/* Logout button */}
      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-lg w-full"
        onPress={handleLogout}
      >
        <Text className="text-white font-bold text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;