import { taskCategories } from "../constants";

export const getCategoryTheme = (id: string) => {
  const category = taskCategories.find((category) => category.id === id);
  if (category) {
    return category.themeColor;
  }
};
