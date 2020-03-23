package com.marketplace.repositories;

import com.marketplace.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllBySubCategory_Id(Long subCatId);

    List<Product> findAllBySubCategory_Category_Id(Long catId);
}
