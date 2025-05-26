import { useExercisesQuery } from "@/hooks/useExcercisesMutation";
import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity } from "react-native";

export default function ExercisePickerScreen() {
  const router = useRouter();
  const { data: exercises, isLoading, error } = useExercisesQuery();

  if (isLoading) return <Text>Ładowanie ćwiczeń...</Text>;
  if (error) return <Text>Błąd ładowania ćwiczeń</Text>;

  return (
    <FlatList
      data={exercises}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            router.push({
              pathname: "/ExerciseDetailsScreen",
              params: { exercise: JSON.stringify(item) },
            })
          }
        >
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 16,
  },
});
