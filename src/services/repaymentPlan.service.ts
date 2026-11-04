import api from "@/lib/api";
import { decrypt } from "@/lib/crypto";

export interface TableColumn {
  id?: string;
  key: string;
  header: string;
}

export interface TableRow {
  id?: string;
  isHighlighted?: boolean;
  cells?: string[];
  [key: string]: any;
}

export interface RepaymentThresholdsPlan {
  _id?: string;
  columns: TableColumn[];
  rows: TableRow[];
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function getRepaymentThresholdsPlans(): Promise<RepaymentThresholdsPlan[] | null> {
  try {
    const res = await api.get("/frontend/repayment-thresholds-plans");

    const json = res.data;
    if (!json || !json.data) {
      return null;
    }

    const decrypted = decrypt(json.data);
    if (decrypted && decrypted.success && decrypted.data) {
      return decrypted.data;
    }

    return null;
  } catch (error: any) {
    console.error(
      `[repaymentPlan.service] Error calling Repayment Thresholds Plan API:`,
      error.message || error
    );
    return null;
  }
}
