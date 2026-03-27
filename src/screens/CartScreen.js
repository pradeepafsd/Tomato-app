import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";

// Cart screen showing cart items, address, payment method and place order functionality
const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    address,
    setAddress,
  } = useContext(CartContext); // Cart context for state management

  const [isEditing, setIsEditing] = useState(false); // toggle edit mode for address
  const [tempAddress, setTempAddress] = useState(address); // temporary address while editing

  // Calculate subtotal, delivery fee and total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const delivery = 2;
  const total = subtotal + delivery;

  // Save edited address
  const saveAddress = () => {
    setAddress(tempAddress);
    setIsEditing(false);
  };

  // Render each cart item
  const renderItem = ({ item }) => (
    <View className="bg-white p-5 rounded-2xl flex-row justify-between mt-4 shadow-md">
      <Image source={item.image} className="w-24 h-20" />

      <View className="flex-1 ml-4">
        <Text className="text-xl font-bold">{item.title}</Text>
        <Text className="text-black font-bold">₹{item.price}</Text>

        {/* Quantity controls */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => decreaseQty(item.id)}
            className="p-2 bg-red-500 rounded"
          >
            <Text className="text-white">-</Text>
          </TouchableOpacity>

          <Text className="mx-4 text-xl">{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => increaseQty(item.id)}
            className="p-2 bg-red-500 rounded"
          >
            <Text className="text-white">+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove item */}
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text className="text-red-500 font-bold">Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 mt-5 p-5 bg-slate-50">
      {/* Back button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={"gray"} />
      </TouchableOpacity>

      {/* Empty cart message */}
      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400 text-xl">Your cart is empty</Text>
        </View>
      ) : (
        <>
          {/* Cart items list */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingVertical: 10 }}
          />

          {/* Order Summary */}
          <View className="mt-6 bg-white p-5 rounded-2xl shadow-md">
            <View className="flex-row justify-between mb-2">
              <Text className="text-black text-xl">Subtotal</Text>
              <Text className="text-black text-xl">₹{subtotal.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-500">Delivery Fee</Text>
              <Text className="text-gray-500">₹{delivery.toFixed(2)}</Text>
            </View>

            <View className="flex-row justify-between mt-4">
              <Text className="text-black text-xl font-bold">Total</Text>
              <Text className="text-black text-xl font-bold">
                ₹{total.toFixed(2)}
              </Text>
            </View>
          </View>

          {/* Address Section */}
          <View className="bg-white p-5 shadow-md flex-row justify-between mt-4 rounded-2xl items-start">
            <Ionicons name="home" size={20} color="black" />
            <View className="flex-1 ml-3">
              <Text className="text-black text-xl font-bold">Address</Text>

              {/* Edit or display address */}
              {isEditing ? (
                <TextInput
                  value={tempAddress}
                  onChangeText={setTempAddress}
                  multiline
                  className="bg-gray-100 p-3 rounded mt-1 text-black"
                />
              ) : (
                <Text className="text-gray-500 mt-1">{address}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => (isEditing ? saveAddress() : setIsEditing(true))}
            >
              <Text className="text-red-500 font-bold mt-2">
                {isEditing ? "Save" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Payment Method Section */}
          <View className="bg-white p-5 shadow-md flex-row justify-between mt-4 rounded-2xl">
            <Ionicons name="card" size={20} color="black" />
            <View className="flex-1 ml-3">
              <Text className="text-black text-xl font-bold">
                Payment Method
              </Text>
              <View className="flex-row w-64 gap-5 bg-gray-300 rounded-md shadow-lg mt-2 p-2 items-center">
                <Image
                  source={require("../../assets/images/visa.png")}
                  className="w-16 h-14 relative bottom-4 "
                />
                <Text className="text-gray-500">**** 1234</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => alert("Payment change not available")}
            >
              <Text className="text-red-500 font-bold">Change</Text>
            </TouchableOpacity>
          </View>

          {/* Place Order Button */}
          <TouchableOpacity
            onPress={async () => {
              console.log("Button clicked 🔥");

              try {
                if (!auth.currentUser) {
                  alert("Please login first"); // Ensure user is logged in
                  return;
                }

                if (cartItems.length === 0) return;

                const orderItems = [...cartItems]; // Copy cart items for order

                const order = {
                  userId: auth.currentUser.uid,
                  items: orderItems, // use copied data
                  address: address || "No Address",
                  total: total.toFixed(2),
                  createdAt: serverTimestamp(),
                };

                await addDoc(collection(db, "orders"), order); // Save order to Firestore

                console.log("Order Saved ✅");

                clearCart(); // clear cart after saving

                navigation.navigate("Success", { cartItems: orderItems }); // Navigate to success screen with items
              } catch (error) {
                console.log("FULL ERROR ❌:", error);
              }
            }}
            disabled={cartItems.length === 0}
            className={`p-5 rounded-2xl mt-6 mb-4 ${
              cartItems.length ? "bg-red-600" : "bg-gray-400"
            }`}
          >
            <Text className="text-white text-center text-xl font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default CartScreen;