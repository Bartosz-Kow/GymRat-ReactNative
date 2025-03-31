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
    marginBottom: 20,
    marginTop: 280,
  },
  subtitle: {
    fontSize: 23,
    color: "#444444",
    marginBottom: 10,
    fontWeight: "700",
  },
  description: {
    fontSize: 23,
    color: "#444444",
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "700"
    
  },
  button: {
    backgroundColor: "#77DD77",
    paddingVertical: 25,
    paddingHorizontal: 125,
    borderRadius: 35,
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
