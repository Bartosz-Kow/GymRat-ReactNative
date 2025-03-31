import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
// STANIO TUTAJ ZBUDUJESZ NAM WELCOME SCREEN :)
// POKI CO ROB WSZYSTKO W JEDNYM PLIKU, POTEM ROZDZIELIMY TO NA KILKA

//PAMIETAJ ZE FUNCKJE JAKIES UZYWAMY PRZED RETURNEM, A NIE PO :D
// Zrob fajniejsze logo 🐀 i uzyj tego szczurka Tak GymR🐀T
const WelcomeTemplate = () => {
  const router = useRouter();
  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <View>
      <Text>Tu Bedzie nasz welcome screen</Text>
      <TouchableOpacity onPress={goToRegister}>
        <Text> IDZ DO REGISTER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WelcomeTemplate;
