import type { Metadata } from "next";
import Home from "@/pages/Home";

export const metadata: Metadata = {
  title: "YStudy — Home",
  description: "Compare courses, Student Finance and flexible study routes before you apply — built for mature students and career changers.",
};

export default function Page() {
  return <Home />;
}
