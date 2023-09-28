/* eslint-disable valid-typeof */
import { useEffect, useState } from "react";
import { TECollapse, TERipple } from "tw-elements-react";
import { changePassword, storage, updateUser, uploadUserImage } from "../data/firebase.js";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {

    const userLS= typeof window !== undefined ? JSON.parse(localStorage.getItem('userLogged')) ?? [] : []
    
    const [name,setName]=useState(userLS.name)
    const [lastName,setLastName]=useState(userLS.lastName)
    const [phoneNumber,setPhoneNumber]=useState(userLS.phoneNumber)
    const [userName,setUserName]=useState(userLS.userName)
    const [email,setEmail]=useState(userLS.email)
    
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword,setNewPassword]=useState('')
    
    const [imageUploaded,setImageUploaded]=useState({name:'../img/user-profile.png'})

    const {setCurrentUser,handleSetImageUrl,imageURL}=useAuth()

    const navigate = useNavigate()

    useEffect(()=>{
        if(userLS){
            handleSetImageUrl({name:userLS.image})
            return
        }
        const actualImage = JSON.parse(localStorage.getItem('actualImage')) === null ? {name:'../img/user-profile.png'} : JSON.parse(localStorage.getItem('actualImage')) 
        handleSetImageUrl(actualImage)
    
    },[imageUploaded])

    const loadImage = async (actualImage) =>{

        if(actualImage.name !== '../img/user-profile.png' && actualImage.name !== ''){

            const imageRef = ref(storage,`images/users_image/${actualImage.name}`)
            getDownloadURL(imageRef).then(response =>{
                assignUrl( response)
            })
            }
        }

    const assignUrl= (url)=>{
        localStorage.setItem('actualImage',JSON.stringify({name:url}))
        userLS.image = url
        updateUser(userLS)
        setCurrentUser(userLS)
        localStorage.setItem('userLogged', JSON.stringify(userLS))
        handleSetImageUrl({name:url})
        navigate(`/user-settings/${userLS.id}`)
    }

    
    const [show,setShow]=useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        const userUpdated = {
                id: userLS.id, 
                name,
                lastName,
                phoneNumber,
                image: userLS.image,
                userName,
                email,
                password: userLS.password
            }

        updateUser(userUpdated)
    }
    const handleChangePassword = () =>{
        setShow(!show)
    }
    const handleSubmitChangePassword= (e)=>{
        e.preventDefault()

        if(oldPassword === userLS.password){
            userLS.password = newPassword;

            changePassword(userLS)
        }else{
        toast.error( 'Old Password does not match with your current password.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        } );
        }
    }

    const handleFileChange= async (e)=>{
        if(imageUploaded ==  null)return;
        await uploadUserImage(e.target.files[0])

        loadImage(e.target.files[0])
    }
  return (
    <div>
        <h1 className='text-5xl p-5 font-black text-sky-900'>User Settings</h1>

        <div>

            <div className='p-10 '>
            <h2 className='bg-slate-300 rounded-lg text-3xl p-5 font-black text-sky-900'>Account Info</h2>
                <form
                    className='flex flex-col gap-5 p-10 bg-slate-50 shadow-xl'
                    onSubmit={handleSubmit}
                >
                    <div>
                        
                            {imageURL.name === '../img/user-profile.png' &&
                            
                                (
                                    <img className='rounded-full overflow-hidden' width={150} src="../img/user-profile.png" alt="user profile image" />
                                )}
                            {imageURL.name !== '../img/user-profile.png' &&
                                (
                                    <img className='rounded-full overflow-hidden' width={150} src={imageURL.name}key={imageURL.name} alt="user profile image" />
                                )}
                        
                        <input 
                            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-100 dark:border-gray-50 dark:placeholder-gray-100' type="file" name='user-image' id='user-image'
                            onChange={(e)=>{
                                handleFileChange(e)
                                setImageUploaded(e.target.files[0])
                            }}    
                        />
                    </div>
                    <div className='flex gap-2 '>
                        <input 
                            className='block w-full py-2 border border-slate-300 px-1 ' type="text" name='name' id='name' placeholder='Name'
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <input 
                            className='block w-full py-2 border border-slate-300 px-1 ' type="text" name='last-name' id='last-name' placeholder='Last Name' 
                            value={lastName}
                            onChange={(e)=>setLastName(e.target.value)}
                            />
                    </div>
                    <div>
                        <input 
                            className='block w-full py-2 border border-slate-300 px-1 ' type="text" name='phone-number' id='phone-number' placeholder='Phone Number' 
                            value={phoneNumber}
                            onChange={(e)=>setPhoneNumber(e.target.value)}
                            />
                    </div>
                    <div>
                        <input 
                            className='block w-full py-2 border border-slate-300 px-1 ' type="text" name='user-name' id='user-name' placeholder='User Name' 
                            value={userName}
                            onChange={(e)=>setUserName(e.target.value)}
                            />
                    </div>
                    <div>
                        <input 
                            className='block w-full py-2 border border-slate-300 px-1 ' type="email" name='email' id='email' placeholder='Email' 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                    </div>
                    <div>
                        <TERipple rippleColor='light'>
                            <button
                                type='button'
                                className='text-sky-600 hover:underline'
                                onClick={handleChangePassword}

                                >
                                Change Password
                            </button>
                        </TERipple>
                    </div>
                    <button
                        type='submit'
                        className='bg-sky-600 uppercase font-bold rounded-sm hover:bg-sky-700 hover:shadow-lg text-white inline-block w-[50%] py-3 mx-auto'
                    >
                        Update User
                    </button>
                </form>
                <TECollapse show={show}>
                    <div className="" id="collapseExample" >
                        <form
                            className='flex flex-col gap-5 p-10 bg-slate-50 shadow-xl'
                            onSubmit={handleSubmitChangePassword}
                        >
                            <div>
                                <label 
                                    htmlFor="old-passwird"
                                >
                                    Old Password:
                                </label>
                                <input 
                                    type="password" 
                                    className='block w-full bg-slate-100 border border-gray-200 rounded-sm py-2'
                                    value={oldPassword}
                                    onChange={(e)=>setOldPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="new-passwird"
                                >
                                    New Password:
                                    </label>
                                <input type="password" 
                                    className='block w-full bg-slate-100 border border-gray-200 rounded-sm py-2'
                                    value={newPassword}
                                    onChange={(e)=>setNewPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type='submit'
                                 className='bg-sky-600 uppercase font-bold rounded-sm hover:bg-sky-700 hover:shadow-lg text-white inline-block w-[50%] py-3 mx-auto'
                            >   
                                Change Password
                            </button>
                        </form>
                    </div>
                </TECollapse>
            </div>
        </div>
    </div>
  )
}

export default UserSettings