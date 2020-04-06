package com.marketplace.controllers;

import com.marketplace.services.FileService;
import lombok.var;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

@RestController
@RequestMapping("/files")
public class FileController {

    private FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/")
    public ResponseEntity upload(@RequestPart("file") MultipartFile filePart) throws IOException {
        var fileInfo = fileService.store(filePart);
        return ResponseEntity.ok(fileInfo);
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<Resource> download(@PathVariable("fileId") Long fileId) {
        try {
            var file = fileService.findById(fileId);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName() + "\"")
                    .body(new ByteArrayResource(file.getContent()));

        } catch (FileNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
