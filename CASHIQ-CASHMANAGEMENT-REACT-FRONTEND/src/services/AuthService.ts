import axios from 'axios';
import type { UserDTO, AuthDTO, AuthResponse } from '../models/Auth';

/**
 * Auth endpoints don't go through the shared `api` instance because they
 * don't require a JWT token — they are the endpoints that issue the token.
 */
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

/**
 * AuthService handles all authentication-related API calls:
 * user registration and login.
 */
class AuthService {

    /**
     * Registers a new user account.
     * @param user - The user details (username, email, password).
     * @returns A confirmation message from the server.
     * @throws Error with a user-friendly message if registration fails.
     */
    async registerUser(user: UserDTO): Promise<string> {
        try {
            const response = await axios.post(`${BASE_URL}/register-user`, user);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data || 'Registration failed');
            }
            throw error;
        }
    }

    /**
     * Authenticates a user and returns a JWT token along with user info.
     * @param authRequest - The login credentials (username and password).
     * @returns An AuthResponse containing the JWT token and user details.
     * @throws Error with a user-friendly message if login fails.
     */
    async login(authRequest: AuthDTO): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${BASE_URL}/login`, authRequest);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data || 'Login failed');
            }
            throw error;
        }
    }
}

export default new AuthService();
