package com.xiaohaoo.warehousemanagement.mappers;

import com.xiaohaoo.warehousemanagement.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Copyright (c) 2022 xiaohao. All Rights Reserved.
 *
 * @author xiaohao
 * @version 1.0
 * @date 2022-05-26 2:37 PM
 */
public interface ProductRepository extends JpaRepository<Product, Long> {
}
