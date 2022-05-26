package com.xiaohaoo.warehousemanagement.services;

import com.xiaohaoo.warehousemanagement.entities.Product;
import com.xiaohaoo.warehousemanagement.mappers.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Copyright (c) 2022 xiaohao. All Rights Reserved.
 *
 * @author xiaohao
 * @version 1.0
 * @date 2022-05-26 2:38 PM
 */
@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;


    public Product findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product findOne(Product product) {
        return productRepository.findOne(Example.of(product)).orElse(null);
    }

    public List<Product> findAll(Product product) {
        return productRepository.findAll(Example.of(product));
    }

    public Product saveOne(Product product) {
        return productRepository.save(product);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }
}
