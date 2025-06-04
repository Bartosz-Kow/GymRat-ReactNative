import * as SQLite from "expo-sqlite";

// Typy danych
export interface User {
  id: string;
  email: string;
  name?: string;
  gender?: "male" | "female";
  birthDate?: string;
}

export interface Exercise {
  id: number;
  userId: string;
  name: string;
  description: string;
}

// Otwórz bazę danych
const db = SQLite.openDatabaseSync("app.db");

// Inicjalizacja bazy danych i tabel
export const initDatabase = (): void => {
  db.runSync(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT,
    name TEXT,
    gender TEXT,
    birthDate TEXT
  );`);
  db.runSync(`CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    name TEXT,
    description TEXT,
    FOREIGN KEY (userId) REFERENCES users (id)
  );`);
  db.runSync(`CREATE TABLE IF NOT EXISTS trainings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT,
  name TEXT,
  date TEXT,
  type TEXT,
  shared INTEGER,
  publicTitle TEXT,
  level TEXT,
  FOREIGN KEY (userId) REFERENCES users (id)
);`);

  db.runSync(`CREATE TABLE IF NOT EXISTS training_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trainingId INTEGER,
  name TEXT,
  weight TEXT,
  reps TEXT,
  sets TEXT,
  FOREIGN KEY (trainingId) REFERENCES trainings (id)
);`);
  db.runSync(`CREATE TABLE IF NOT EXISTS exercise_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId TEXT,
  trainingId INTEGER,
  exerciseName TEXT,
  weight TEXT,
  reps TEXT,
  sets TEXT,
  date TEXT,
  FOREIGN KEY (trainingId) REFERENCES trainings (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);`);
};

// Dodaj użytkownika
export const insertUser = (id: string, email: string): void => {
  db.runSync("INSERT OR REPLACE INTO users (id, email) VALUES (?, ?);", [
    id,
    email,
  ]);
};

// Zaktualizuj dane użytkownika
export const updateUserInfo = (
  id: string,
  name: string,
  gender: "male" | "female",
  birthDate: string
): void => {
  db.runSync(
    "UPDATE users SET name = ?, gender = ?, birthDate = ? WHERE id = ?;",
    [name, gender, birthDate, id]
  );
};

// Pobierz dane użytkownika po ID
export const getUserById = (
  id: string,
  callback: (user: User | null) => void
): void => {
  const result = db.getFirstSync<User>("SELECT * FROM users WHERE id = ?;", [
    id,
  ]);
  callback(result ?? null);
};

// Dodaj ćwiczenie
export const insertExercise = (
  userId: string,
  name: string,
  description: string
): void => {
  db.runSync(
    "INSERT INTO exercises (userId, name, description) VALUES (?, ?, ?);",
    [userId, name, description]
  );
};

// Pobierz wszystkie ćwiczenia użytkownika
export const getExercisesByUserId = (
  userId: string,
  callback: (exercises: Exercise[]) => void
): void => {
  const results = db.getAllSync<Exercise>(
    "SELECT * FROM exercises WHERE userId = ?;",
    [userId]
  );
  callback(results);
};
export const insertTrainingWithExercises = (
  userId: string,
  trainingData: {
    name: string;
    date: string;
    type: string;
    shared: boolean;
    publicTitle: string;
    level: string;
    exercises: {
      name: string;
      weight: string;
      reps: string;
      sets: string;
    }[];
  }
): void => {
  console.log("ZAPIS TRENINGU DLA userId:", userId);
  const { name, date, type, shared, publicTitle, level, exercises } =
    trainingData;

  db.runSync(
    `INSERT INTO trainings (userId, name, date, type, shared, publicTitle, level) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, name, date, type, shared ? 1 : 0, publicTitle, level]
  );

  const result = db.getFirstSync<{ id: number }>(
    "SELECT last_insert_rowid() as id;"
  );
  if (!result) {
    throw new Error("Nie udało się pobrać ID nowego treningu.");
  }
  const trainingId = result.id;

  exercises.forEach((ex) => {
    db.runSync(
      `INSERT INTO training_exercises (trainingId, name, weight, reps, sets) VALUES (?, ?, ?, ?, ?)`,
      [trainingId, ex.name, ex.weight, ex.reps, ex.sets]
    );
  });
};
export interface Training {
  id: number;
  userId: string;
  name: string;
  date: string;
  type: string;
  shared: boolean;
  publicTitle: string;
  level: string;
}
export const getTrainingsByUserId = (
  userId: string,
  callback: (trainings: Training[]) => void
): void => {
  console.log("Pobieram treningi dla:", userId);
  const results = db.getAllSync<Training>(
    "SELECT * FROM trainings WHERE userId = ?;",
    [userId]
  );
  console.log("Znaleziono treningów:", results.length);
  callback(results);
};
export const deleteTrainingById = (trainingId: number): void => {
  db.runSync("DELETE FROM training_exercises WHERE trainingId = ?;", [
    trainingId,
  ]);
  db.runSync("DELETE FROM trainings WHERE id = ?;", [trainingId]);
};
export interface TrainingExercise {
  id: number;
  trainingId: number;
  name: string;
  weight: string;
  reps: string;
  sets: string;
}

export const getExercisesByTrainingId = (
  trainingId: number,
  callback: (exercises: TrainingExercise[]) => void
): void => {
  const results = db.getAllSync<TrainingExercise>(
    "SELECT * FROM training_exercises WHERE trainingId = ?;",
    [trainingId]
  );
  callback(results);
};
export const updateTrainingWithExercises = (
  trainingId: number,
  trainingData: {
    name: string;
    date: string;
    type: string;
    shared: boolean;
    publicTitle: string;
    level: string;
    exercises: {
      name: string;
      weight: string;
      reps: string;
      sets: string;
    }[];
  }
): void => {
  const { name, date, type, shared, publicTitle, level, exercises } =
    trainingData;

  // Zaktualizuj dane treningu
  db.runSync(
    `UPDATE trainings SET name = ?, date = ?, type = ?, shared = ?, publicTitle = ?, level = ? WHERE id = ?`,
    [name, date, type, shared ? 1 : 0, publicTitle, level, trainingId]
  );

  // Usuń stare ćwiczenia
  db.runSync("DELETE FROM training_exercises WHERE trainingId = ?", [
    trainingId,
  ]);

  // Dodaj nowe ćwiczenia
  exercises.forEach((ex) => {
    db.runSync(
      `INSERT INTO training_exercises (trainingId, name, weight, reps, sets) VALUES (?, ?, ?, ?, ?)`,
      [trainingId, ex.name, ex.weight, ex.reps, ex.sets]
    );
  });
};
export const getTrainingById = (
  id: number,
  callback: (training: Training | null) => void
): void => {
  const result = db.getFirstSync<Training>(
    "SELECT * FROM trainings WHERE id = ?;",
    [id]
  );
  callback(result ?? null);
};
export interface ExerciseProgress {
  id: number;
  userId: string;
  trainingId: number;
  exerciseName: string;
  weight: string;
  reps: string;
  sets: string;
  date: string;
}
export const insertExerciseProgress = (
  userId: string,
  trainingId: number,
  progress: {
    exerciseName: string;
    weight: string;
    reps: string;
    sets: string;
  }[]
): void => {
  const date = new Date().toISOString(); // lub np. format YYYY-MM-DD

  progress.forEach((item) => {
    db.runSync(
      `INSERT INTO exercise_progress 
        (userId, trainingId, exerciseName, weight, reps, sets, date) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        trainingId,
        item.exerciseName,
        item.weight,
        item.reps,
        item.sets,
        date,
      ]
    );
  });
};
export const getProgressByTrainingId = (
  trainingId: number,
  callback: (data: ExerciseProgress[]) => void
): void => {
  const results = db.getAllSync<ExerciseProgress>(
    `SELECT * FROM exercise_progress WHERE trainingId = ? ORDER BY date ASC`,
    [trainingId]
  );
  callback(results);
};
export const getSharedTrainings = (
  callback: (trainings: Training[]) => void
): void => {
  const results = db.getAllSync<Training>(
    "SELECT * FROM trainings WHERE shared = 1"
  );
  callback(results);
};
