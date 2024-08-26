import useStore from "@/store/user-store";

export const getCategoryTheme = (categoryName: string) => {
  const { categories } = useStore();

  const category = categories.find(
    (category) => category.name === categoryName
  );
  if (category) {
    return category.themeColor;
  }
};
