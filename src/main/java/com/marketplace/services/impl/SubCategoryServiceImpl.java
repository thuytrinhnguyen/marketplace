package com.marketplace.services.impl;

import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.mappers.SubCategoryMapper;
import com.marketplace.models.SubCategory;
import com.marketplace.repositories.SubCategoryRepository;
import com.marketplace.services.SubCategoryService;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubCategoryServiceImpl implements SubCategoryService {
    private SubCategoryRepository repository;
    private SubCategoryMapper subCategoryMapper;

    public SubCategoryServiceImpl(SubCategoryRepository repository, SubCategoryMapper subCategoryMapper) {
        this.repository = repository;
        this.subCategoryMapper = subCategoryMapper;
    }

    @Override
    public List<SubCategory> findAll() {
        var entities = repository.findAll();
        return subCategoryMapper.toModels(entities);
    }

    @Override
    public SubCategory save(SubCategory subcategory) {
        var entity = subCategoryMapper.toEntity(subcategory);
        entity = repository.save(entity);
        return subCategoryMapper.toModel(entity);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<SubCategory> findByCategoryId(Long catId) {
        return subCategoryMapper.toModels(repository.findByCategory_Id(catId));
    }

    @Override
    public SubCategory findById(Long id) throws SubCategoryNotFoundException {
        var entity = repository.findById(id).orElseThrow(SubCategoryNotFoundException::new);
        return subCategoryMapper.toModel(entity);
    }

}
