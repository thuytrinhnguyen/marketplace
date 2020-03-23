package com.marketplace.services;

import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.Product;
import com.marketplace.models.ProductCreate;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    Product save(ProductCreate productCreate) throws SubCategoryNotFoundException;

    void deleteById(Long id);

    void deleteMultiple(List<Long> idList);

    List<Product> findAllBySubCategoryId(Long subCatId);

    List<Product> findAllByCategoryId(Long catId);
}
