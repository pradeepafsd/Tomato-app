import { Text, View, TouchableOpacity, TextInput } from "react-native";
import FoodCard from "../components/FoodCard";
import { Ionicons, Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  
  return (
    <View className="flex-1 mt-5 p-10 bg-slate-50">
      <Text className="font-bold text-2xl text-red-600">Tomato</Text>
      <View className="w-100 flex-row gap-1 p-2 bg-white shadow-lg rounded-lg mt-10">
        <Feather name="search" size={22} color={"gray"} className="mt-2"/>
        <TextInput placeholder="Search" />
      </View>
      <View className="flex-row gap-3 mt-10">
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
      
       <FoodCard navigation={navigation} />

      <View className="w-100 p-10 h-15 flex-row absolute bottom-0 gap-10 bg-white shadow-4xl">
       <Ionicons name="home" size={35} className="ms-2"/>
       <Ionicons name="cart" size={35} className="me-16"/>
       <Ionicons name="list" size={35}/>
       <Ionicons name="person" size={35}/>
      </View>
      
    </View>
  );
};

export default HomeScreen;
