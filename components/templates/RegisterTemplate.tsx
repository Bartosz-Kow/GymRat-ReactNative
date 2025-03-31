import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const RegisterTemplate = () => {
  const router = useRouter();
  const goToLogin = () => {
    router.push("/login");
  };
  return (
    <View>
      <TouchableOpacity onPress={goToLogin}>
        <Text>Idz do logowania</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RegisterTemplate;
