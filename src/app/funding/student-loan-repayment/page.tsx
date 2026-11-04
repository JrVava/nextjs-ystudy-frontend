import StudentLoanRepayment from "@/pages/funding/StudentLoanRepayment";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — Student Loan Repayment",
  description: "Understand how and when you repay your student loan, including repayment thresholds, interest rates, and what happens if you study or work abroad.",
};

export default async function Page() {
  const [data] = await Promise.all([
    getCMSPageContent("student-loan-repayment"),
  ]);
  return <StudentLoanRepayment data={data} />;
}

