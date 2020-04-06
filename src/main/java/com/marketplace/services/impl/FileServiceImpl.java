package com.marketplace.services.impl;

import com.marketplace.mappers.FileMapper;
import com.marketplace.models.File;
import com.marketplace.models.FileInfo;
import com.marketplace.repositories.FileRepository;
import com.marketplace.services.FileService;
import lombok.var;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@Service
public class FileServiceImpl implements FileService {

    private FileRepository fileRepository;
    private FileMapper fileMapper;

    public FileServiceImpl(FileRepository fileRepository, FileMapper fileMapper) {
        this.fileRepository = fileRepository;
        this.fileMapper = fileMapper;
    }

    @Override
    public FileInfo store(MultipartFile filePart) throws IOException {
        var entity = new com.marketplace.entities.File();
        entity.setContent(filePart.getBytes());
        entity.setName(filePart.getOriginalFilename());
        entity.setContentType(filePart.getContentType());
        entity = fileRepository.save(entity);
        return fileMapper.toFileInfo(entity);
    }

    @Override
    public File findById(Long id) throws FileNotFoundException {
        var entity = fileRepository.findById(id).orElseThrow(FileNotFoundException::new);
        return fileMapper.toModel(entity);
    }
}
