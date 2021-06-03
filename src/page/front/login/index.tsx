import {Link, useNavigate} from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useAuth} from "../../../context/auth-context";
export const Login = () => {

    const { login } = useAuth();
    const navigate = useNavigate();


    return (
        <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={(values) => {login(values).then(() => {navigate(`/back`, { replace: true });});}}
        >
            <Form.Item
                name="account"
                rules={[
                    { required: true, message: '请输入您的账号!' },
                    { type: 'string', min: 8, message: '账号长度不小于8!' }
                ]}
                hasFeedback
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="账号"
                    maxLength={32}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    { required: true, message: '请输入您的密码!' },
                    { type: 'string', min: 8, message: '密码长度不小于8!' }
                ]}
                hasFeedback
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                    maxLength={32}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>保持登录状态</Checkbox>
                </Form.Item>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                Or <Link to="/front/register">立即注册</Link>
            </Form.Item>
        </Form>
    );
}