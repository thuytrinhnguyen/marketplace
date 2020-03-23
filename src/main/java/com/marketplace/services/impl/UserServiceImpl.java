package com.marketplace.services.impl;

import lombok.var;
import com.marketplace.exceptions.InvalidCredentialsException;
import com.marketplace.mappers.UserMapper;
import com.marketplace.models.Credentials;
import com.marketplace.models.Jwt;
import com.marketplace.models.User;
import com.marketplace.models.UserCreate;
import com.marketplace.repositories.UserRepository;
import com.marketplace.services.UserService;
import com.marketplace.utils.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private UserRepository userRepository;
    private JwtUtil jwtUtil;
    private UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository,
                           JwtUtil jwtUtil,
                           UserMapper userMapper) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " not found."));
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                Collections.emptyList());
    }

    @Override
    public Jwt login(Credentials credentials) throws InvalidCredentialsException {
        var existing = userRepository
                .findById(credentials.getUsername())
                .orElseThrow(InvalidCredentialsException::new);

        if (!existing.getPassword().equals(credentials.getPassword())) {
            throw new InvalidCredentialsException();
        }

        var jwt = new Jwt();
        jwt.setToken(jwtUtil.generateToken(userMapper.toModel(existing)));
        return jwt;
    }

    @Override
    public User findById(String username) throws UsernameNotFoundException {
        var entity = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
        return userMapper.toModel(entity);
    }

    @Override
    public User create(UserCreate userCreate) {
        var entity = userMapper.toEntity(userCreate);
        entity = userRepository.save(entity);
        return userMapper.toModel(entity);
    }
}
