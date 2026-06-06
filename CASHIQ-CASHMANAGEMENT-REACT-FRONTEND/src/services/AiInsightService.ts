import api from '../utils/AxiosConfig';

/**
 * AiInsightService communicates with the Ollama-backed AI insight endpoint.
 * Uses the shared `api` instance so JWT auth and 401 handling are automatic.
 */

/**
 * Sends a natural-language query to the AI insight engine and returns its response.
 * @param query - The user's question or prompt (e.g. "How am I spending this month?").
 * @returns The AI-generated response string.
 */
const analyze = async (query: string): Promise<string> => {
    const response = await api.post('/api/ai/insights/analyze', { query });
    return response.data.response;
};

const AiInsightService = {
    analyze,
};

export default AiInsightService;
