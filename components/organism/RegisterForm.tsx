import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Props = {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSignIn: () => void;
};

const RegisterForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSignIn,
}: Props) => {
  const router = useRouter();
  const goToLogin = () => {
    router.push("/login");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello</Text>
      <Text style={styles.subHeader}>Sign Up</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={onEmailChange}
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={onPasswordChange}
        style={styles.input}
        placeholderTextColor="#999"
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={password}
        onChangeText={onPasswordChange}
        style={styles.input}
        placeholderTextColor="#999"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={onSignIn}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>You already have an account? </Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.signupText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  header: { fontSize: 32, fontWeight: "600", color: "#192126BF" },
  subHeader: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 32,
    color: "#192126BF",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 24,
    fontSize: 16,
  },
  forgotPassword: { alignItems: "flex-end", marginBottom: 24 },
  forgotText: { color: "#333" },
  button: {
    backgroundColor: "#00F480",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: "#999" },
  signupText: { color: "#192126BF", fontWeight: "bold" },
});

export default RegisterForm;
