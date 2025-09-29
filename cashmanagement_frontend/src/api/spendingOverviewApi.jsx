import axios from 'axios';

export const fetchSpendingOverview = async () => {
  const response = await axios.get('http://localhost:8080/cashmanagement/spending/overview');
  return response.data;
};