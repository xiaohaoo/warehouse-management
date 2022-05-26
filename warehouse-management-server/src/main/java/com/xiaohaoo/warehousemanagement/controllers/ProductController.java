package com.xiaohaoo.warehousemanagement.controllers;

import com.xiaohaoo.common.web.ResponseResult;
import com.xiaohaoo.warehousemanagement.entities.Product;
import com.xiaohaoo.warehousemanagement.services.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Copyright (c) 2022 xiaohao. All Rights Reserved.
 *
 * @author xiaohao
 * @version 1.0
 * @date 2022-05-26 2:38 PM
 */
@RestController
@AllArgsConstructor
@RequestMapping("product")
public class ProductController {
    private ProductService productService;

    @GetMapping
    public ResponseResult<List<Product>> findAll(Product product) {
        return ResponseResult.ok(productService.findAll(product));
    }
}
