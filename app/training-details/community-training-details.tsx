import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import {
  getTrainingById,
  getExercisesByTrainingId,
  insertTrainingWithExercises,
} from "@/database/database";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function CommunityTrainingDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userId } = useAuth();
  const [training, setTraining] = useState<any>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    getTrainingById(Number(id), (data) => {
      setTraining(data);
    });

    getExercisesByTrainingId(Number(id), (data) => {
      setExercises(data);
    });
  }, [id]);

  const handleSaveTraining = () => {
    if (!userId || !training) return;

    insertTrainingWithExercises(userId, {
      name: training.name,
      date: new Date().toISOString(),
      type: training.type,
      shared: false, // nowy trening użytkownika nie jest udostępniony
      publicTitle: training.publicTitle,
      level: training.level,
      exercises: exercises.map((ex) => ({
        name: ex.name,
        weight: ex.weight,
        reps: ex.reps,
        sets: ex.sets,
      })),
    });

    Alert.alert("Zapisano", "Trening został zapisany do Twoich treningów!");
  };

  if (!training) {
    return (
      <View style={styles.container}>
        <Text>Wczytywanie treningu...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{training.publicTitle || training.name}</Text>
      <Text style={styles.meta}>
        {training.level} • {training.type}
      </Text>
      <Text style={styles.date}>📅 {training.date.split("T")[0]}</Text>

      {exercises.map((ex, idx) => (
        <View key={idx} style={styles.exercise}>
          <Text style={styles.exerciseName}>{ex.name}</Text>
          <Text>
            Ciężar: {ex.weight} | Powtórzenia: {ex.reps} | Serie: {ex.sets}
          </Text>
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Zapisz trening" onPress={handleSaveTraining} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7fdfc",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00cc99",
    marginBottom: 5,
  },
  meta: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  date: {
    marginBottom: 15,
    color: "#333",
  },
  exercise: {
    backgroundColor: "#f0fefb",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d2f4eb",
  },
  exerciseName: {
    fontWeight: "600",
    color: "#00aa88",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
