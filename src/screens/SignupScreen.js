import { Text, View, TouchableOpacity, TextInput } from "react-native";
import Validation from "../utils/Validation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = ({ navigation }) => {
  const { values, errors, handleChange, validate } = Validation({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = async () => {
    if (!validate("signup")) return;

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // Save name to Firebase profile
      await updateProfile(user, {
        displayName: values.name,
      });

      // Get token
      const token = await user.getIdToken();

      // Save token
      await AsyncStorage.setItem("token", token);

      console.log("Signup Success");

      // Navigate to Home
      navigation.replace("Home");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View className="flex-1 justify-center p-10 bg-white">
      <View className="mb-20">
        <Text className="font-bold text-6xl text-red-600 text-center">
          Tomato
        </Text>
        <Text className="text-center text-xl text-gray-500 mt-2">
          Food you love, delivered fast
        </Text>
      </View>
      <View
        className={`w-100 p-3 bg-white shadow-lg rounded-lg m-3 border ${
          errors.name
            ? "border-red-500"
            : values.name
              ? "border-green-500"
              : "border-gray-100"
        }`}
      >
        <TextInput
          placeholder="Name"
          value={values.name}
          onChangeText={(text) => handleChange("name", text)}
        />
      </View>
      {errors.name && (
        <Text className="text-red-500 mb-2 ms-3">{errors.name}</Text>
      )}
      <View
        className={`w-100 p-3 bg-white shadow-lg rounded-lg m-3 border ${
          errors.email
            ? "border-red-500"
            : values.email
              ? "border-green-500"
              : "border-gray-100"
        }`}
      >
        <TextInput
          placeholder="Email"
          value={values.email}
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>
      {errors.email && (
        <Text className="text-red-500 mb-2 ms-3">{errors.email}</Text>
      )}
      <View
        className={`w-100 p-3 bg-white shadow-lg rounded-lg m-3 border ${
          errors.password
            ? "border-red-500"
            : values.password
              ? "border-green-500"
              : "border-gray-100"
        }`}
      >
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={values.password}
          onChangeText={(text) => handleChange("password", text)}
        />
      </View>
      {errors.password && (
        <Text className="text-red-500 mb-2 ms-3">{errors.password}</Text>
      )}

      <TouchableOpacity className="w-70 p-5 rounded-2xl bg-red-600 m-3" onPress={handleSignup}>
        <Text className="text-white text-center text-xl">Sign up</Text>
      </TouchableOpacity>
      <View className=" m-3 flex-row justify-center">
        <Text className="text-red-600 me-2 text-lg">Have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-red-700 text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;
