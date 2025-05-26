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
  Training,
} from "@/database/database";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Home() {
  const { userId } = useAuth();
  const [trainings, setTrainings] = useState<Training[]>([]);

  const loadTrainings = () => {
    if (!userId) return;
    getTrainingsByUserId(userId, setTrainings);
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
        <Text>Brak zalogowanego użytkownika</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Twoje treningi</Text>
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.itemText}
              onPress={() => router.push(`../training-details/${item.id}`)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.date.split("T")[0]}</Text>
              <Text>
                {item.level} • {item.type}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>Brak zapisanych treningów</Text>}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
});
