import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import {
  getTrainingsByUserId,
  getProgressByTrainingId,
  Training,
  ExerciseProgress,
} from "@/database/database";
import { useFocusEffect } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome5 } from "@expo/vector-icons";

export default function StatsScreen() {
  const { userId } = useAuth();
  const [stats, setStats] = useState<
    {
      training: Training;
      progress: Record<string, ExerciseProgress[]>;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!userId) return;

      setLoading(true);

      getTrainingsByUserId(userId, async (trainings) => {
        const results = await Promise.all(
          trainings.map(
            (training) =>
              new Promise<{
                training: Training;
                progress: Record<string, ExerciseProgress[]>;
              }>((resolve) => {
                getProgressByTrainingId(training.id, (progressList) => {
                  const grouped = progressList.reduce((acc, item) => {
                    if (!acc[item.exerciseName]) acc[item.exerciseName] = [];
                    acc[item.exerciseName].push(item);
                    return acc;
                  }, {} as Record<string, ExerciseProgress[]>);

                  resolve({ training, progress: grouped });
                });
              })
          )
        );

        const filtered = results.filter((r) =>
          Object.values(r.progress).some((entries) => entries.length > 0)
        );

        setStats(filtered);
        setLoading(false);
      });
    }, [userId])
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#00cc99" />
      </View>
    );
  }

  if (stats.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome5 name="chart-line" size={48} color="#ccc" />
        <Text style={styles.emptyHeader}>Brak danych o progresji</Text>
        <Text style={styles.emptyText}>
          Zacznij zapisywać swoje treningi i śledź postępy na wykresach 📈
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📊 Statystyki treningów</Text>

      {stats.map(({ training, progress }) => (
        <View key={training.id} style={styles.trainingBlock}>
          <Text style={styles.trainingTitle}>{training.name}</Text>

          {Object.entries(progress)
            .filter(([_, entries]) => entries.length > 1)
            .map(([exerciseName, entries]) => {
              const first = entries[0];
              const last = entries[entries.length - 1];

              const chartData = {
                labels: entries.map((e) =>
                  new Date(e.date).toLocaleDateString("pl-PL").slice(0, 5)
                ),
                datasets: [
                  {
                    data: entries.map((e) => parseFloat(e.weight) || 0),
                  },
                ],
              };

              const weightProgress =
                ((parseFloat(last.weight) - parseFloat(first.weight)) /
                  (parseFloat(first.weight) || 1)) *
                100;

              return (
                <View key={exerciseName} style={styles.exerciseCard}>
                  <Text style={styles.exerciseName}>🏋️ {exerciseName}</Text>
                  <Text style={styles.statLine}>
                    📅 {entries.length} zapisów od{" "}
                    {new Date(first.date).toLocaleDateString("pl-PL")}
                  </Text>
                  <Text style={styles.statLine}>
                    🔽 Start: {first.weight}kg × {first.reps} × {first.sets}
                  </Text>
                  <Text style={styles.statLine}>
                    🔼 Ostatni: {last.weight}kg × {last.reps} × {last.sets}
                  </Text>
                  <Text
                    style={[
                      styles.statLine,
                      {
                        color: weightProgress > 0 ? "#007700" : "#cc0000",
                        fontWeight: "600",
                      },
                    ]}
                  >
                    📈 Progres: {weightProgress.toFixed(1)}%
                  </Text>

                  <LineChart
                    data={chartData}
                    width={Dimensions.get("window").width - 60}
                    height={180}
                    yAxisSuffix="kg"
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#ffffff",
                      backgroundGradientTo: "#ffffff",
                      decimalPlaces: 1,
                      color: () => "#00cc99",
                      labelColor: () => "#888",
                      propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#00cc99",
                      },
                    }}
                    style={{ marginTop: 10, borderRadius: 12 }}
                  />
                </View>
              );
            })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fdfc",
    padding: 20,
    marginTop: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00cc99",
  },
  trainingBlock: {
    marginBottom: 30,
  },
  trainingTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#007766",
    paddingLeft: 8,
  },
  exerciseCard: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#00aa88",
  },
  statLine: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#f7fdfc",
  },
  emptyHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#555",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
});
