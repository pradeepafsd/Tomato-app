import { Text, View, Button } from 'react-native';

const CartScreen = ({ navigation })=>{
     const handleSuccessBtn = ()=>{
        navigation.navigate("Success");
    }
    return(
        <View className="ccontainer flex-1 justify-center align-middle p-10">
            <Text className="font-bold">Cart</Text>
            <Button title='go to Sucess'onPress={handleSuccessBtn}/>
        </View>
      
    )
}

export default CartScreen;