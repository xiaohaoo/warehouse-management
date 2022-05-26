import { HttpMethods, useRequest } from "hooks";
import { useRef, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Space, Tag } from "antd";
import { ActionType, ProTable } from "@ant-design/pro-components";
import styles from "./index.module.less";

export const ProductPage = () => {
    const httpRequest = useRequest();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [actionName, setActionName] = useState<String>();

    const [form] = Form.useForm();

    const tableActionRef = useRef<ActionType>();
    const getProducts = async () => {
        const { data } = await httpRequest({
            url: "/product"
        });
        return data;
    };
    const updateAction = async (action: any) => {
        action.type = actionName;
        await httpRequest({
            url: "/action",
            method: HttpMethods.POST,
            data: action
        });
        await getProducts();
    };
    return <div className={styles.page}>


        <ProTable
            actionRef={tableActionRef}
            columns={
                [
                    { title: "单号", dataIndex: "number", width: 120, sorter: false },
                    { title: "名称", dataIndex: "name", width: 150, sorter: false },
                    { title: "创建时间", dataIndex: "createdTime", valueType: "dateTime", width: 100, sorter: false },
                    { title: "更新时间", dataIndex: "updateTime", valueType: "dateTime", width: 100, sorter: false },
                    {
                        title: "剩余数量",
                        dataIndex: "quantity",
                        valueType: "number",
                        sorter: false,
                        width: 150,
                        render: (_, record) => (
                            <Space>
                                {
                                    <Tag color="red">
                                        {record.quantity}
                                    </Tag>
                                }
                            </Space>
                        )
                    },
                    {
                        title: "操作", width: 100, render: (_, record) => (
                            <Space>
                                {
                                    <Button color="red" type="link" onClick={() => {
                                        setActionName("出库");
                                        form.setFieldsValue({
                                            productId: record.id,
                                            name: record.name,
                                            number: record.number
                                        });
                                        setModalVisible(true);
                                    }}>
                                        出库
                                    </Button>
                                }
                            </Space>
                        )
                    }
                ]
            }
            request={async (params, sorter, filter) => {
                return Promise.resolve({
                    data: await getProducts(),
                    success: true
                });
            }}
            rowKey="id"
            pagination={false}
            search={false}
            bordered
            headerTitle="库存表"
            toolBarRender={() => [
                <Button type="primary" onClick={() => {
                    form.resetFields();
                    setActionName("入库");
                    setModalVisible(true);
                }}>
                    入库
                </Button>
            ]}
        />

        <Modal title={`${actionName}信息填写`}
               cancelText="取消"
               okText="确定"
               visible={modalVisible}
               onCancel={() => {
                   setModalVisible(false);
                   form.resetFields();
               }}
               onOk={async () => {
                   const values = await form.validateFields();
                   setModalVisible(false);
                   await updateAction(values);
                   tableActionRef.current?.reload();
                   form.resetFields();
               }}>
            <Form form={form}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    hidden={true}
                    name="productId"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="单号"
                    name="number"
                    rules={[{ required: true, message: "请输入单号" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: "请输入名称" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="数量"
                    name="quantity"
                    rules={[{ required: true, message: "请输入数量" }]}
                >
                    <InputNumber min={0} />
                </Form.Item>
            </Form>
        </Modal>
    </div>;
};
