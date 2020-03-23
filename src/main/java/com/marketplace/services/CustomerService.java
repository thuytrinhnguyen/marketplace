package com.marketplace.services;


import com.marketplace.models.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> findAll();

    Customer save(Customer customer);

    void delete(Long id);

    void deleteMultiple(List<Long> idList);
}
