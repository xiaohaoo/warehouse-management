import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
    const navigator = useNavigate();
    return <Result
        status="404"
        title="404"
        subTitle="当前地址无效哦，点击返回主页面"
        extra={<Button type="primary" onClick={() => {
            navigator("/product", { replace: true });
        }}> 返回主页</Button>}
    />;
};
