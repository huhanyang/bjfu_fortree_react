import {CardTitle, LongButton} from "../index";
import {Divider, Form, Input, message} from "antd";
import {Link} from "react-router-dom";
import {useAuth} from "../../../../context/auth-context";
import {useAsync} from "../../../../utils/use-async";
import {RegisterRequestParams} from "../../../../auth-provider";

export const Register = () => {

    const { register } = useAuth();
    const { run, isLoading } = useAsync(undefined, { throwOnError: true });

    const handleSubmit = async (values: RegisterRequestParams) => {
        try {
            await run(register(values));
        } catch (e) {
            message.error(e.message);
        }
    };

    return (
        <>
            <CardTitle>请注册</CardTitle>
            <Form
                initialValues={{organization: "无"}}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name={"account"}
                    rules={[{ required: true, message: "请输入账号" }, { type: 'string', min: 8, message: '账号长度不小于8!' }]}
                >
                    <Input placeholder={"账号"} type="text" maxLength={32} />
                </Form.Item>
                <Form.Item
                    name={"password"}
                    rules={[{ required: true, message: "请输入密码" }, { type: 'string', min: 8, message: '密码长度不小于8!' }]}
                >
                    <Input.Password placeholder={"密码"} maxLength={32} />
                </Form.Item>
                <Form.Item
                    name="confirm-password"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: '请再次确认密码!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('两次输入的密码不一致!');
                            },
                        })
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder={"确认密码"} maxLength={32} />
                </Form.Item>
                <Form.Item
                    name={"name"}
                    rules={[{ required: true, message: "请输入姓名" }]}
                >
                    <Input placeholder={"姓名"} type="text" maxLength={32} />
                </Form.Item>
                <Form.Item
                    name={"organization"}
                    rules={[{ required: true, message: "请输入组织" }]}
                >
                    <Input placeholder={"组织"} type="text" maxLength={32} />
                </Form.Item>

                <Form.Item>
                    <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
                        注册
                    </LongButton>
                </Form.Item>
            </Form>
            <Divider />
            <Link style={{ float: "left" }} to={"/back/login"}>
                去登录
            </Link>
            <Link style={{ float: "right" }} to={"/front"}>
                去首页
            </Link>
        </>
    );
};