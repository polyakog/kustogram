import { stateItem } from "./types";

export const loadState = (key: string) => {
  try {
    const persistedTodoString = localStorage.getItem(key);
    if (persistedTodoString === null) return undefined;
    return JSON.parse(persistedTodoString);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key: string, state: stateItem) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
    // ignore write errors
  }
};
