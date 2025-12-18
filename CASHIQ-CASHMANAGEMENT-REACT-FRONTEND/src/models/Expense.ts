export interface ExpenseAnalysisResponse {
  status: string;
  parsed_data: {
    amount: number;
    category: string;
    date: string;
    payment_source: string;
  };
}
