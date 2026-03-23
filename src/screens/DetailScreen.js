import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const DetailScreen = ({ navigation, route }) => {
    const item = route?.params?.item;
  return (
    <View className="flex-1 p-10 mt-4 bg-slate-50">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color={"gray"} />
      </TouchableOpacity>
      <Image source={item.image} className="w-[115%] h-96 -ml-5"/>
      
     <Text className="text-black text-3xl mt-5">{item.title}</Text>
     <View className="flex-row gap-3 mt-2">
        <Ionicons name="star" size={17} color={"orange"} />
        <Text className="text-orange-400">{item.rating}</Text>
     </View>
      
      <Text className="text-gray-500 text-lg mt-6">{item.description}</Text>
      <View className="flex-col mt-10">
        <View className="flex-row justify-between">
          <Text className="text-black text-4xl mt-2">₹{item.price}</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="p-3 bg-red-600 rounded-md">
              <Ionicons name="add" size={17} color={"white"} />
            </TouchableOpacity>
            <Text className="text-black font-bold mt-3">1</Text>
            <TouchableOpacity className="p-3 bg-red-600 rounded-md">
              <Ionicons name="remove" size={17} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate("Cart", {item})} className="p-5 bg-red-600 rounded-2xl mt-16">
             <Text className="text-white text-center font-bold text-xl">Add to Cart</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailScreen;
