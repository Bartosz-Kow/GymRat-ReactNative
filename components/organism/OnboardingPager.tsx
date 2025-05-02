import React, { useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
    <PagerView ref={pagerRef} style={{ flex: 1 }} initialPage={0}>
      <View key="1" style={styles.page}>
        <Text style={styles.title}>Wprowadź swoje imię</Text>
        <TextInput
          style={styles.input}
          placeholder="Imię"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.button} onPress={() => goToNextPage(1)}>
          <Text style={styles.buttonText}>Dalej</Text>
        </TouchableOpacity>
      </View>

      <View key="2" style={styles.page}>
        <Text style={styles.title}>Wybierz płeć</Text>
        {["male", "female"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.genderButton,
              gender === option && styles.selectedGender,
            ]}
            onPress={() => setGender(option as "male" | "female")}
          >
            <Text style={styles.genderText}>
              {option === "male" ? "👨" : "👩"}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => goToNextPage(2)}>
          <Text style={styles.buttonText}>Dalej</Text>
        </TouchableOpacity>
      </View>

      <View key="3" style={styles.page}>
        <Text style={styles.title}>Podaj datę urodzenia</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("done")}
        >
          <Text style={styles.buttonText}>Zakończ</Text>
        </TouchableOpacity>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "green",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: { color: "white", fontSize: 18 },
  genderButton: {
    padding: 40,
    margin: 10,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00f480",
  },
  selectedGender: {
    backgroundColor: "#D3D3D3",
  },
  genderText: {
    fontSize: 50,
  },
});

export default OnboardingPager;
