import EligibilityChecker from "@/pages/tools/EligibilityChecker";

export const metadata = {
  title: "YStudy — Can you apply for Student Finance",
  description: "Check your Student Finance England eligibility for tuition fee and maintenance loans in 2 minutes.",
};

export default function Page() {
  return <EligibilityChecker />;
}
