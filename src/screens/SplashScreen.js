import { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";


const SplashScreen = ({ navigation })=>{
   
    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setTimeout(() => {
      if (user) {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 2000); // 2 sec splash feel
  });

  return unsubscribe;
}, []);
    

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