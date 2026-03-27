import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Setup Android channel
export const setupNotificationChannel = async () => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
};

// Request permissions (iOS)
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Notification permission denied!");
    return false;
  }
  return true;
};

// Schedule a local notification
export const sendLocalNotification = async (title, body, seconds = 5) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "default",
    },
    trigger: { seconds }, // fires after X seconds
  });
};