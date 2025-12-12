package com.cashiq.cashmanagement.dto;

import lombok.Data;

/**
 * @author - Aditya
 * @version - 1.0
 * @Description - This class is used to store the user details
 */
@Data
public class UserDTO {

    private String username;
    private String password;
    private String email;
    private String phone;
}
