import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useEffect } from "react";
import { initDatabase } from "@/database/database";
const WelcomeTemplate = () => {
  const router = useRouter();

  const goToRegister = () => {
    router.push("/register");
  };

  useEffect(() => {
    initDatabase();
  }, []);
  return (
    <ImageBackground
      source={require("../../assets/images/POCZATKOWY.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.bottomContent}>
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  safeArea: {
    flex: 1,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
  logo: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 6,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#00F480",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default WelcomeTemplate;
