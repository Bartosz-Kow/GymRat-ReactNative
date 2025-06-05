import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getExercisesByTrainingId,
  insertExerciseProgress,
  TrainingExercise,
} from "@/database/database";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>💪 Dodaj progres</Text>

          {progressData.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <FontAwesome5 name="dumbbell" size={20} color="#00cc99" />
                <Text style={styles.exerciseName}>{item.exerciseName}</Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ciężar (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="np. 60"
                  keyboardType="numeric"
                  value={item.weight}
                  onChangeText={(text) => updateField(index, "weight", text)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Powtórzenia</Text>
                <TextInput
                  style={styles.input}
                  placeholder="np. 10"
                  keyboardType="numeric"
                  value={item.reps}
                  onChangeText={(text) => updateField(index, "reps", text)}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Serie</Text>
                <TextInput
                  style={styles.input}
                  placeholder="np. 4"
                  keyboardType="numeric"
                  value={item.sets}
                  onChangeText={(text) => updateField(index, "sets", text)}
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={saveProgress}>
            <Text style={styles.buttonText}>Zapisz progres</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7fdfc",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00cc99",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d2f4eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00aa88",
    marginLeft: 10,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: "#666",
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007766",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
