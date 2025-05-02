import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeTemplate = () => {
  const router = useRouter();

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <LinearGradient colors={["#d1f4f9", "#fef6e4"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.logo}>GymR🐀T</Text>
        <Text style={styles.subtitle}>Gdziekolwiek Jesteś</Text>
        <Text style={styles.description}>Zdrowie Jest Numerem Jeden</Text>

        <TouchableOpacity
          onPress={goToRegister}
          style={styles.button}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>Zaczynajmy</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logo: {
    fontSize: 48,
    fontWeight: "800",
    color: "#222",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    color: "#333",
    marginBottom: 6,
  },
  description: {
    fontSize: 18,
    color: "#444",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    position: "absolute",
    bottom: 80,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default WelcomeTemplate;
