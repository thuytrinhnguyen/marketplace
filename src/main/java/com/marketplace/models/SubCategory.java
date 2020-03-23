package com.marketplace.models;

import lombok.Data;

@Data
public class SubCategory {
    private Long id;

    private String name;

    private Category category;
}
