package com.xiaohaoo.warehousemanagement.controllers;

import com.xiaohaoo.common.web.ResponseResult;
import com.xiaohaoo.warehousemanagement.entities.Action;
import com.xiaohaoo.warehousemanagement.services.ActionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping("action")
public class ActionController {
    private ActionService actionService;

    @GetMapping
    public ResponseResult<List<Action>> findAll(Action action) {
        return ResponseResult.ok(actionService.findAll(action));
    }

    @PostMapping
    public ResponseResult<Action> saveOne(@RequestBody Action action) {
        return actionService.saveOne(action) == null ? ResponseResult.error("请选择正确的类型") : ResponseResult.ok();
    }
}
