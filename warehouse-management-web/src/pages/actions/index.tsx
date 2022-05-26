import { useParams } from "react-router-dom";
import { ProTable } from "@ant-design/pro-components";
import { Space, Tag } from "antd";
import { useRequest } from "../../hooks";
import styles from "./index.module.less";

export const ActionPage = () => {
    const { type } = useParams();
    const httpRequest = useRequest();

    const getActions = async () => {
        const { data } = await httpRequest({
            url: "/action",
            params: { type }
        });
        return data;
    };

    return <div key={type} className={styles.page}>
        <ProTable
            request={async (params, sorter, filter) => {
                return Promise.resolve({
                    data: await getActions(),
                    success: true
                });
            }}
            rowKey="id"
            pagination={false}
            search={false}
            bordered
            headerTitle={`${type}记录表`}
            columns={
                [
                    { title: "单号", dataIndex: "number", width: 120, sorter: false },
                    { title: "名称", dataIndex: "name", width: 150, sorter: false },
                    { title: "创建时间", dataIndex: "createdTime", valueType: "dateTime", width: 100, sorter: false },
                    { title: "操作类型", dataIndex: "type", width: 80, sorter: false },
                    {
                        title: "操作数量",
                        dataIndex: "quantity",
                        valueType: "number",
                        sorter: false,
                        width: 80,
                        render: (_, record) => (
                            <Space>
                                {
                                    <Tag color={type === "入库" ? "green" : "red"} >
                                        {record.quantity}
                                    </Tag>
                                }
                            </Space>
                        )
                    }
                ]
            }
        />
    </div>;
};
