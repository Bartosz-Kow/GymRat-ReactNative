import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Platform,
  Image,
  Alert,
} from "react-native";
import LoginForm from "../organism/LoginForm";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/hooks/useLoginMutation";
import { getUserById, getExercisesByUserId } from "@/database/database";
import { useAuth } from "@/context/AuthContext";
const { setUserId } = useAuth();

const LoginTemplate = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending } = useLoginMutation();

  const { setUserId } = useAuth();

  const handleLogin = () => {
    login(
      { email, password },
      {
        onSuccess: (data) => {
          const userId = data.userId;

          console.log("Zalogowano jako:", userId);
          setUserId(userId); // ✅ ustaw userId od razu

          getUserById(userId, (user) => {
            if (!user) {
              Alert.alert("Brak lokalnego użytkownika");
              console.log(`Zapisywanie użytkownika ${userId} do bazy danych`);
              router.replace("/home");
              return;
            }

            getExercisesByUserId(userId, (exercises) => {
              if (exercises.length === 0) {
                Alert.alert("Witaj użytkowniku 👋");
              } else {
                console.log("Twoje ćwiczenia:", exercises);
              }

              router.replace("/home"); // ✅ nawiguj dopiero na końcu
            });
          });
        },
        onError: (error: any) => {
          console.error("Błąd logowania:", error);
          Alert.alert("Błąd logowania", error.message || "Coś poszło nie tak");
        },
      }
    );
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/images/register.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.formWrapper}>
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onLogin={handleLogin}
          onNavigateToRegister={goToRegister}
          isLoading={isPending}
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
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "80%",
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

export default LoginTemplate;
