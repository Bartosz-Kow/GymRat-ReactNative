import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getTrainingById,
  getExercisesByTrainingId,
  insertTrainingWithExercises,
} from "@/database/database";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

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
      shared: false,
      publicTitle: training.publicTitle,
      level: training.level,
      exercises: exercises.map((ex) => ({
        name: ex.name,
        weight: ex.weight,
        reps: ex.reps,
        sets: ex.sets,
      })),
    });

    Alert.alert("✅ Zapisano", "Trening został dodany do Twoich treningów.");
  };

  if (!training) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Wczytywanie treningu...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.header}>
        <FontAwesome5 name="users" size={20} color="#00cc99" />
        <Text style={styles.title}>
          {training.publicTitle || training.name}
        </Text>
      </View>
      <Text style={styles.meta}>
        {training.level} • {training.type}
      </Text>
      <Text style={styles.date}>📅 {training.date.split("T")[0]}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ćwiczenia</Text>
        {exercises.map((ex, idx) => (
          <View key={idx} style={styles.exerciseCard}>
            <View style={styles.exerciseRow}>
              <MaterialCommunityIcons
                name="weight-lifter"
                size={20}
                color="#00aa88"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.exerciseName}>{ex.name}</Text>
            </View>
            <Text style={styles.exerciseStats}>
              💪 {ex.weight} kg | 🔁 {ex.reps} powt. | 📦 {ex.sets} serie
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveTraining}>
        <Text style={styles.saveButtonText}>Zapisz trening do swoich</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fdfc",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7fdfc",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00cc99",
    marginLeft: 10,
    flexShrink: 1,
  },
  meta: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#222",
  },
  exerciseCard: {
    backgroundColor: "#f0fefb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#d2f4eb",
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#00aa88",
  },
  exerciseStats: {
    fontSize: 14,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#00cc99",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
