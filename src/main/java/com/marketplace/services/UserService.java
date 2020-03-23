package com.marketplace.services;

import com.marketplace.exceptions.InvalidCredentialsException;
import com.marketplace.models.Credentials;
import com.marketplace.models.Jwt;
import com.marketplace.models.User;
import com.marketplace.models.UserCreate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserService {

    Jwt login(Credentials credentials) throws InvalidCredentialsException;

    User findById(String username) throws UsernameNotFoundException;

    User create(UserCreate user);
}
