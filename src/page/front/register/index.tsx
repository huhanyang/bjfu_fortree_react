import {useAuth} from "../../../context/auth-context";
import {useNavigate} from "react-router-dom";
import { Form, Input, Button } from 'antd';


export const Register = () => {

    const { register } = useAuth();
    const navigate = useNavigate();

    return (
        <Form
            name="register"
            className="register-form"
            onFinish={(values) => {register(values).then(() => {navigate(`/back`, { replace: true });});}}
        >
            <Form.Item
                name="account"
                label="账号"
                rules={[
                    { required: true, message: '请输入您的账号!' },
                    { type: 'string', min: 8, message: '账号长度不小于8!' }
                ]}
                hasFeedback
            >
                <Input maxLength={32} />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    { required: true, message: '请输入您的密码!' },
                    { type: 'string', min: 8, message: '密码长度不小于8!' }
                ]}
                hasFeedback
            >
                <Input.Password maxLength={32} />
            </Form.Item>
            <Form.Item
                name="confirm-password"
                label="再次确认密码"
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
                <Input.Password maxLength={32} />
            </Form.Item>
            <Form.Item
                name="name"
                label="姓名"
                rules={[
                    { required: true, message: '请输入您的姓名!' }
                ]}
                hasFeedback
            >
                <Input maxLength={32} />
            </Form.Item>
            <Form.Item
                name="organization"
                label="组织"
                rules={[
                    { required: true, message: '请输入您所属的组织!' }
                ]}
                hasFeedback
            >
                <Input maxLength={32} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    注册
                </Button>
            </Form.Item>
        </Form>
    );
}