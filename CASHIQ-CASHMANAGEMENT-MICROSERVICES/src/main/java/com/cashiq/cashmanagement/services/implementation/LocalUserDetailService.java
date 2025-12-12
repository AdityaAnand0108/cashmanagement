package com.cashiq.cashmanagement.services.implementation;

import com.cashiq.cashmanagement.entity.Users;
import com.cashiq.cashmanagement.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class LocalUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public LocalUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        // Mapping our Entity Users to Spring Security UserDetails
        // For simplicity using empty authorities list for now, extend as needed
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }
}
