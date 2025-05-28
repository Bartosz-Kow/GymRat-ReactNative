import { useExercisesQuery } from "@/hooks/useExcercisesMutation";
import { useRouter } from "expo-router";
import {
  Text,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ExercisePickerScreen() {
  const router = useRouter();
  const { data: exercises, isLoading, error } = useExercisesQuery();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00cc99" />
        <Text style={styles.loadingText}>Ładowanie ćwiczeń...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Błąd ładowania ćwiczeń 😓</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💪 Wybierz ćwiczenie</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.cardWrapper}
            onPress={() =>
              router.push({
                pathname: "/ExerciseDetailsScreen",
                params: { exercise: JSON.stringify(item) },
              })
            }
          >
            <LinearGradient
              colors={["#00cc99", "#00b38f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Ionicons
                name="barbell"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subtext}>Dotknij, aby dodać</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  list: {
    paddingBottom: 30,
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 16,
    overflow: "hidden",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  subtext: {
    fontSize: 14,
    color: "#e0f7f1",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorText: {
    fontSize: 16,
    color: "#cc0000",
  },
});
