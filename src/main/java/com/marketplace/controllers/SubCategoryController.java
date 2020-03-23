package com.marketplace.controllers;

import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.SubCategory;
import com.marketplace.services.impl.SubCategoryServiceImpl;
import lombok.var;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/subcategories")
public class SubCategoryController {
    private SubCategoryServiceImpl subCategoryService;

    public SubCategoryController(SubCategoryServiceImpl subCategoryService) {
        this.subCategoryService = subCategoryService;
    }

    @PostMapping("/")
    public ResponseEntity<SubCategory> save(@Valid @RequestBody SubCategory subCategory) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subCategoryService.save(subCategory));
    }

    @GetMapping("/")
    public ResponseEntity<List<SubCategory>> findAll(@RequestParam(required = false) Long categoryId) {
        var subCategories = categoryId == null ? subCategoryService.findAll()
                : subCategoryService.findByCategoryId(categoryId);
        return ResponseEntity.ok().body(subCategories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubCategory> findById(@PathVariable("id") Long id) throws SubCategoryNotFoundException {
        return ResponseEntity.ok().body(subCategoryService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        subCategoryService.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
