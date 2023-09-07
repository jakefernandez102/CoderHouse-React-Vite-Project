import { Button, Modal, Checkbox, Form, Input } from 'antd';
import useAuth from '../hooks/useAuth';
import useStore from '../hooks/useStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const SignInModal = () => {

    
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {getUser,getUserWhenLoggedIn} = useAuth()
    const navigate = useNavigate()
    const {
        onFinish,
        handleCancel,
        handleSignUpModal,
        loading,
        openSignInModal} = useStore()

    const handleSubmit= async (e)=>{
        e.preventDefault()
        await getUser({email,password})
        const userFB = await getUserWhenLoggedIn(email)
        localStorage.setItem('userLogged',JSON.stringify(userFB))
        setTimeout(() => {
            navigate(`/user-settings/${userFB.id}`)
        }, 500);
    }
    

    return (
        <>
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
                    autoComplete="off"
                    onSubmitCapture={handleSubmit}
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
                    <Input 
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
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
                    <Input.Password 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
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
                        Sign In
                    </Button> 
                    <button  className='underline text-sky-500 ' type='button'  onClick={handleSignUpModal}>
                    Do not have an account? Sign Up
                    </button>
                    </Form.Item>
                </Form>
                <p>User test:</p>
                <p>email: jake@correo.com</p>
                <p>password: 1234567</p>
            </Modal>
        </>
    )
}

export default SignInModal