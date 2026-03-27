import { useEffect, useState } from "react";
import { Text, View, FlatList, Image} from "react-native";
import { auth, db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

// Screen to display list of user orders
const OrdersScreen = () => {
  const [orders, setOrders] = useState([]); // Store fetched orders
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", auth.currentUser.uid), // Filter by current user
          orderBy("createdAt", "desc") // Newest orders first
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData); // Update orders state
      } catch (error) {
        console.log("Error fetching orders:", error.message); // Log any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders(); // Fetch orders on mount
  }, []);

  // Render individual order card
  const renderOrder = ({ item }) => (
    <View className="bg-white p-4 rounded-2xl shadow-md m-10">
      <Text className="text-xl font-bold mb-2">Order ID: {item.id}</Text>
      <Text className="text-gray-500 mb-2">
        Address: {item.address || "N/A"} {/* Display order address */}
      </Text>
      <Text className="text-black font-bold mb-2">Total: ₹{item.total}</Text>

      <Text className="text-gray-600 mb-2">Items:</Text>
      {item.items.map((cartItem) => (
        <View key={cartItem.id} className="flex-row items-center mb-1">
          <Image
            source={cartItem.image} // Item image
            className="w-12 h-12 rounded-lg mr-2"
          />
          <View>
            <Text className="text-black">{cartItem.title}</Text>
            <Text className="text-gray-500">
              {cartItem.quantity} x ₹{cartItem.price} {/* Quantity and price */}
            </Text>
          </View>
        </View>
      ))}

      {item.createdAt?.seconds && (
        <Text className="text-gray-400 mt-2 text-sm">
          Ordered on: {new Date(item.createdAt.seconds * 1000).toLocaleString()} {/* Order date */}
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-xl">Loading Orders...</Text> {/* Loading indicator */}
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-400 text-xl">No orders found</Text> {/* No orders message */}
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 10 }}
      renderItem={renderOrder} // Render each order
    />
  );
};

export default OrdersScreen;