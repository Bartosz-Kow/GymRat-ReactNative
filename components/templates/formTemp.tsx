import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { insertTrainingWithExercises } from "@/database/database";
import { useAuth } from "@/context/AuthContext";
import { useExerciseStore } from "@/store/useExcersiseStore";
import { MaterialIcons } from "@expo/vector-icons";

export default function FormTemp() {
  const [trainingName, setTrainingName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [type, setType] = useState("Siłowy");
  const [shared, setShared] = useState(true);
  const [publicTitle, setPublicTitle] = useState("");
  const [level, setLevel] = useState("Średniozaawansowany");

  const { userId } = useAuth();
  const exercises = useExerciseStore((state) => state.exercises);
  const clearExercises = useExerciseStore((state) => state.clearExercises);
  const removeExercise = useExerciseStore((state) => state.removeExercise);

  const resetForm = () => {
    setTrainingName("");
    setDate(new Date());
    setType("Siłowy");
    setShared(true);
    setPublicTitle("");
    setLevel("Średniozaawansowany");
  };

  const handleSave = () => {
    console.log("Zapis treningu dla userId:", userId);
    if (!userId) return;

    insertTrainingWithExercises(userId, {
      name: trainingName,
      date: date.toISOString(),
      type,
      shared,
      publicTitle,
      level,
      exercises,
    });

    clearExercises();
    resetForm();
    router.replace("/home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Nowy trening</Text>

      <Text style={styles.label}>Nazwa treningu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa Treningu"
        value={trainingName}
        onChangeText={setTrainingName}
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
        <Picker selectedValue={type} onValueChange={setType}>
          <Picker.Item label="Siłowy" value="Siłowy" />
          <Picker.Item label="Cardio" value="Cardio" />
        </Picker>
      </View>

      <Text style={styles.label}>Ćwiczenia</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/ExercisePickerScreen")}
      >
        <Text style={styles.addButtonText}>+ Dodaj Ćwiczenie</Text>
      </TouchableOpacity>

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

      <View style={styles.switchRow}>
        <Text style={styles.label}>
          Udostępnić ten trening innym użytkownikom?
        </Text>
        <Switch value={shared} onValueChange={setShared} />
      </View>

      <Text style={styles.label}>Tytuł treningu dla innych:</Text>
      <TextInput
        style={styles.input}
        placeholder="Publiczna nazwa treningu"
        value={publicTitle}
        onChangeText={setPublicTitle}
      />

      <Text style={styles.label}>Stopień zaawansowania</Text>
      <View style={styles.picker}>
        <Picker selectedValue={level} onValueChange={setLevel}>
          <Picker.Item label="Początkujący" value="Początkujący" />
          <Picker.Item
            label="Średniozaawansowany"
            value="Średniozaawansowany"
          />
          <Picker.Item label="Zaawansowany" value="Zaawansowany" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Zapisz Trening</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
});
