import React from "react";
import styles from "./App.module.less";
import {Menu} from "antd";
import {useLocation, useNavigate, useOutlet} from "react-router-dom";
import {BlockOutlined, LoginOutlined, LogoutOutlined} from "@ant-design/icons";

export const App = () => {
    const outlet = useOutlet();
    const navigator = useNavigate();
    const pathname = decodeURI(useLocation().pathname).replace(/^\//, "");
    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <div className={styles.left}>仓库在线管理系统</div>
                <div className={styles.menu}>
                    <Menu title="仓库在线管理系统"
                          theme="dark"
                          mode="horizontal"
                          selectedKeys={[pathname]}
                          onSelect={({key}) => {
                              navigator(key);
                          }}
                          items={
                              [
                                  {
                                      icon: <BlockOutlined/>,
                                      key: "product",
                                      label: "仓库产品"
                                  },
                                  {
                                      icon: <LoginOutlined/>,
                                      key: "action/入库",
                                      label: "入库记录"
                                  },
                                  {
                                      icon: <LogoutOutlined/>,
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
