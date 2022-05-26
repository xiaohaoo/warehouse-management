import React from "react";
import styles from "./App.module.less";
import {Menu} from "antd";
import {useNavigate, useOutlet} from "react-router-dom";

export const App = () => {
    const outlet = useOutlet();
    const navigator = useNavigate();
    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <div className={styles.left}>仓库在线管理系统</div>
                <div className={styles.menu}>
                    <Menu title="仓库在线管理系统"
                          theme="dark"
                          mode="horizontal"
                          onSelect={({key}) => {
                              navigator(key);
                          }}
                          defaultSelectedKeys={["2"]}
                          items={
                              [
                                  {
                                      key: "product",
                                      label: "仓库产品"
                                  },
                                  {
                                      key: "action/入库",
                                      label: "入库记录"
                                  },
                                  {
                                      key: "action/出库",
                                      label: "出库记录"
                                  }
                              ]
                          }
                    />
                </div>
            </div>
            <div className={styles.content}>
                {outlet}
            </div>
            <div className={styles.footer}>
                仓库在线管理 © 2022 电脑版
            </div>
        </div>

    );
};
