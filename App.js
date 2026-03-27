import { useEffect } from "react";
import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import * as Notifications from "expo-notifications";
import { CartProvider } from "./src/context/CartContext";
import { StatusBar } from "expo-status-bar";

// Configure how notifications appear in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // shows popup/banner
    shouldShowList: true, // shows in notification center
    shouldPlaySound: true, // plays notification sound
    shouldSetBadge: false, // does not change app icon badge
  }),
});

export default function App() {
  useEffect(() => {
    // Listener: notification received in foreground
    const sub1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Foreground notification:", notification);
      },
    );

    // Listener: user taps on notification
    const sub2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Notification tapped:", response);
      },
    );

    // Example: schedule a local notification 5 seconds after app opens
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello!",
        body: "This is a local notification",
      },
      trigger: { seconds: 5 },
    });

    // Clean up listeners when component unmounts
    return () => {
      sub1.remove();
      sub2.remove();
    };
  }, []);

  return (
    <>
      <StatusBar style="dark" /> {/* Sets status bar text color */}
      <CartProvider>
        <NavigationContainer>
          <AppNavigator /> {/* Main app navigation */}
        </NavigationContainer>
      </CartProvider>
    </>
  );
}