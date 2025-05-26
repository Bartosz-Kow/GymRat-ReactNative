import { create } from "zustand";

export interface AddedExercise {
  name: string;
  weight: string;
  reps: string;
  sets: string;
}

interface ExerciseState {
  removeExercise: any;
  exercises: AddedExercise[];
  addExercise: (exercise: AddedExercise) => void;
  clearExercises: () => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
  clearExercises: () => set({ exercises: [] }),
  removeExercise: (index: number) =>
    set((state) => ({
      exercises: state.exercises.filter((_, i) => i !== index),
    })),
}));
