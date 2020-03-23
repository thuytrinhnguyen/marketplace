package com.marketplace.services;

import com.marketplace.exceptions.CategoryNotFoundException;
import com.marketplace.models.Category;

import java.util.List;

public interface CategoryService {
    Category save(Category category);

    void deleteById(Long id);

    List<Category> findAll();

    Category findById(Long id) throws CategoryNotFoundException;
}
