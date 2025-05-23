import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Image,
  Alert,
} from "react-native";
import RegisterForm from "../organism/RegisterForm";
import OnboardingPager from "../organism/OnboardingPager";
import { useRegisterMutation } from "@/hooks/useRegisterMutation";

const RegisterTemplate = () => {
  const [onboarding, setOnboarding] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [birthDate, setBirthDate] = useState("");

  const { mutate: register, isPending } = useRegisterMutation();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Uzupełnij wszystkie pola");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Hasła nie są takie same");
      return;
    }

    console.log("SIGN UP clicked");
    register(
      { email, password },
      {
        onSuccess: (response) => {
          console.log("Rejestracja OK – odpowiedź z serwera:", response);
          setOnboarding(true);
        },
        onError: (error: any) => {
          console.error("Błąd rejestracji:", error);
          Alert.alert(
            "Błąd rejestracji",
            error.message || "Coś poszło nie tak"
          );
        },
      }
    );
  };

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
        <RegisterForm
          email={email}
          password={password}
          RepeatedPassword={confirmPassword}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onRepeatedPasswordChange={setConfirmPassword}
          onSignIn={handleRegister}
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
    height: "50%",
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
