import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  getExercisesByTrainingId,
  getTrainingById,
  updateTrainingWithExercises,
  Training,
} from "@/database/database";
import { useExerciseStore } from "@/store/useExcersiseStore";
import { MaterialIcons } from "@expo/vector-icons";

export default function EditTrainingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [training, setTraining] = useState<Partial<Training>>({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const exercises = useExerciseStore((state) => state.exercises);
  const setExercises = useExerciseStore((state) => state.setExercises);
  const removeExercise = useExerciseStore((state) => state.removeExercise);
  const clearExercises = useExerciseStore((state) => state.clearExercises);

  useEffect(() => {
    if (!id) return;

    getTrainingById(Number(id), (tr) => {
      if (tr) {
        setTraining(tr);
        setDate(new Date(tr.date));
      }
    });

    getExercisesByTrainingId(Number(id), setExercises);

    // ✅ Czyść ćwiczenia przy wychodzeniu z ekranu
    return () => {
      clearExercises();
    };
  }, [id]);

  const handleSave = () => {
    if (!id) return;

    updateTrainingWithExercises(Number(id), {
      name: training.name!,
      date: date.toISOString(),
      type: training.type!,
      shared: training.shared ?? false,
      publicTitle: training.publicTitle || "",
      level: training.level!,
      exercises,
    });

    clearExercises(); // ✅ Czyść po zapisaniu
    router.replace("/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edytuj trening</Text>

      <Text style={styles.label}>Nazwa treningu</Text>
      <TextInput
        style={styles.input}
        value={training.name}
        onChangeText={(text) => setTraining((t) => ({ ...t, name: text }))}
      />

      <Text style={styles.label}>Data</Text>
      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.input}
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(Platform.OS === "ios");
            setDate(currentDate);
          }}
        />
      )}

      <Text style={styles.label}>Typ</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={training.type ?? "Siłowy"}
          onValueChange={(value) => setTraining((t) => ({ ...t, type: value }))}
        >
          <Picker.Item label="Siłowy" value="Siłowy" />
          <Picker.Item label="Cardio" value="Cardio" />
        </Picker>
      </View>

      <Text style={styles.label}>Ćwiczenia</Text>
      {exercises.map((ex, index) => (
        <View key={index} style={styles.exerciseCard}>
          <View style={styles.exerciseInfo}>
            <Text style={styles.exerciseName}>{ex.name}</Text>
            <Text style={styles.exerciseDetail}>
              {ex.weight}kg × {ex.reps} powt. × {ex.sets} serii
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeExercise(index)}>
            <MaterialIcons name="delete" size={24} color="#cc0000" />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/ExercisePickerScreen")}
      >
        <Text style={styles.addButtonText}>+ Dodaj Ćwiczenie</Text>
      </TouchableOpacity>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Udostępnić innym?</Text>
        <Switch
          value={training.shared}
          onValueChange={(val) => setTraining((t) => ({ ...t, shared: val }))}
        />
      </View>

      <Text style={styles.label}>Publiczny tytuł</Text>
      <TextInput
        style={styles.input}
        value={training.publicTitle}
        onChangeText={(text) =>
          setTraining((t) => ({ ...t, publicTitle: text }))
        }
      />

      <Text style={styles.label}>Stopień zaawansowania</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={training.level}
          onValueChange={(value) =>
            setTraining((t) => ({ ...t, level: value }))
          }
        >
          <Picker.Item label="Początkujący" value="Początkujący" />
          <Picker.Item
            label="Średniozaawansowany"
            value="Średniozaawansowany"
          />
          <Picker.Item label="Zaawansowany" value="Zaawansowany" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00cc99",
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginTop: 5,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 5,
    overflow: "hidden",
  },
  exerciseCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0fefb",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d2f4eb",
    marginTop: 10,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00aa88",
  },
  exerciseDetail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#00cc99",
    marginTop: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00cc99",
    alignItems: "center",
  },
  addButtonText: {
    color: "#00cc99",
    fontWeight: "bold",
    fontSize: 16,
  },
});
