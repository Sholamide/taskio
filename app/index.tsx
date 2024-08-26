import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Page = () => {
  const { isSignedIn } = useAuth();

  console.log("is signed in", isSignedIn);

  if (isSignedIn) return <Redirect href="/(home)/home" />;

  if (isSignedIn) {
    console.log("User signed in");
  }
  return <Redirect href="/(auth)/sign-in" />;
};

export default Page;
