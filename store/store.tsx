import { useStoreInterface } from "@/interface";
import { create } from "zustand";

const useStore = create<useStoreInterface>((set) => ({
  activeUser: {} as User,
  featuredtasks: [],
  categories: [],
  setActiveUser: (user: User) => {
    set({ activeUser: user });
  },
  setFeaturedTasks: (featuredTasks: featuredTasks[]) => {
    set({ featuredtasks: featuredTasks });
  },
  setCategories: (categories: taskCategory[]) => {
    set({ categories: categories });
  },
}));

export default useStore;
