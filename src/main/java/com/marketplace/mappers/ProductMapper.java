package com.marketplace.mappers;

import com.marketplace.entities.Product;
import com.marketplace.models.ProductCreate;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(com.marketplace.models.Product model);

    List<Product> toEntities(Iterable<com.marketplace.models.Product> models);

    List<com.marketplace.models.Product> toModels(Iterable<Product> entities);

    com.marketplace.models.Product toModel(Product entity);

    Product toEntity(ProductCreate productCreate);
}
