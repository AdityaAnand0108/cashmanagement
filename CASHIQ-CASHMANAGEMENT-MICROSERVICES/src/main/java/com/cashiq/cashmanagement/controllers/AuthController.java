package com.cashiq.cashmanagement.controllers;

import com.cashiq.cashmanagement.dto.AuthDTO;
import com.cashiq.cashmanagement.dto.UserDTO;
import com.cashiq.cashmanagement.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
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
        return ResponseEntity.ok(authService.registerUser(userDTO));
    }

    /**
     * @method - login
     * @param - authDTO
     * @return - ResponseEntity<String>
     * @Description - This method is used to login the user
     */
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthDTO authDTO) {
        return ResponseEntity.ok(authService.login(authDTO));
    }
}
