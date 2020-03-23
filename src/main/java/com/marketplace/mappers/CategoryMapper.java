package com.marketplace.mappers;

import com.marketplace.entities.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = {SubCategoryMapper.class})
public interface CategoryMapper {
    Category toEntity(com.marketplace.models.Category model);

    List<Category> toEntities(List<com.marketplace.models.Category> models);

    com.marketplace.models.Category toModel(Category entity);

    List<com.marketplace.models.Category> toModels(List<Category> entities);
}
