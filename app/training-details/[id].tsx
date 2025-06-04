import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getExercisesByTrainingId,
  TrainingExercise,
} from "@/database/database";

export default function TrainingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercises, setExercises] = useState<TrainingExercise[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getExercisesByTrainingId(Number(id), setExercises);
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Twoj trening</Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseDetail}>
              {item.weight}kg × {item.reps} powt. × {item.sets} serii
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Brak ćwiczeń w tym treningu</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            router.push(`/training-details/EditTrainingScreen?id=${id}`)
          }
        >
          <Text style={styles.buttonText}>Edytuj trening</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.progressButton}
          onPress={() =>
            router.push(`/training-details/AddProgressScreen?id=${id}`)
          }
        >
          <Text style={styles.buttonText}>Progresuj</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00cc99",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  exerciseDetail: {
    fontSize: 14,
    marginTop: 4,
    color: "#666",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#00cc99",
    paddingVertical: 14,
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
  },
  progressButton: {
    flex: 1,
    backgroundColor: "#007766",
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
