package com.marketplace.mappers;

import com.marketplace.entities.User;
import com.marketplace.models.UserCreate;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(com.marketplace.models.User model);

    User toEntity(UserCreate model);

    com.marketplace.models.User toModel(User entity);


}
