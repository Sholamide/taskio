export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

export interface useStoreInterface {
  activeUser: User;
  featuredtasks: featuredTasks[];
  categories: taskCategory[];
  setActiveUser: (user: User) => void;
  setFeaturedTasks: (featuredTasks: featuredTasks[]) => void;
  setCategories: (taskCategories: taskCategory[]) => void;
} 