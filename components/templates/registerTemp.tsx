import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Platform, Image } from "react-native";
import LoginForm from "../organism/LoginForm";
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
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/welcome.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.formWrapper}>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSignIn={() => setOnboarding(true)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#00F480",
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%", // lub np. 300 jeśli chcesz sztywną wysokość
  },
  formWrapper: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: Platform.OS === "android" ? 5 : 0,
  },
});

export default RegisterTemplate;
