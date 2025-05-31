import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import { getUserById, updateUserInfo } from "@/database/database";
import { LinearGradient } from "expo-linear-gradient";

interface User {
  id: string;
  email: string;
  name?: string;
  gender?: "male" | "female";
  birthDate?: string;
}

export default function Profile() {
  const { userId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("1.75");

  useEffect(() => {
    if (userId) {
      getUserById(userId, (data) => {
        setUser(data);
      });
    }
  }, [userId]);

  const bmi = parseFloat(
    (parseFloat(weight) / Math.pow(parseFloat(height), 2)).toFixed(1)
  );

  const calculateAge = (birthDate?: string): number | null => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5)
      return { label: "Niedowaga", color: "#5DADE2", fat: "10–15%" };
    if (bmi < 25) return { label: "W normie", color: "#58D68D", fat: "15–20%" };
    if (bmi < 30) return { label: "Nadwaga", color: "#F5B041", fat: "20–25%" };
    return { label: "Otyłość", color: "#E74C3C", fat: "25–35%" };
  };

  const bmiCategory = getBMICategory(bmi);

  const avatar =
    user?.gender === "female"
      ? require("@/assets/images/avatar_female.png")
      : require("@/assets/images/avatar_male.png");

  const handleSave = () => {
    setModalVisible(false);
  };

  return (
    <LinearGradient colors={["#e0f7f4", "#ccf2e9"]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Image source={avatar} style={styles.avatar} />
          <Text style={styles.name}>{user?.name || "Imię nieznane"}</Text>
          <Text style={styles.subtitle}>
            Płeć: {user?.gender === "female" ? "Kobieta" : "Mężczyzna"}
          </Text>
          <Text style={styles.subtitle}>
            Wiek: {calculateAge(user?.birthDate) || "Brak danych"}
          </Text>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>
              Email: <Text style={styles.infoValue}>{user?.email}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Data urodzenia:{" "}
              <Text style={styles.infoValue}>{user?.birthDate || "Brak"}</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Wzrost: <Text style={styles.infoValue}>{height} m</Text>
            </Text>
            <Text style={styles.infoLabel}>
              Waga: <Text style={styles.infoValue}>{weight} kg</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.editText}>Edytuj parametry</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>BMI Tracker</Text>
            <View style={styles.bmiGaugeContainer}>
              <View style={styles.bmiGaugeBar}>
                <View
                  style={[
                    styles.bmiGaugeSegment,
                    { backgroundColor: "#5DADE2", flex: 18.5 },
                  ]}
                />
                <View
                  style={[
                    styles.bmiGaugeSegment,
                    { backgroundColor: "#58D68D", flex: 6.5 },
                  ]}
                />
                <View
                  style={[
                    styles.bmiGaugeSegment,
                    { backgroundColor: "#F5B041", flex: 5 },
                  ]}
                />
                <View
                  style={[
                    styles.bmiGaugeSegment,
                    { backgroundColor: "#E74C3C", flex: 10 },
                  ]}
                />
              </View>
              <View
                style={[
                  styles.bmiIndicator,
                  { left: `${Math.min((bmi / 40) * 100, 100)}%` },
                ]}
              >
                <Text style={styles.bmiArrow}>⬇</Text>
              </View>
              <Text style={styles.bmiValue}>{bmi}</Text>
              <Text
                style={[styles.bmiStatusLabel, { color: bmiCategory.color }]}
              >
                {bmiCategory.label}
              </Text>
              <Text style={styles.bmiLabel}>
                Szacowana zawartość tłuszczu: {bmiCategory.fat}
              </Text>
            </View>
          </View>
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Waga (kg):</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text>Wzrost (m):</Text>
              <TextInput
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
                style={styles.input}
              />
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveText}>Zapisz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { alignItems: "center", paddingBottom: 40 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 40,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#00aa88",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  card: {
    marginTop: 30,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    width: "100%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#00aa88",
  },
  bmiGaugeContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  bmiGaugeBar: {
    flexDirection: "row",
    height: 12,
    width: "100%",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 8,
  },
  bmiGaugeSegment: {
    height: "100%",
  },
  bmiIndicator: {
    position: "absolute",
    top: -8,
    transform: [{ translateX: -6 }],
  },
  bmiArrow: {
    fontSize: 20,
    color: "#333",
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#00cc99",
    marginTop: 4,
  },
  bmiStatusLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  bmiLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  infoSection: {
    marginTop: 20,
    width: "100%",
  },
  infoLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: "600",
    color: "#00aa88",
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00aa88",
    borderRadius: 8,
  },
  editText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#00aa88",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});
