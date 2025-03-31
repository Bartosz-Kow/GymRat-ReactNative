import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from "react-native";

const WelcomeTemplate = () => {
  const router = useRouter();
  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>GymR🐀T</Text>
      <Text style={styles.subtitle}>Gdziekolwiek Jesteś</Text>
      <Text style={styles.description}>Zdrowie Jest Numerem Jeden</Text>

      <TouchableOpacity onPress={goToRegister} style={styles.button}>
        <Text style={styles.buttonText}>Zaczynajmy</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "White", // Ciemne tło
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#444444", // Złoty kolor
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#444444",
    marginBottom: 5,
  },
  description: {
    fontSize: 24,
    color: "#444444",
    textAlign: "center",
    marginBottom: 30,
    
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 18,
    paddingHorizontal: 130,
    borderRadius: 30,
    alignItems: "center",
    position: "absolute",
    bottom: 100,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeTemplate;
