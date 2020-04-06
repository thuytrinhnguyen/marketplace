package com.marketplace.models;

import lombok.Data;

@Data
public class File {
    private Long id;
    private String name;
    private String contentType;
    private byte[] content;
}
