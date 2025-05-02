import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RegisterForm from "../organism/RegisterForm";
import OnboardingPager from "../organism/OnboardingPager";

const RegisterTemplate = () => {
  const [onboarding, setOnboarding] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birthDate, setBirthDate] = useState("");

  return onboarding ? (
    <OnboardingPager
      name={name}
      setName={setName}
      gender={gender}
      setGender={setGender}
      birthDate={birthDate}
      setBirthDate={setBirthDate}
    />
  ) : (
    <LinearGradient
      colors={["#FAF3E0", "#E0F7FA"]}
      style={styles.container}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.formWrapper}>
          <RegisterForm
            email={email}
            password={password}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onRegister={() => setOnboarding(true)}
          />
        </View>
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
    padding: 24,
  },
  formWrapper: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: Platform.OS === "android" ? 5 : 0,
  },
});

export default RegisterTemplate;
