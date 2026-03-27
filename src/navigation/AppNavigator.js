import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DetailScreen from "../screens/DetailScreen";
import SuccessScreen from "../screens/SuccessScreen";
import TabNavigator from '../navigation/TabNavigator';

// Main stack navigator for authentication flow and main app
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Splash" // start app with SplashScreen
      screenOptions={{
        headerShown: false, // hide default header for all screens
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} /> {/* Splash screen */}
      <Stack.Screen name="Login" component={LoginScreen} /> {/* Login screen */}
      <Stack.Screen name="Signup" component={SignupScreen} /> {/* Signup screen */}

      <Stack.Screen name="MainTabs" component={TabNavigator} /> {/* Bottom tabs after login */}

      <Stack.Screen name="Detail" component={DetailScreen} /> {/* Product detail screen */}
      <Stack.Screen name="Success" component={SuccessScreen} /> {/* Order success screen */}
    </Stack.Navigator>
  );
};

export default AppNavigator;