export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

export interface useUserStoreInterface {
  activeUser: User;
  addTask:(task:Task)=>void;
  // setUserTasks: (tasks: Task[]) => void;
  // userProjects: Project[];
  // setUserProjects: (projects: Project[]) => void;
  // featuredtasks: Task[];
  setActiveUser: (user: User) => void;
} 