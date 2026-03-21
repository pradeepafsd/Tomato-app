import { Text, View, Button } from 'react-native';

const SuccessScreen = ({ navigation })=>{
    const handleHomeBtn = ()=>{
        navigation.navigate("Home");
    }
    return(
        <View className="container flex-1 justify-center align-middle p-10">
            <Text className="font-bold">Success</Text>
             <Button title='go to home'onPress={handleHomeBtn}/>
        </View>
      
    )
}

export default SuccessScreen;