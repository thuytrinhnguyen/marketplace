package com.marketplace.entities;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
@Entity(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private Float price;

    @NotBlank
    private String description;

    @NotBlank
    private String image;

    @NotNull
    @ManyToOne
    private SubCategory subCategory;
}
