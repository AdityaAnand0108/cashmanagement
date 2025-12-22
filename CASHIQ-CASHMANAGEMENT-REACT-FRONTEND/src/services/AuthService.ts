import axios from 'axios';
import type { UserDTO, AuthDTO, AuthResponse } from '../models/Auth';

const API_base_URL = "http://localhost:8080/auth";

class AuthService {
  async registerUser(user: UserDTO): Promise<string> {
    try {
      const response = await axios.post(`${API_base_URL}/register-user`, user);
      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data || 'Registration failed');
        }
      console.error("Registration Error:", error);
      throw error;
    }
  }

  async login(authRequest: AuthDTO): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${API_base_URL}/login`, authRequest);
      return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
             throw new Error(error.response.data || 'Login failed');
        }
      console.error("Login Error:", error);
      throw error;
    }
  }
}

export default new AuthService();
