import axios from 'axios';

export const addExpense = async (form) => {
  return axios.post('http://localhost:8080/cashmanagement/add-expense', {
    ...form,
    amount: parseFloat(form.amount),
  });
};