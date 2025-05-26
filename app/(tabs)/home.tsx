import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  getTrainingsByUserId,
  deleteTrainingById,
  getUserById,
  Training,
} from "@/database/database";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const { userId } = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [userName, setUserName] = useState<string | null>(null);

  const loadTrainings = () => {
    if (!userId) return;
    getTrainingsByUserId(userId, setTrainings);
    getUserById(userId, (user) => {
      setUserName(user?.name ?? "Użytkowniku");
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadTrainings();
    }, [userId])
  );

  const handleDelete = (id: number) => {
    Alert.alert("Usuń trening", "Czy na pewno chcesz usunąć ten trening?", [
      { text: "Anuluj", style: "cancel" },
      {
        text: "Usuń",
        style: "destructive",
        onPress: () => {
          deleteTrainingById(id);
          loadTrainings();
        },
      },
    ]);
  };

  if (!userId) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>Brak zalogowanego użytkownika</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Cześć 🔥</Text>
      <Text style={styles.userName}>{userName}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/form")}
      >
        <Text style={styles.addButtonText}>Dodaj Trening</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Twoje treningi</Text>

      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => router.push(`../training-details/${item.id}`)}
            >
              <Text style={styles.trainingName}>{item.name}</Text>
              <Text style={styles.trainingDate}>
                📅 {item.date.split("T")[0]}
              </Text>
              <Text style={styles.trainingMeta}>
                {item.level} • {item.type}
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
    backgroundColor: "#f7fdfc",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  greeting: {
    fontSize: 16,
    color: "#333",
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00cc99",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#222",
  },
  addButton: {
    backgroundColor: "#00cc99",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#f0fefb",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#d2f4eb",
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  trainingName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#00aa88",
  },
  trainingDate: {
    color: "#555",
    marginTop: 4,
  },
  trainingMeta: {
    color: "#777",
    fontSize: 14,
    marginTop: 2,
  },
  empty: {
    marginTop: 20,
    textAlign: "center",
    color: "#999",
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
  },
});
