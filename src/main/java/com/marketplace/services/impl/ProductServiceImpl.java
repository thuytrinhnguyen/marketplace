package com.marketplace.services.impl;

import com.marketplace.entities.SubCategory;
import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.ProductCreate;
import com.marketplace.repositories.SubCategoryRepository;
import lombok.var;
import com.marketplace.mappers.ProductMapper;
import com.marketplace.models.Product;
import com.marketplace.repositories.ProductRepository;
import com.marketplace.services.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private ProductRepository repository;
    private ProductMapper productMapper;
    private SubCategoryRepository subCategoryRepository;

    public ProductServiceImpl(ProductRepository repository,
                              ProductMapper productMapper,
                              SubCategoryRepository subCategoryRepository) {

        this.repository = repository;
        this.productMapper = productMapper;
        this.subCategoryRepository = subCategoryRepository;
    }

    public List<Product> findAll() {
        var entities = repository.findAll();
        return productMapper.toModels(entities);
    }

    @Override
    public Product save(ProductCreate productCreate) throws SubCategoryNotFoundException {
        var entity = productMapper.toEntity(productCreate);
        var subCategory = subCategoryRepository.findById(productCreate.getSubCategoryId()).orElseThrow(SubCategoryNotFoundException::new);

        entity.setSubCategory(subCategory);

        entity = repository.save(entity);
        return productMapper.toModel(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public void deleteMultiple(List<Long> idList) {

        repository.deleteAll(repository.findAllById(idList));
    }

    @Override
    public List<Product> findAllBySubCategoryId(Long subCatId) {
        var entities = repository.findAllBySubCategory_Id(subCatId);
        return productMapper.toModels(entities);
    }

    @Override
    public List<Product> findAllByCategoryId(Long catId) {
        var entities = repository.findAllBySubCategory_Category_Id(catId);
        return productMapper.toModels(entities);
    }
}
