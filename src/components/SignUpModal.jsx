import { Button, Modal, Checkbox, Form, Input } from 'antd';
import useStore from '../hooks/useStore';

const SignUpModal = () => {

        const {
            onFinishSingUpModal,
            onFinishFailedSingUpModal,
            handleCancelSingUpModal,
            handleSignUpModal,
            loading,
            opeSignUpModal} = useStore()


    return (
        <Modal
            centered
            open={opeSignUpModal}
            title="Sign Up"
            onCancel={handleCancelSingUpModal}
            footer={[
            <Button key="Cancel" onClick={handleCancelSingUpModal}>
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
                onFinish={onFinishSingUpModal}
                onFinishFailed={onFinishFailedSingUpModal}
                autoComplete="off"
            >

                <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                    required: true,
                    message: 'Please input your name!',
                    },
                ]}
                >
                <Input />
                </Form.Item>

                <Form.Item
                label="Last Name"
                name="last-name"
                rules={[
                    {
                    required: true,
                    message: 'Please input your last name!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                
                <Form.Item
                label="Phone Number"
                name="phone-number"

                >
                <Input />
                </Form.Item>
                
                <Form.Item
                label="User Name"
                name="user-name"
                rules={[
                    {
                    required: true,
                    message: 'Please input your user name!',
                    },
                ]}
                >
                <Input />
                </Form.Item>
                
                <Form.Item
                label="email"
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
                <button  className='underline text-sky-500' onClick={handleSignUpModal}>
                Do not have an account? Sign Up
                </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SignUpModal