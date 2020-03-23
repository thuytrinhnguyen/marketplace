package com.marketplace.services;

import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.SubCategory;

import java.util.List;

public interface SubCategoryService {
    List<SubCategory> findAll();

    SubCategory save(SubCategory subcategory);

    void deleteById(Long id);

    List<SubCategory> findByCategoryId(Long id);

    SubCategory findById(Long id) throws SubCategoryNotFoundException;
}
