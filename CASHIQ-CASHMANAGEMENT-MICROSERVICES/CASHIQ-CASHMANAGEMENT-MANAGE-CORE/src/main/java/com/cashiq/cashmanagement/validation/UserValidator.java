package com.cashiq.cashmanagement.validation;

import com.cashiq.cashmanagement.dto.UserDTO;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.exception.UserAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to validate the user
 */
@Component
public class UserValidator {

    @Autowired
    private UserRepository userRepository;

    public void validateUserRegistration(UserDTO userDTO) {
        if (userDTO.getUsername() == null || userDTO.getUsername().trim().isEmpty()) {
            throw new RuntimeException("Username cannot be empty");
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password cannot be empty");
        }
        if (userDTO.getEmail() == null || userDTO.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email cannot be empty");
        }

        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UserAlreadyExistsException("User already exists with username: " + userDTO.getUsername());
        }
    }
}
