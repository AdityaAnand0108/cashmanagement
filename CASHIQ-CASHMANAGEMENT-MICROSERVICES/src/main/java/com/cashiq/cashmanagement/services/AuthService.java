package com.cashiq.cashmanagement.services;

import com.cashiq.cashmanagement.dto.AuthDTO;
import com.cashiq.cashmanagement.dto.UserDTO;

public interface AuthService {

    String registerUser(UserDTO userDTO);

    String login(AuthDTO authDTO);
}
