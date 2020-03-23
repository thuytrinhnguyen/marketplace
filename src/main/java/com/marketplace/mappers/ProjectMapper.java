package com.marketplace.mappers;

import com.marketplace.entities.Project;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
    Project toEntity(com.marketplace.models.Project model);

    List<Project> toEntities(List<com.marketplace.models.Project> models);

    com.marketplace.models.Project toModel(Project entity);

    List<com.marketplace.models.Project> toModels(List<Project> entities);
}
