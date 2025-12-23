package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to store the user details
 */
@Service
@Slf4j
public class LocalUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public LocalUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @method - loadUserByUsername
     * @param - username
     * @return - UserDetails
     * @Description - This method is used to load the user by username
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Loading user details for username: {}", username);
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> {
                    log.error("User not found with username: {}", username);
                    return new com.cashiq.cashmanagement.exception.UserNotFoundException(
                            "User not found with username: " + username);
                });

        // Mapping our Entity Users to Spring Security UserDetails
        // For simplicity using empty authorities list for now, extend as needed
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }
}
