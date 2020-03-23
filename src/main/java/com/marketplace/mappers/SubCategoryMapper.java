package com.marketplace.mappers;

import com.marketplace.entities.SubCategory;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface SubCategoryMapper {
    SubCategory toEntity(com.marketplace.models.SubCategory model);

    List<SubCategory> toEntities(List<com.marketplace.models.SubCategory> models);

    com.marketplace.models.SubCategory toModel(SubCategory entity);

    List<com.marketplace.models.SubCategory> toModels(List<SubCategory> entities);


}
