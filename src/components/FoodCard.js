import { TouchableOpacity, Text, Image, View } from "react-native"

const FoodCard = ({ navigation })=>{
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("Detail")} className="w-44 p-5 bg-white shadow-2xl mt-10">
            <Image source={require("../../assets/images/cheeseburger.png")} className="w-40 h-40"/>
            <Text className="text-black">FoodCard</Text>
            <View className="flex-row justify-between">
               <Text>5 star</Text>
               <Text>$16.5</Text>
            </View>
            
        </TouchableOpacity>
    )
}

export default FoodCard;