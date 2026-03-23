import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import FoodCard from "../components/FoodCard";
import { Ionicons, Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const burgerData = [
    {
      id: "1",
      title: "Cheese Burst Burger",
      description:
        "Loaded with a juicy chicken patty and filled with extra melted cheese that oozes out with every bite. Combined with fresh veggies and creamy sauce, this burger is a dream for cheese lovers.",
      image: require("../../assets/images/mcdonalds.png"),
      rating: 4.4,
      price: 169,
    },
    {
      id: "2",
      title: "Spicy Zinger Burger",
      description:
        "A crispy fried chicken fillet coated in spicy seasoning, topped with crunchy lettuce and spicy mayo, served in a warm bun. This burger is perfect for spice lovers who enjoy a bold and fiery taste.",
      image: require("../../assets/images/burger.png"),
      rating: 4.6,
      price: 179,
    },
    {
      id: "3",
      title: "Chicken Burger",
      description:
        "A perfectly grilled chicken patty seasoned with spices, layered with fresh lettuce, juicy tomatoes, creamy mayonnaise, and melted cheese, all served inside a soft toasted bun.",
      image: require("../../assets/images/cheeseburger.png"),
      rating: 4.5,
      price: 149,
    },
    {
      id: "4",
      title: "Double Patty Burger",
      description:
        "A hearty burger stacked with two juicy chicken patties, double cheese, fresh lettuce, onions, and a rich signature sauce. Perfect for those with a big appetite and love for extra flavor.",
      image: require("../../assets/images/pngtree.png"),
      rating: 4.7,
      price: 219,
    },
  ];

  return (
    <View className="flex-1 mt-5 p-10 bg-slate-50">
      <Text className="font-bold text-3xl text-red-600">Tomato</Text>
      <View className="w-100 flex-row gap-1 p-2 bg-white shadow-lg rounded-lg mt-7">
        <Feather name="search" size={22} color={"gray"} className="mt-2" />
        <TextInput placeholder="Search" />
      </View>
      <View className="flex-row gap-3 mt-5">
        <TouchableOpacity className="w-70 p-4 rounded-xl bg-red-600 m-3">
          <Text className="text-white text-center text-lg">Burgers</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-70 p-4 rounded-xl bg-gray-200 m-3">
          <Text className="text-gray-600 text-center text-lg">Pizza</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-70 p-4 rounded-xl bg-gray-200 m-3">
          <Text className="text-gray-600 text-center text-lg">Drinks</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={burgerData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <FoodCard item={item} navigation={navigation} />
        )}
      />

      <View className="w-100 h-40 p-11 flex-row absolute bottom-0 gap-8 bg-red-600 shadow-4xl">
        <View className="flex-col">
          <Ionicons name="home" size={35} color={"white"} />
          <Text className="text-white">Home</Text>
        </View>
        <View className="flex-col">
          <Ionicons name="cart" size={35} color={"white"} />
          <Text className="text-white ms-2">Cart</Text>
        </View>
        <View className=" p-5 rounded-full bg-white relative bottom-7">
          <Ionicons name="add" size={30} color={"red"} />
        </View>
        <View className="flex-col">
          <Ionicons name="list" size={35} color={"white"} />
          <Text className="text-white">Orders</Text>
        </View>
        <View className="flex-col">
          <Ionicons name="person" size={35} color={"white"} />
          <Text className="text-white">Profile</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
