package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.AuthDTO;
import com.cashiq.cashmanagement.dto.AuthResponseDTO;
import com.cashiq.cashmanagement.dto.UserDTO;
import com.cashiq.cashmanagement.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to handle the authentication requests
 */
@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthService authService;

    /**
     * @method - registerUser
     * @param - userDTO
     * @return - ResponseEntity<String>
     * @Description - This method is used to register the user
     */
    @PostMapping("/register-user")
    public ResponseEntity<String> registerUser(@RequestBody UserDTO userDTO) {
        log.info("Attempting to register user: {}", userDTO.getUsername());
        try {
            String result = authService.registerUser(userDTO);
            log.info("User registered successfully: {}", userDTO.getUsername());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error registering user: {}", userDTO.getUsername(), e);
            throw e;
        }
    }

    /**
     * @method - login
     * @param - authDTO
     * @return - ResponseEntity<AuthResponseDTO>
     * @Description - This method is used to login the user
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthDTO authDTO) {
        log.info("Login attempt for user: {}", authDTO.getUsername());
        try {
            AuthResponseDTO response = authService.login(authDTO);
            log.info("User logged in successfully: {}", authDTO.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Login failed for user: {}", authDTO.getUsername(), e);
            throw e;
        }
    }
}
