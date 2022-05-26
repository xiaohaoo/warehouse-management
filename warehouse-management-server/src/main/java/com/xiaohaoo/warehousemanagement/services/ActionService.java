package com.xiaohaoo.warehousemanagement.services;

import com.xiaohaoo.common.util.DateTimeUtils;
import com.xiaohaoo.warehousemanagement.entities.Action;
import com.xiaohaoo.warehousemanagement.entities.Product;
import com.xiaohaoo.warehousemanagement.mappers.ActionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class ActionService {
    private ActionRepository actionRepository;
    private ProductService productService;

    public List<Action> findAll(Action action) {
        return actionRepository.findAll(Example.of(action));
    }

    @Transactional(rollbackFor = RuntimeException.class)
    public Action saveOne(Action action) {
        String stringOfNowDateTime = DateTimeUtils.getStringOfNowDateTime();
        if (action.getType().equals("出库")) {
            Product product = productService.findById(action.getProductId());
            action.setCreatedTime(stringOfNowDateTime);
            product.setUpdateTime(stringOfNowDateTime);
            action.setName(product.getName());
            action.setNumber(product.getNumber());
            Integer quantity = action.getQuantity();
            product.setQuantity(product.getQuantity() - quantity);
            productService.saveOne(product);
            actionRepository.save(action);
        } else if (action.getType().equals("入库")) {
            Product product = productService.findOne(new Product().setNumber(action.getNumber()));
            if (product == null) {
                product = new Product()
                    .setCreatedTime(stringOfNowDateTime)
                    .setUpdateTime(stringOfNowDateTime)
                    .setQuantity(action.getQuantity())
                    .setName(action.getName())
                    .setNumber(action.getNumber());
                productService.saveOne(product);
                action.setCreatedTime(stringOfNowDateTime);
                action.setProductId(product.getId());
            } else {
                action.setCreatedTime(stringOfNowDateTime).setName(product.getName()).setProductId(product.getId()).setNumber(product.getNumber());
                product.setQuantity(product.getQuantity() + action.getQuantity());
                productService.saveOne(product);
            }
            actionRepository.save(action);
        }
        return null;
    }

    public void deleteById(Long id) {
        actionRepository.deleteById(id);
    }
}
