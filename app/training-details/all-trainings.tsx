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
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>📋 Twoje treningi</Text>
        <FlatList
          data={trainings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => router.push(`/training-details/${item.id}`)}
              >
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name="dumbbell" size={20} color="#00cc99" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>
                    📅 {item.date.split("T")[0]} • {item.level} • {item.type}
                  </Text>
                </View>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7fdfc",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30, // 👈 poprawka: bezpieczny margines pod status bar
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#00aa88",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    backgroundColor: "#e0faf4",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  meta: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});
