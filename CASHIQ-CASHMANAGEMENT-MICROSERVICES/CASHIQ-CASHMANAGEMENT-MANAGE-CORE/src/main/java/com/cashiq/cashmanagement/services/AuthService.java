package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.AuthDTO;
import com.cashiq.cashmanagement.dto.UserDTO;
import com.cashiq.cashmanagement.dto.AuthResponseDTO;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This interface is used to store the user details
 */
public interface AuthService {

    /**
     * @method - registerUser
     * @param - userDTO
     * @return - String
     * @Description - This method is used to register the user
     */
    String registerUser(UserDTO userDTO);

    /**
     * @method - login
     * @param - authDTO
     * @return - String
     * @Description - This method is used to login the user
     */
    AuthResponseDTO login(AuthDTO authDTO);
}
