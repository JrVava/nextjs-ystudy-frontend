import StudentLoanRepayment from "@/pages/funding/StudentLoanRepayment";
import { getRepaymentThresholdsPlans } from "@/services";
import { getCMSPageContent } from "@/services/cms.service";

export const metadata = {
  title: "YStudy — Student Loan Repayment",
  description: "Understand how and when you repay your student loan, including repayment thresholds, interest rates, and what happens if you study or work abroad.",
};

export default async function Page() {
  const [data, repaymentPlan] = await Promise.all([
    getCMSPageContent("student-loan-repayment"),
    getRepaymentThresholdsPlans()
  ]);
  return <StudentLoanRepayment data={data} repaymentPlan={repaymentPlan} />;
}

