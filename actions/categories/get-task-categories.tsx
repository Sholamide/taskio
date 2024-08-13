import { db } from "@/config/firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const getTaskCategories = async () => {
  const taskCategories: any = [];

  const categoriesSnap = await getDocs(collection(db, "categories"));

  categoriesSnap.forEach((doc) => {
    taskCategories.push(doc.data());
  });

  return taskCategories;
};

export default getTaskCategories;
