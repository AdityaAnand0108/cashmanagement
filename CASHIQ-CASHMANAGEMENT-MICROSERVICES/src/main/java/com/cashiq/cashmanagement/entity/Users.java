package com.cashiq.cashmanagement.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_name")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(unique = true, name = "user_email")
    private String email;

    @Column(name = "phone_no")
    private String phone;

    @Column(name = "created_at")
    private LocalDate createDate;

}
