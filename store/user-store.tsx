import { useUserStoreInterface } from "@/interface";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

const useUserStore = create<useUserStoreInterface>((set, get) => ({
  activeUser: {} as User,
  userProjects: [],
  featuredtasks: [],
  categories: [],
  //set active user
  setActiveUser: (user: User) => {
    set({ activeUser: user });
  },
  //add task to active user tasks
  addTask: (newTask: Task) => {
    set((state) => ({
      activeUser: {
        ...state.activeUser,
        tasks: [...(state.activeUser.tasks || []), newTask],
      },
    }));
  },

  //set active user tasks
  setUserTasks: (tasks: Task[]) => {
    set((state) => ({
      activeUser: {
        ...state.activeUser,
        tasks: tasks,
      },
    }));
  },
}));

export default useUserStore;
