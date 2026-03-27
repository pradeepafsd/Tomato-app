import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { useState } from "react";
import FoodCard from "../components/FoodCard";
import { Feather } from "@expo/vector-icons";

// Home screen displaying food items with search and category filters
const HomeScreen = ({ navigation }) => {
  const burgerData = [
    // Sample food items data with id, title, category, description, image, rating, price
    {
      id: "1",
      title: "Cheese Burst Burger",
      category: "Burgers",
      description:
        "Loaded with a juicy chicken patty and filled with extra melted cheese that oozes out with every bite. Combined with fresh veggies and creamy sauce, this burger is a dream for cheese lovers.",
      image: require("../../assets/images/mcdonalds.png"),
      rating: 4.4,
      price: 169,
    },
    {
      id: "2",
      title: "Coca Cola",
      category: "Drinks",
      description:
        "The classic fizzy cola drink loved worldwide, served ice-cold for maximum refreshment. Known for its rich taste and perfect balance of sweetness and fizz, it pairs well with any fast food.",
      image: require("../../assets/images/cocacola.png"),
      rating: 4.3,
      price: 50,
    },

    {
      id: "3",
      title: "Spicy Zinger Burger",
      category: "Burgers",
      description:
        "A crispy fried chicken fillet coated in spicy seasoning, topped with crunchy lettuce and spicy mayo, served in a warm bun. This burger is perfect for spice lovers who enjoy a bold and fiery taste.",
      image: require("../../assets/images/burger.png"),
      rating: 4.6,
      price: 179,
    },
    {
      id: "4",
      title: "Pepperoni Pizza",
      category: "Pizza",
      description:
        "Loaded with spicy pepperoni slices, melted cheese, and tangy tomato sauce on a perfectly baked crust. A must-have for meat lovers.",
      image: require("../../assets/images/pizza2.png"),
      rating: 4.6,
      price: 249,
    },
    {
      id: "5",
      title: "Chicken Burger",
      category: "Burgers",
      description:
        "A perfectly grilled chicken patty seasoned with spices, layered with fresh lettuce, juicy tomatoes, creamy mayonnaise, and melted cheese, all served inside a soft toasted bun.",
      image: require("../../assets/images/cheeseburger.png"),
      rating: 4.5,
      price: 149,
    },
    {
      id: "6",
      title: "Double Patty Burger",
      category: "Burgers",
      description:
        "A hearty burger stacked with two juicy chicken patties, double cheese, fresh lettuce, onions, and a rich signature sauce. Perfect for those with a big appetite and love for extra flavor.",
      image: require("../../assets/images/pngtree.png"),
      rating: 4.7,
      price: 219,
    },
    {
      id: "7",
      title: "Margherita Pizza",
      category: "Pizza",
      description:
        "A classic delight with a crispy base topped with rich tomato sauce, fresh mozzarella cheese, and a sprinkle of herbs. Simple yet incredibly delicious.",
      image: require("../../assets/images/pizza1.png"),
      rating: 4.3,
      price: 199,
    },
    
    {
      id: "8",
      title: "Pepsi",
      category: "Drinks",
      description:
        "A refreshing chilled soft drink with a bold cola flavor that perfectly complements your meal. A timeless favorite that never goes out of style.",
      image: require("../../assets/images/pepsi.png"),
      rating: 4.2,
      price: 60,
    },
    
  ];

  const [search, setSearch] = useState(""); // Search input state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Selected category state
  const categories = ["All", "Burgers", "Pizza", "Drinks"]; // Categories for filter

  // Filter food items based on search text and selected category
  const filteredData = burgerData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <View className="flex-1 mt-5 p-10 bg-slate-50">
      {/* App title */}
      <Text className="font-bold text-3xl text-red-600">Tomato</Text>

      {/* Search bar */}
      <View className="w-full flex-row gap-1 p-2 bg-white shadow-lg rounded-lg mt-7">
        <Feather name="search" size={22} color={"gray"} className="mt-2" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#6B7280"
          value={search}
          onChangeText={(text) => setSearch(text)}
          className="w-full text-black"
        />
      </View>

      {/* Category filter buttons */}
      <View className="flex-row gap-1 mt-5">
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setSelectedCategory(item)}
            className={`w-70 p-4 rounded-xl m-2 ${
              selectedCategory === item ? "bg-red-600" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-center text-lg ${
                selectedCategory === item ? "text-white" : "text-gray-600"
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display filtered food items in grid */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <FoodCard item={item} navigation={navigation} /> // Food card component
        )}
      />
    </View>
  );
};

export default HomeScreen;