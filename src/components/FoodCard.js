import { TouchableOpacity, Text, Image, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FoodCard = ({ navigation, item }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Detail", { item })}
      className="w-[48%] p-2 bg-white shadow-2xl mt-4 rounded-2xl"
    >
      <Image
        source={item.image}
        className="w-40 h-40"
      />
      <Text className="text-black text-center text-lg">{item.title}</Text>
      <View className="flex-row justify-between m-2">
        <View className="flex-row justify-start ">
          <Ionicons name="star" size={17} color={"orange"} />
          <Text className="text-orange-400 ms-2">{item.rating}</Text>
        </View>

        <Text>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
    
  );
};

export default FoodCard;
