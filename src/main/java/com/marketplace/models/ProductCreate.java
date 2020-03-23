package com.marketplace.models;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class ProductCreate {

    @NotBlank
    private String name;

    @NotNull
    private Float price;

    @NotBlank
    private String description;

    @NotBlank
    private String image;

    @NotNull
    private Long subCategoryId;
}
