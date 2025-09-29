import axios from 'axios';
import { SpendingOverview } from '../types/spendingOverview';

export const fetchSpendingOverview = async (): Promise<SpendingOverview> => {
  const response = await axios.get<SpendingOverview>('http://localhost:8080/cashmanagement/spending/overview');
  return response.data;
};