import { useEffect } from 'react';
import { Text, View, Image } from 'react-native';

const SplashScreen = ({ navigation })=>{
   
    useEffect(()=>{
        const timer = setTimeout(()=>{
        navigation.replace("Login");
    }, 2000)
       return ()=> clearTimeout(timer);
    }, [])
    

    return(
       
         <View className=" flex-1 p-10 bg-red-500">
            <View className="flex-1 justify-center" >
               <Text className="font-bold text-5xl text-white text-center">Tomato</Text>
            </View>
            <View className="flex-2">
               <Image source={require("../../assets/images/Floating-burger.png")} className="w-96 h-96"/>
            </View>
            
        </View>
       
      
    )
}

export default SplashScreen;