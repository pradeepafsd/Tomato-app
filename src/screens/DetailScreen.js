import { useState, useContext } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CartContext } from "../context/CartContext";

// Detail screen for a single food item with quantity selection and add to cart
const DetailScreen = ({ navigation, route }) => {
  const { addToCart } = useContext(CartContext); // Cart context for adding items
  const [count, setCount] = useState(1); // Quantity state
  const item = route?.params?.item; // Item passed from HomeScreen

  return (
    <View className="flex-1 p-10 mt-4 bg-slate-50">
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={"gray"} />
      </TouchableOpacity>

      {/* Food image */}
      <Image source={item.image} className="w-[115%] h-96 -ml-5" />

      {/* Item title and rating */}
      <Text className="text-black text-3xl mt-5">{item.title}</Text>
      <View className="flex-row gap-3 mt-2">
        <Ionicons name="star" size={17} color={"orange"} />
        <Text className="text-orange-400">{item.rating}</Text>
      </View>

      {/* Item description */}
      <Text className="text-gray-500 text-lg mt-6">{item.description}</Text>

      {/* Price, quantity selector and Add to Cart */}
      <View className="flex-col mt-10">
        <View className="flex-row justify-between">
          {/* Price */}
          <Text className="text-black text-4xl mt-2">₹{item.price}</Text>

          {/* Quantity controls */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="p-3 bg-red-600 rounded-md"
              onPress={() => setCount(count + 1)} // Increment quantity
            >
              <Ionicons name="add" size={17} color={"white"} />
            </TouchableOpacity>

            <Text className="text-black font-bold mt-3">{count}</Text>

            <TouchableOpacity
              className="p-3 bg-red-600 rounded-md"
              onPress={() => {
                if (count > 1) setCount(count - 1); // Decrement quantity, min 1
              }}
            >
              <Ionicons name="remove" size={17} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart button */}
        <TouchableOpacity
          onPress={() => {
            addToCart(item, count); // Add item with selected quantity
            navigation.navigate("MainTabs", {
              screen: "Cart", // Navigate to Cart tab
            });
          }}
          className="p-5 bg-red-600 rounded-2xl mt-16"
        >
          <Text className="text-white text-center font-bold text-xl">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;