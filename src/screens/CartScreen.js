import { Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = ({ navigation, route }) => {
  const item = route?.params?.item;
  return (
    <View className="flex-1 p-10 mt-4 bg-slate-50">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={"gray"} />
      </TouchableOpacity>
      <View className="bg-white p-5 shadow-2xl rounded-2xl flex-row justify-between mt-8">
        <Image source={item.image} className="w-24 h-20" />
        <View className="flex-col">
          <Text className="text-black font-extrabold text-2xl">
            {item.title}
          </Text>
          <Text className="text-black font-extrabold text-2xl">
            ₹{item.price}
          </Text>
        </View>
        <View>
          <Text className="text-red-500 text-xl relative top-16">1</Text>
        </View>
      </View>

      <View className="m-10">
        <View className="flex-row justify-between mb-3">
          <Text className="text-black text-xl">Order Summary</Text>
          <Text className="text-black text-xl">₹324.00</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Subtotal</Text>
          <Text className="text-gray-500">₹324.00</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-500">Delivery Fee</Text>
          <Text className="text-gray-500">₹2.00</Text>
        </View>
        <View className=" flex-row justify-between mt-5">
          <Text className="text-black text-xl">Total</Text>
          <Text className="text-black text-xl">₹326.00</Text>
        </View>
      </View>
      <View className="bg-white p-5 shadow-2xl flex-row justify-between mb-5 rounded-2xl">
        <Ionicons name="home" size={18} color={"black"} />
        <View>
          <Text className="text-black text-xl  font-extrabold flex-col">Address</Text>
          <Text className="text-gray-500">12, North Street, Chennai, TN 612001</Text>
        </View>
        <Text className="text-red-500 font-extrabold">Edit</Text>
      </View>
      <View className="bg-white p-5 shadow-2xl flex-row justify-between mt-4 rounded-2xl">
        <Ionicons name="card" size={18} color={"black"} className="me-3" />
        <View>
          <Text className="text-black text-xl font-extrabold flex-col">
            Payment Method
          </Text>
          <View className="flex-row w-60 gap-5 bg-gray-300 rounded-md shadow-lg mt-2 ">
            <Image
              source={require("../../assets/images/visa.png")}
              className="w-14 h-14 relative bottom-5 ms-4"
            />

            <Text className="text-gray-500 mt-4">**** 1234</Text>
          </View>
        </View>
        <Text className="text-red-500 font-extrabold">Change</Text>
      </View>
      <View className="mt-24 flex-row justify-between">
        <Text className="text-black font-extrabold text-3xl">Total</Text>
        <Text className="text-black font-extrabold text-3xl">₹326.00</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Success")}
        className="p-5 bg-red-600 rounded-2xl mt-3"
      >
        <Text className="text-white text-center font-bold text-xl">
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
