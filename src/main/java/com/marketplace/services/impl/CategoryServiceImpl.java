package com.marketplace.services.impl;

import com.marketplace.exceptions.CategoryNotFoundException;
import com.marketplace.mappers.CategoryMapper;
import com.marketplace.models.Category;
import com.marketplace.repositories.CategoryRepository;
import com.marketplace.services.CategoryService;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public Category save(Category category) {
        var entity = categoryMapper.toEntity(category);
        categoryRepository.save(entity);
        return categoryMapper.toModel(entity);
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<Category> findAll() {
        var entities = categoryRepository.findAll();
        return categoryMapper.toModels(entities);
    }

    @Override
    public Category findById(Long id) throws CategoryNotFoundException {
        var entity = categoryRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        return categoryMapper.toModel(entity);
    }
}
