import { Text, View, Button } from 'react-native';

const DetailScreen = ({ navigation })=>{
    const handleCartBtn = ()=>{
        navigation.navigate("Cart");
    }
    return(
        <View className="container flex-1 justify-center align-middle p-10">
            <Text className="font-bold">Detail</Text>
             <Button title='go to cart'onPress={handleCartBtn}/>
        </View>
      
    )
}

export default DetailScreen;