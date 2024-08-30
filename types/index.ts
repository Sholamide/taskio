type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: any;
};

type Project = {
  id: string;
  name: string;
  description: string;
  defaultImageUrl: string;
  themeColor: string;
};

type taskCategory = {
  name: string;
  description: string;
  defaultImageUrl: string;
  themeColor: string;
};

type User = {
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  image?: string;
  clerkUserId?: string;
  projects?: Project[];
  tasks?: Task[];
};
