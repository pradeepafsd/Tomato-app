import { Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SuccessScreen = ({ navigation, route }) => {
   const item = route?.params?.item;
  return (
    <View className="flex-1 justify-center p-10 mt-2 bg-slate-50">
      <View className="flex-row justify-center">
        <Image
          source={require("../../assets/images/celeberate.png")}
          className="w-full h-32 ms-2"
        />
        <View className="p-3 bg-green-600 rounded-full absolute top-10 mt-6">
          <Ionicons name="checkmark" size={24} color={"white"}/>
        </View>
      </View>
      <Text className="text-black text-center font-extrabold text-4xl mt-7">
        Order Confirmed!
      </Text>
      <Text className="text-gray-500 text-lg text-center">
        Your order has been placed successfully.
      </Text>
      <Image
        source={item.image}
        className="w-[115%] h-96 -ml-5 mt-4"
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="p-5 bg-red-600 rounded-2xl mt-12"
      >
        <Text className="text-white text-center font-bold text-xl">
          Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessScreen;
