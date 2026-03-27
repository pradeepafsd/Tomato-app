import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileScreen from "../screens/ProfileScreen";

// Bottom tab navigator for main app screens: Home, Cart, Orders, Profile
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // hide header for all tabs
        tabBarActiveTintColor: "white", // active tab icon color
        tabBarInactiveTintColor: "#fca5a5", // inactive tab icon color
        tabBarStyle: { backgroundColor: "#dc2626", height: 90}, // tab bar styling
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home"; // home icon
          else if (route.name === "Cart") iconName = "cart"; // cart icon
          else if (route.name === "Orders") iconName = "list"; // orders icon
          else if (route.name === "Profile") iconName = "person"; // profile icon
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} /> {/* Home tab */}
      <Tab.Screen name="Cart" component={CartScreen} /> {/* Cart tab */}
      <Tab.Screen name="Orders" component={OrdersScreen} /> {/* Orders tab */}
      <Tab.Screen name="Profile" component={ProfileScreen} /> {/* Profile tab */}
    </Tab.Navigator>
  );
};

export default TabNavigator;