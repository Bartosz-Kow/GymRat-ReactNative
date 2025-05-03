import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import PagerView from "react-native-pager-view";

type Props = {
  name: string;
  setName: (val: string) => void;
  gender: "male" | "female" | null;
  setGender: (val: "male" | "female") => void;
  birthDate: string;
  setBirthDate: (val: string) => void;
};

const OnboardingPager = ({
  name,
  setName,
  gender,
  setGender,
  birthDate,
  setBirthDate,
}: Props) => {
  const pagerRef = useRef<PagerView>(null);

  const goToNextPage = (page: number) => {
    pagerRef.current?.setPage(page);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <PagerView ref={pagerRef} style={styles.pager} initialPage={0}>
        <View key="1" style={styles.page}>
          <Text style={styles.title}>Jak masz na imię?</Text>
          <TextInput
            style={styles.input}
            placeholder="Imię"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNextPage(1)}
          >
            <Text style={styles.buttonText}>Dalej</Text>
          </TouchableOpacity>
        </View>

        <View key="2" style={styles.page}>
          <Text style={styles.title}>Wybierz swoją płeć</Text>
          <View style={styles.genderContainer}>
            {["male", "female"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderButton,
                  gender === option && styles.selectedGender,
                ]}
                onPress={() => setGender(option as "male" | "female")}
              >
                <Text style={styles.genderEmoji}>
                  {option === "male" ? "👨" : "👩"}
                </Text>
                <Text style={styles.genderLabel}>
                  {option === "male" ? "Mężczyzna" : "Kobieta"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => goToNextPage(2)}
          >
            <Text style={styles.buttonText}>Dalej</Text>
          </TouchableOpacity>
        </View>

        <View key="3" style={styles.page}>
          <Text style={styles.title}>Podaj swoją datę urodzenia</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={birthDate}
            onChangeText={setBirthDate}
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("Done")}
          >
            <Text style={styles.buttonText}>Zakończ</Text>
          </TouchableOpacity>
        </View>
      </PagerView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#192126BF",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    width: "100%",
    maxWidth: 420,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#00F480",
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: "center",
    marginTop: 24,
    elevation: Platform.OS === "android" ? 2 : 0,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    maxWidth: 420,
    marginBottom: 32,
  },
  genderButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F0",
    padding: 20,
    borderRadius: 20,
    width: 140,
    height: 140,
  },
  selectedGender: {
    backgroundColor: "#00F480",
  },
  genderEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  genderLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#192126BF",
  },
});

export default OnboardingPager;
