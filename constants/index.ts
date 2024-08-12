export const onboardingSteps = [
    {
        id: "1",
        title: "Create Tasks with Ease",
        subtitle: "Quickly set up tasks and describe the work you need done",
        icon: "tasks"
    },
    {
        id: "2",
        title: "Find the Right Help",
        subtitle:
            "Post tasks and let others accept them, so you don't have to search for help",
        icon: "hands-helping"
    },
    {
        id: "3",
        title: "Track Progress Effortlessly",
        subtitle:
            "Monitor task status and completion in real-time, all in one app.",
        icon: "uncharted"
    },
];

export const mockFeaturedTasks: featuredTasks[] = [
    {
        id: "1",
        categoryId: "1",
        name: "Faulty bathroom pipe",
        description: "Fixing leaks, unclogging drains, installing faucets.",
        userImageURL: "https://img.freepik.com/free-photo/representation-user-experience-interface-design-smartphone_23-2150165976.jpg?size=626&ext=jpg&ga=GA1.1.1823393217.1723464226&semt=ais_hybrid",
    },
    {
        id: "2",
        categoryId: "2",
        name: "Leaky Roof Repair",
        description: "Fixing leaks, replacing damaged shingles, and preventing water damage.",
        userImageURL: "https://img.freepik.com/free-photo/smiley-man-using-modern-smartphone-device-home_23-2148793471.jpg?ga=GA1.1.1823393217.1723464226&semt=ais_hybrid",
    },
    {
        id: "3",
        categoryId: "3",
        name: "Faulty Bathroom Pipe",
        description: "Fixing leaks, unclogging drains, installing faucets.",
        userImageURL: "https://img.freepik.com/free-photo/elegant-black-girl-summer-city_1157-19015.jpg?ga=GA1.1.1823393217.1723464226&semt=ais_hybrid",
    },
    {
        id: "4",
        categoryId: "4",
        name: "Broken Window Repair",
        description: "Replacing broken glass, fixing window frames, and ensuring proper sealing.",
        userImageURL: "https://img.freepik.com/free-photo/teenager-consumer-making-online-shopping-retail-store_482257-22063.jpg?ga=GA1.1.1823393217.1723464226&semt=ais_hybrid",
    },
    {
        id: "5",
        categoryId: "2",
        name: "Garden Maintenance",
        description: "Trimming bushes, mowing the lawn, and planting flowers.",
        userImageURL: "https://img.freepik.com/free-photo/smiling-adorable-teenage-girl-with-curly-hair-chats-online-via-smartphone-uses-application-addicted-modern-technologies-wears-stereo-headphones-around-neck-casual-yellow-jumper-white-wall_273609-53282.jpg?ga=GA1.1.1823393217.1723464226&semt=ais_hybrid",
    }
]


export const taskCategories: taskCategory[] = [
    {
        id: "1",
        name: "Plumbing",
        description: "All plumbing-related services.",
        defaultURL: "",
        themeColor: "#1E90FF",
    },
    {
        id: "2",
        name: "Electrical Work",
        defaultURL: "",
        description: "Electrical installations and repairs.",
        themeColor: "#FFD700", // Gold
    },
    {
        id: "3",
        name: "Painting",
        defaultURL: "",
        description: "Interior and exterior painting services.",
        themeColor: "#FF4500", // Orange Red
    },
    {
        id: "4",
        name: "Carpentry",
        defaultURL: "",
        description: "Woodwork and furniture repairs.",
        themeColor: "#8B4513", // Saddle Brown
    },
]