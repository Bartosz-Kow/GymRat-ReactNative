import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

type Props = {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onLogin: () => void;
  onNavigateToRegister?: () => void;
  isLoading?: boolean;
};

const LoginForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
  onNavigateToRegister,
  isLoading = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.header}>Back!</Text>
      <Text style={styles.subHeader}>Sign In</Text>

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

      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabledButton]}
        onPress={onLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>SIGN IN</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={onNavigateToRegister}>
          <Text style={styles.signupText}>Sign Up</Text>
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
  button: {
    backgroundColor: "#00F480",
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center" },
  footerText: { color: "#999" },
  signupText: { color: "#192126BF", fontWeight: "bold" },
});

export default LoginForm;
