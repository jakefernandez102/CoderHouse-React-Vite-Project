import { Button, Modal, Checkbox, Form, Input } from 'antd';
import useStore from '../hooks/useStore';

const SignInModal = () => {

        const {
            onFinish,
            onFinishFailed,
            handleCancel,
            handleSignUpModal,
            loading,
            openSignInModal} = useStore()



    return (
        <Modal
            centered
            open={openSignInModal}
            title="Sign In"
            onCancel={handleCancel}
            footer={[
            <Button key="Cancel" onClick={handleCancel}>
                Cancel
            </Button>,
            ]}
        >
            <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                    required: true,
                    message: 'Please input your email!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                ]}
                >
                <Input.Password />
                </Form.Item>

                <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button className='bg-sky-500 mr-5' type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button> 
                <button  className='underline text-sky-500 ' type='button'  onClick={handleSignUpModal}>
                Do not have an account? Sign Up
                </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SignInModal