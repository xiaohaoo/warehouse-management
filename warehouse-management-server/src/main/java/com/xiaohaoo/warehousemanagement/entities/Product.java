package com.xiaohaoo.warehousemanagement.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Copyright (c) 2022 xiaohao. All Rights Reserved.
 *
 * @author xiaohao
 * @version 1.0
 * @date 2022-05-26 2:25 PM
 */
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Accessors(chain = true)
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String number;
    private String createdTime;
    private String updateTime;
    private Integer quantity;
    private String name;
}
