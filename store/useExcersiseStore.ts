import { create } from "zustand";

export interface AddedExercise {
  name: string;
  weight: string;
  reps: string;
  sets: string;
}

interface ExerciseState {
  exercises: AddedExercise[];
  addExercise: (exercise: AddedExercise) => void;
  clearExercises: () => void;
  removeExercise: (index: number) => void;
  setExercises: (exercises: AddedExercise[]) => void;
}
export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [],
  addExercise: (exercise) =>
    set((state) => ({ exercises: [...state.exercises, exercise] })),
  clearExercises: () => set({ exercises: [] }),
  removeExercise: (index) =>
    set((state) => ({
      exercises: state.exercises.filter((_, i) => i !== index),
    })),
  setExercises: (exercises) => set({ exercises }),
}));
