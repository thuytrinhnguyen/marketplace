package com.marketplace.models;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class Credentials {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
