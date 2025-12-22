package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.dto.AuthDTO;
import com.cashiq.cashmanagement.dto.AuthResponseDTO;
import com.cashiq.cashmanagement.dto.UserDTO;
import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.UserRepository;
import com.cashiq.cashmanagement.services.AuthService;
import com.cashiq.cashmanagement.util.JwtUtil;
import com.cashiq.cashmanagement.validation.UserValidator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to store the user details
 */
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserValidator userValidator;

    /**
     * @method - registerUser
     * @param - userDTO
     * @return - String
     * @Description - This method is used to register the user
     */
    @Override
    public String registerUser(UserDTO userDTO) {

        userValidator.validateUserRegistration(userDTO);

        Users user = modelMapper.map(userDTO, Users.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setCreateDate(LocalDate.now());

        userRepository.save(user);

        return "User registered successfully with ID : " + user.getId();
    }

    /**
     * @method - login
     * @param - authDTO
     * @return - String
     * @Description - This method is used to login the user
     */
    @Override
    public AuthResponseDTO login(AuthDTO authDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authDTO.getUsername(), authDTO.getPassword()));

        if (authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal(); // This logic might depend on
                                                                                   // UserDetailsService impl
            // Generate token
            String token = jwtUtil.generateToken(userDetails);

            // Fetch the user entity to get ID
            Users user = userRepository.findByUsername(authDTO.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return new AuthResponseDTO(token, user.getId(), user.getUsername());
        } else {
            throw new RuntimeException("Invalid user request !");
        }
    }
}
