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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { insertTrainingWithExercises } from "@/database/database";
import { useAuth } from "@/context/AuthContext";
import { useExerciseStore } from "@/store/useExcersiseStore";

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

  const resetForm = () => {
    setTrainingName("");
    setDate(new Date());
    setType("Siłowy");
    setShared(true);
    setPublicTitle("");
    setLevel("Średniozaawansowany");
  };

  const handleSave = () => {
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
        <View key={index} style={styles.exerciseItem}>
          <Text>
            {ex.name} – {ex.weight}kg × {ex.reps} powt. × {ex.sets} serii
          </Text>
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
        placeholder="Nazwa Treningu"
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 5,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#00cc99",
    alignItems: "center",
  },
  addButtonText: {
    color: "#00cc99",
    fontWeight: "bold",
  },
  exerciseItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  saveButton: {
    backgroundColor: "#00cc99",
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
