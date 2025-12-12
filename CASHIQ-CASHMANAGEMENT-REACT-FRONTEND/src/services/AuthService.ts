export interface UserDTO {
  username: string;
  email: string;
  phone: string;
  password?: string;
}

export interface AuthDTO {
  username: string;
  password?: string;
}

const API_base_URL = "http://localhost:8080/auth";

class AuthService {
  async registerUser(user: UserDTO): Promise<string> {
    try {
      const response = await fetch(`${API_base_URL}/register-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Registration failed');
      }

      return await response.text();
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  }

  async login(authRequest: AuthDTO): Promise<string> {
    try {
      const response = await fetch(`${API_base_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authRequest),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Login failed');
      }

      return await response.text();
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }
}

export default new AuthService();
