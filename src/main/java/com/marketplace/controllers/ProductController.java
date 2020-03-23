package com.marketplace.controllers;

import com.marketplace.exceptions.SubCategoryNotFoundException;
import com.marketplace.models.Product;
import com.marketplace.models.ProductCreate;
import com.marketplace.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
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
            @RequestParam(required = false) Long categoryId) {

        List<Product> products = new ArrayList<Product>();

        if (subCategoryId != null) {
            products = productService.findAllBySubCategoryId(subCategoryId);
        } else if (categoryId != null) {
            products = productService.findAllByCategoryId(categoryId);
        } else {
            products = productService.findAll();
        }
        return ResponseEntity.ok(products);
    }

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
