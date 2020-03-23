package com.marketplace.models;

import lombok.Data;

@Data
public class User {
    private String username;
    private String firstName;
    private String lastName;
    private String profilePicture;
    private String title;
}
