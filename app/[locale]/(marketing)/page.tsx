import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { LandingPage } from "./components/LandingPage";

const HomePage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LandingPage />;
};

export default HomePage;
