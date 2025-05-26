import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useExerciseStore } from "@/store/useExcersiseStore";

export default function ExerciseDetailsScreen() {
  const router = useRouter();
  const { exercise } = useLocalSearchParams();
  const addExercise = useExerciseStore((state) => state.addExercise);

  if (typeof exercise !== "string") {
    throw new Error("Brak danych ćwiczenia lub nieprawidłowy format");
  }

  const parsedExercise = JSON.parse(exercise);

  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");

  const handleSave = () => {
    if (!weight || !reps || !sets) return;

    addExercise({
      name: parsedExercise.name,
      weight,
      reps,
      sets,
    });

    router.back(); // wraca do formularza
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{parsedExercise.name}</Text>

      <Text>Ciężar (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text>Liczba powtórzeń:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />

      <Text>Liczba serii:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={sets}
        onChangeText={setSets}
      />

      <Button title="Zapisz ćwiczenie" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
