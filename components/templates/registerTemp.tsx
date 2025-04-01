import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const RegisterTemplate = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <LinearGradient colors={["#f2f2f2", "#ffffff"]} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.logo}>GymR🐀T</Text>
        <Text style={styles.subtitle}>Stwórz swoje konto</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Hasło"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Zarejestruj się</Text>
        </Pressable>

        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.link}>Masz już konto? Zaloguj się</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#444444",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#444444",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  input: {
    width: "100%",
    padding: 12,
    fontSize: 16,
    color: "#444444",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 15,
    shadowColor: "green",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#444444",
    fontSize: 16,
    marginTop: 20,
    textDecorationLine: "underline",
  },
});

export default RegisterTemplate;
