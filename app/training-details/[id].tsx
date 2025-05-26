import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  getExercisesByTrainingId,
  TrainingExercise,
} from "@/database/database";

export default function TrainingDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercises, setExercises] = useState<TrainingExercise[]>([]);

  useEffect(() => {
    if (id) {
      getExercisesByTrainingId(Number(id), setExercises);
    }
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ćwiczenia</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>
              {item.weight}kg × {item.reps} powt. × {item.sets} serii
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text>Brak ćwiczeń w tym treningu</Text>}
      />
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
});
