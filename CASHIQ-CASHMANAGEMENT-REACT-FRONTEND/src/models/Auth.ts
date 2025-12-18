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
