package com.marketplace.services;

import com.marketplace.models.File;
import com.marketplace.models.FileInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {
    FileInfo store(MultipartFile filePart) throws IOException;

    File findById(Long id) throws FileNotFoundException;

}
