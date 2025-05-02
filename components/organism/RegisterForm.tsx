import React from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  email: string;
  password: string;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onRegister: () => void;
};

const RegisterForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onRegister,
}: Props) => (
  <>
    <Text style={styles.logo}>GymR🐀T</Text>
    <Text style={styles.subtitle}>Stwórz swoje konto</Text>

    <TextInput
      style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={onEmailChange}
    />
    <TextInput
      style={styles.input}
      placeholder="Hasło"
      value={password}
      onChangeText={onPasswordChange}
      secureTextEntry
    />

    <TouchableOpacity style={styles.button} onPress={onRegister}>
      <Text style={styles.buttonText}>Zarejestruj się</Text>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  logo: { fontSize: 42, fontWeight: "bold" },
  subtitle: { fontSize: 24, marginBottom: 20 },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "white", fontSize: 18 },
});

export default RegisterForm;
