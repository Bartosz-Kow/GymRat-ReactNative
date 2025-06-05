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
import { getUserById } from "@/database/database";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

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
      getUserById(userId, (data) => setUser(data));
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

  const handleSave = () => setModalVisible(false);

  return (
    <LinearGradient colors={["#e0f7f4", "#ccf2e9"]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileCard}>
            <Image source={avatar} style={styles.avatar} />
            <Text style={styles.name}>{user?.name || "Imię nieznane"}</Text>
            <Text style={styles.info}>
              {user?.gender === "female" ? "Kobieta" : "Mężczyzna"} •{" "}
              {calculateAge(user?.birthDate) || "Brak danych"} lat
            </Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statRow}>
              <Text style={styles.label}>Wzrost:</Text>
              <Text style={styles.value}>{height} m</Text>
            </View>
            <View style={styles.statRow}>
              <Text style={styles.label}>Waga:</Text>
              <Text style={styles.value}>{weight} kg</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setModalVisible(true)}
            >
              <MaterialIcons name="edit" size={18} color="#fff" />
              <Text style={styles.editText}>Edytuj parametry</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bmiCard}>
            <Text style={styles.bmiTitle}>Twój BMI</Text>
            <Text style={styles.bmiValue}>{bmi}</Text>
            <Text style={[styles.bmiCategory, { color: bmiCategory.color }]}>
              {bmiCategory.label}
            </Text>
            <Text style={styles.bmiDescription}>
              Szacowana zawartość tłuszczu: {bmiCategory.fat}
            </Text>
            <View style={styles.bmiBar}>
              <View style={{ flex: 18.5, backgroundColor: "#5DADE2" }} />
              <View style={{ flex: 6.5, backgroundColor: "#58D68D" }} />
              <View style={{ flex: 5, backgroundColor: "#F5B041" }} />
              <View style={{ flex: 10, backgroundColor: "#E74C3C" }} />
            </View>
            <View
              style={[
                styles.bmiIndicator,
                { left: `${Math.min((bmi / 40) * 100, 100)}%` },
              ]}
            >
              <Text style={styles.bmiArrow}>⬇</Text>
            </View>
          </View>
        </ScrollView>

        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Zmień parametry</Text>
              <Text style={styles.modalLabel}>Waga (kg)</Text>
              <TextInput
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                style={styles.input}
              />
              <Text style={styles.modalLabel}>Wzrost (m)</Text>
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
  scrollContent: { paddingBottom: 40 },
  profileCard: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#00cc99",
    backgroundColor: "black",
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00aa88",
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#444",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00aa88",
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#00aa88",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },
  bmiCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    alignItems: "center",
  },
  bmiTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#00aa88",
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#00cc99",
  },
  bmiCategory: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
  },
  bmiDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 12,
  },
  bmiBar: {
    flexDirection: "row",
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    width: "100%",
    marginTop: 10,
  },
  bmiIndicator: {
    position: "absolute",
    top: 165, // połowa wysokości bmiBar (12) – by ją opuścić do środka
    transform: [{ translateX: -6 }, { translateY: -10 }], // dodatkowe wyśrodkowanie
  },
  bmiArrow: {
    fontSize: 20,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "85%",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#00aa88",
  },
  modalLabel: {
    marginBottom: 4,
    color: "#444",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#00aa88",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontWeight: "bold",
  },
});
