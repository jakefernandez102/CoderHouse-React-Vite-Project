import { Button, Modal, Checkbox, Form, Input } from 'antd';
import useStore from '../hooks/useStore';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { generateNewID } from '../helpers/generateID.js';
import { useNavigate } from 'react-router-dom';

const SignUpModal = () => {

    const [name,setName]=useState('')
    const [lastName,setLastName]=useState('')
    const [phoneNumber,setPhoneNumber]=useState('')
    const [userName,setUserName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {auth,createUser,currentUser}=useAuth()

    const navigate = useNavigate()

    const {
        onFinishSingUpModal,
        handleCancelSingUpModal,
        handleSignInModal,
        loading,
        opeSignUpModal} = useStore()

    const handleSubmit=async()=>{
        if([name,lastName,userName,email,password].includes(''))return
        const id = generateNewID()
        await createUser({
            id,
            name,
            lastName,
            phoneNumber,
            userName,
            image:"../img/user-profile.png",
            email,
            password
        })
        if(auth.currentUser){
            setTimeout(() => {
                navigate(`/user-settings/${id}`)
            }, 2000);
        }
    }


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
                autoComplete="off"
                onSubmitCapture={handleSubmit}
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
                <Input 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
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
                <Input 
                    value={lastName}
                    onChange={(e)=>setLastName(e.target.value)}
                />
                </Form.Item>
                
                <Form.Item
                label="Phone Number"
                name="phone-number"

                >
                <Input 
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                />
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
                <Input 
                    value={userName}
                    onChange={(e)=>setUserName(e.target.value)}
                />
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
                    Submit
                </Button> 
                <button  className='underline text-sky-500' onClick={handleSignInModal}>
                Do you already have an account? Sign In
                </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SignUpModal