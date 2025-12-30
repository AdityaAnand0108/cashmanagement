import api from '../utils/AxiosConfig';
import type { DebtEntryDTO, DebtSummaryDTO } from '../models/Debt';

const API_URL = 'http://localhost:8080/api/debts';

/**
 * Service for handling Debt and IOU API interactions.
 */
const DebtService = {

    /**
     * Fetches the summary of debts (Total Owed vs Owed To) for a specific user.
     * @param userId - The ID of the user.
     * @returns Promise resolving to DebtSummaryDTO.
     */
    getDebtSummary: async (userId: number): Promise<DebtSummaryDTO> => {
        try {
            const response = await api.get(`${API_URL}/summary`, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching debt summary:", error);
            throw error;
        }
    },

    /**
     * Fetches all debt records for a user.
     * @param userId - The ID of the user.
     * @returns Promise resolving to an array of DebtEntryDTO.
     */
    getAllDebts: async (userId: number): Promise<DebtEntryDTO[]> => {
        try {
            const response = await api.get(API_URL, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching all debts:", error);
            throw error;
        }
    },

    /**
     * Creates a new debt or IOU record.
     * @param userId - The ID of the user.
     * @param debtData - The debt object to create.
     * @returns Promise resolving to the created DebtEntryDTO.
     */
    createDebt: async (userId: number, debtData: DebtEntryDTO): Promise<DebtEntryDTO> => {
        try {
            const response = await api.post(API_URL, debtData, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating debt:", error);
            throw error;
        }
    },

    /**
     * Records a payment towards a debt.
     * @param userId - The ID of the user.
     * @param debtId - The ID of the debt to pay.
     * @param amount - The amount to pay.
     * @returns Promise resolving to the updated DebtEntryDTO.
     */
    recordPayment: async (userId: number, debtId: number, amount: number): Promise<DebtEntryDTO> => {
        try {
            const response = await api.put(`${API_URL}/${debtId}/payment`, { amount }, {
                params: { userId }
            });
            return response.data;
        } catch (error) {
            console.error("Error recording payment:", error);
            throw error;
        }
    },

    /**
     * Deletes a debt record.
     * @param userId - The ID of the user.
     * @param debtId - The ID of the debt to delete.
     * @returns Promise resolving when deletion is complete.
     */
    deleteDebt: async (userId: number, debtId: number): Promise<void> => {
        try {
            await api.delete(`${API_URL}/${debtId}`, {
                params: { userId }
            });
        } catch (error) {
            console.error("Error deleting debt:", error);
            throw error;
        }
    }
};

export default DebtService;
