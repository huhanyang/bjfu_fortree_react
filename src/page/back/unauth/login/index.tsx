import {useAuth} from "../../../../context/auth-context";
import {useAsync} from "../../../../utils/use-async";
import {Divider, Form, Input, message} from "antd";
import {CardTitle, LongButton} from "../index";
import {Link} from "react-router-dom";
import {LoginRequestParams} from "../../../../auth-provider";
import {useNavigate} from "react-router";


export const Login = () => {
    const {login} = useAuth();
    const {run, isLoading} = useAsync(undefined, {throwOnError: true});
    const navigate = useNavigate();

    const handleSubmit = async (values: LoginRequestParams) => {
        try {
            await run(login(values)).then(() => {
                navigate("/back", {replace: true});
            });
        } catch (e) {
            message.error(e.message);
        }
    };

    return (
        <>
            <CardTitle>请登录</CardTitle>
            <Form onFinish={handleSubmit}>
                <Form.Item
                    name={"account"}
                    rules={[{required: true, message: "请输入账号"}]}
                >
                    <Input placeholder={"账号"} type="text" maxLength={32}/>
                </Form.Item>
                <Form.Item
                    name={"password"}
                    rules={[{required: true, message: "请输入密码"}]}
                >
                    <Input.Password placeholder={"密码"} maxLength={32}/>
                </Form.Item>
                <Form.Item>
                    <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
                        登录
                    </LongButton>
                </Form.Item>
            </Form>
            <Divider/>
            <Link style={{float: "left"}} to={"/back/register"}>
                去注册
            </Link>
            <Link style={{float: "right"}} to={"/front"}>
                去首页
            </Link>
        </>
    );
};
