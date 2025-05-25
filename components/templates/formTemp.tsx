import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function FormTemp() {
  const [trainingName, setTrainingName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [type, setType] = useState("Siłowy");
  const [shared, setShared] = useState(true);
  const [publicTitle, setPublicTitle] = useState("");
  const [level, setLevel] = useState("Średniozaawansowany");

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
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Dodaj Ćwiczenie</Text>
      </TouchableOpacity>

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

      <TouchableOpacity style={styles.saveButton}>
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
