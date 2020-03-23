package com.marketplace.controllers;

import com.marketplace.models.Customer;
import com.marketplace.services.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/customers")
public class CustomerController {
    private CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Customer>> findAll() {
        List<Customer> customers = customerService.findAll();
        return ResponseEntity.ok(customers);
    }

    @PostMapping("/")
    public ResponseEntity<Customer> save(@Valid @RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(customerService.save(customer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        customerService.delete(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Void> deleteMultiple(Principal principal, @Valid @RequestBody List<Long> idList) {
        customerService.deleteMultiple(idList);
        return ResponseEntity.ok().build();
    }

}
