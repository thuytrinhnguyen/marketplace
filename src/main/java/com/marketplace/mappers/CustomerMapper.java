package com.marketplace.mappers;

import com.marketplace.entities.Customer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customer toEntity(com.marketplace.models.Customer model);

    List<Customer> toEntities(List<com.marketplace.models.Customer> models);

    com.marketplace.models.Customer toModel(Customer entity);

    List<com.marketplace.models.Customer> toModels(List<Customer> entities);
}
