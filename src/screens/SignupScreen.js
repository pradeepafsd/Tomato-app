import { useEffect } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

const SignupScreen = ({ navigation })=>{
     useEffect(()=>{
            const timer = setTimeout(()=>{
            navigation.replace("Home");
        }, 5000)
           return ()=> clearTimeout(timer);
        }, [])

    return(
         <View className="flex-1 justify-center p-10 bg-white">
                    <View className="mb-20">
                      <Text className="font-bold text-6xl text-red-600 text-center">Tomato</Text>
                    <Text className="text-center text-xl text-gray-500 mt-2">Food you love, delivered fast</Text>
                    </View>
                    <View className="w-100 p-3 bg-white shadow-lg rounded-lg m-3">
                       <TextInput placeholder='Name'/>
                    </View>
                    <View className="w-100 p-3 bg-white shadow-lg rounded-lg m-3">
                       <TextInput placeholder='Email'/>
                    </View>
                    <View className="w-100 p-3 bg-white shadow-lg rounded-lg m-3">
                       <TextInput placeholder='Password'/>
                    </View>
                   
                    <TouchableOpacity className="w-70 p-5 rounded-2xl bg-red-600 m-3">
                        <Text className="text-white text-center text-xl">Sign up</Text>
                    </TouchableOpacity>
                    <View className=" m-3 flex-row justify-center">
                        <Text className="text-red-600 me-2 text-lg">Have an account?</Text>
                        <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                        <Text className="text-red-700 text-lg">Login</Text>
                         </TouchableOpacity>
                    </View>
                </View>
              
      
    )
}

export default SignupScreen;