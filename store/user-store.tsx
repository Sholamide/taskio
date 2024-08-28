import { useUserStoreInterface } from "@/interface";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

const useUserStore = create<useUserStoreInterface>((set, get) => ({
  activeUser: {} as User,
  userProjects: [],
  featuredtasks: [],
  categories: [],

  //set all categories
  setCategories: (categories: any) => {
    set({ categories: categories });
  },

  //set active user
  setActiveUser: (user: User) => {
    set({ activeUser: user });
  },

  //delete task
  deleteTask: (id: String) => {
    set((state) => ({
      activeUser: {
        ...state.activeUser,
        tasks: [
          ...(state.activeUser.tasks || []).filter((task) => task.id !== id),
        ],
      },
    }));
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
