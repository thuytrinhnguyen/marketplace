package com.marketplace.models;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserCreate {
    @NotBlank
    private String username;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotBlank
    private String password;

    private String profilePicture;

    private String title;
}
