type featuredTasks = {
    id: string,
    categoryName: string,
    name: string,
    description: string,
    userImageURL: string
}
type TaskType = {
    name: string,
    description: string,
    defaultImageUrl: string,
    themeColor: string
}

type taskCategory = {
    name: string,
    description: string,
    defaultImageUrl: string,
    themeColor: string
}

type User = {
    clerkUserId: string,
    email: string
}