package com.marketplace.services.impl;

import lombok.var;
import com.marketplace.mappers.CustomerMapper;
import com.marketplace.models.Customer;
import com.marketplace.repositories.CustomerRepository;
import com.marketplace.services.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository repository;
    private CustomerMapper customerMapper;

    public CustomerServiceImpl(CustomerRepository repository, CustomerMapper customerMapper) {
        this.repository = repository;
        this.customerMapper = customerMapper;
    }

    public List<Customer> findAll() {
        var entities = repository.findAll();
        return customerMapper.toModels(entities);
    }

    public Customer save(Customer customer) {
        var entity = customerMapper.toEntity(customer);
        entity = repository.save(entity);
        return customerMapper.toModel(entity);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public void deleteMultiple(List<Long> idList) {
        repository.deleteAll(repository.findAllById(idList));
    }
}
