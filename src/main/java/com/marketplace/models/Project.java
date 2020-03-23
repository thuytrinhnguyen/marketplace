package com.marketplace.models;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class Project {
    private Long id;

    private String name;

    private Integer duration;

    private String status;
}
