import { useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PagerView from "react-native-pager-view";

const RegisterTemplate = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [onboarding, setOnboarding] = useState(false);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birthDate, setBirthDate] = useState("");
  const pagerRef = useRef<PagerView>(null);

  const handleRegister = () => {
    setOnboarding(true);
  };

  const goToNextPage = (page: number) => {
    if (pagerRef.current) {
      pagerRef.current.setPage(page);
    }
  };

  if (onboarding) {
    return (
      <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0}>
        {/* Imię */}
        <View key="1" style={styles.page}>
          <Text style={styles.title}>Wprowadź swoje imię</Text>
          <TextInput
            style={styles.input}
            placeholder="Imię"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNextPage(1)}
          >
            <Text style={styles.buttonText}>Dalej</Text>
          </TouchableOpacity>
        </View>

        {/* Płeć */}
        <View key="2" style={styles.page}>
          <Text style={styles.title}>Wybierz płeć</Text>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "male" && styles.selectedGender,
            ]}
            onPress={() => setGender("male")}
          >
            <Text>👨 Mężczyzna</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "female" && styles.selectedGender,
            ]}
            onPress={() => setGender("female")}
          >
            <Text>👩 Kobieta</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNextPage(2)}
          >
            <Text style={styles.buttonText}>Dalej</Text>
          </TouchableOpacity>
        </View>

        {/* Data urodzenia */}
        <View key="3" style={styles.page}>
          <Text style={styles.title}>Podaj datę urodzenia</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={birthDate}
            onChangeText={setBirthDate}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("yes")}
          >
            <Text style={styles.buttonText}>Zakończ</Text>
          </TouchableOpacity>
        </View>
      </PagerView>
    );
  }

  return (
    <LinearGradient colors={["#f2f2f2", "#ffffff"]} style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <Text style={styles.logo}>GymR🐀T</Text>
        <Text style={styles.subtitle}>Stwórz swoje konto</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Zarejestruj się</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
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
    alignItems: "center" as const,
    marginTop: 15,
  },
  buttonText: { color: "white", fontSize: 18 },
  page: {
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  title: { fontSize: 24, marginBottom: 20 },
  genderButton: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  selectedGender: {
    backgroundColor: "#D3D3D3",
  },
});

export default RegisterTemplate;
