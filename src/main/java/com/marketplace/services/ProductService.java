package com.marketplace.services;

import com.marketplace.exceptions.ProductNotFoundException;
import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.Product;
import com.marketplace.models.ProductCreate;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    Product save(ProductCreate productCreate) throws SubCategoryNotFoundException;

    Product findById(Long id) throws ProductNotFoundException;

    void deleteById(Long id);

    void deleteMultiple(List<Long> idList);

    List<Product> findAllBySubCategoryId(Long subCatId);

    List<Product> findAllByCategoryId(Long catId);

    List<Product> findAllByExample(Product product);
}
