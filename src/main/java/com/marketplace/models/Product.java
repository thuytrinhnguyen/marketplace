package com.marketplace.models;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class Product {

    private Long id;

    private String name;

    private Float price;

    private String description;

    private String image;

    private SubCategory subCategory;
}
