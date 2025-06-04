import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import {
  getTrainingsByUserId,
  deleteTrainingById,
  Training,
} from "@/database/database";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function AllTrainingsScreen() {
  const { userId } = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    if (userId) getTrainingsByUserId(userId, setTrainings);
  }, [userId]);

  const handleDelete = (id: number) => {
    Alert.alert("Usuń trening", "Czy na pewno chcesz usunąć ten trening?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        style: "destructive",
        onPress: () => {
          deleteTrainingById(id);
          if (userId) getTrainingsByUserId(userId, setTrainings);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Wszystkie Twoje treningi</Text>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.itemContent}
              onPress={() => router.push(`/training-details/${item.id}`)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>
                📅 {item.date.split("T")[0]} • {item.level} • {item.type}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <MaterialIcons name="delete" size={24} color="#cc0000" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Brak zapisanych treningów</Text>
        }
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#00aa88",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
  },
  itemContent: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  meta: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  empty: {
    marginTop: 20,
    textAlign: "center",
    color: "#999",
  },
});
