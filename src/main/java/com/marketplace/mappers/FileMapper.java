package com.marketplace.mappers;

import com.marketplace.models.File;
import com.marketplace.models.FileInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FileMapper {
    FileInfo toFileInfo(com.marketplace.entities.File entity);

    File toModel(com.marketplace.entities.File entity);

    com.marketplace.entities.File toEntity(File model);
}
