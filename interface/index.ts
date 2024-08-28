export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

export interface useUserStoreInterface {
  activeUser: User;
  categories: any,
  setUserTasks: (tasks: Task[]) => void;
  setCategories: (categories: any) => void;
  addTask: (task: Task) => void;
  deleteTask: (id: String) => void;
  // updateTask: (id: String) => void;
  setActiveUser: (user: User) => void;
}

export interface Task {
  id: string,
  title: string,
  description: string,
  createdAt: any
}