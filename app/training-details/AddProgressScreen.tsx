import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getExercisesByTrainingId,
  insertExerciseProgress,
  TrainingExercise,
} from "@/database/database";
import { useAuth } from "@/context/AuthContext";

export default function AddProgressScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { userId } = useAuth();

  const [exercises, setExercises] = useState<TrainingExercise[]>([]);
  const [progressData, setProgressData] = useState<
    {
      exerciseName: string;
      weight: string;
      reps: string;
      sets: string;
    }[]
  >([]);

  useEffect(() => {
    if (id) {
      getExercisesByTrainingId(Number(id), (exList) => {
        setExercises(exList);
        setProgressData(
          exList.map((ex) => ({
            exerciseName: ex.name,
            weight: ex.weight,
            reps: ex.reps,
            sets: ex.sets,
          }))
        );
      });
    }
  }, [id]);

  type FieldKey = "exerciseName" | "weight" | "reps" | "sets";

  const updateField = (index: number, key: FieldKey, value: string) => {
    const updated = [...progressData];
    updated[index][key] = value;
    setProgressData(updated);
  };

  const saveProgress = () => {
    if (!userId || !id) return;
    insertExerciseProgress(userId, Number(id), progressData);
    alert("Progres zapisany!");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dodaj progres</Text>
      {progressData.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.exerciseName}>{item.exerciseName}</Text>

          <TextInput
            style={styles.input}
            placeholder="Ciężar (kg)"
            keyboardType="numeric"
            value={item.weight}
            onChangeText={(text) => updateField(index, "weight", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Powtórzenia"
            keyboardType="numeric"
            value={item.reps}
            onChangeText={(text) => updateField(index, "reps", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Serie"
            keyboardType="numeric"
            value={item.sets}
            onChangeText={(text) => updateField(index, "sets", text)}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={saveProgress}>
        <Text style={styles.buttonText}>Zapisz progres</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00cc99",
  },
  card: {
    backgroundColor: "#f7f7f7",
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007766",
    padding: 16,
    borderRadius: 12,
    marginTop: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
