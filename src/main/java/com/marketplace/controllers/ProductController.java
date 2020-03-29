package com.marketplace.controllers;

import com.marketplace.exceptions.ProductNotFoundException;
import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.Category;
import com.marketplace.models.Product;
import com.marketplace.models.ProductCreate;
import com.marketplace.models.SubCategory;
import com.marketplace.services.ProductService;
import lombok.var;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/products")
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Product>> findAll(
            @RequestParam(required = false) Long subCategoryId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String username) {

        var example = new Product();

        example.setCreatedBy("".equals(username) ? null : username);
        var category = new Category();
        var subCategory = new SubCategory();
        subCategory.setCategory(category);
        example.setSubCategory(subCategory);
        subCategory.setId(subCategoryId);
        category.setId(categoryId);

        return ResponseEntity.ok(productService.findAllByExample(example));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(productService.findById(id));
        } catch (ProductNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    };

    @PostMapping("/")
    public ResponseEntity<Product> save(@Valid @RequestBody ProductCreate productCreate) throws SubCategoryNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.save(productCreate));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Void> deleteMultiple(@Valid @RequestBody List<Long> idList) {
        productService.deleteMultiple(idList);
        return ResponseEntity.ok().build();
    }

}
