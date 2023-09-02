/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app, db} from "../data/firebase";
import { and, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext();



const AuthProvider = ({children}) => {

    const [currentUser,setCurrentUser]=useState(typeof window !== 'undefined' ? JSON.parse( localStorage.getItem( 'userLogged' ) ) ?? null : null)
    const auth = getAuth( app );

    const createUser = async (user)=>{
        
        try {
            const collectionRef = collection(db,'users')
            const docRef = doc(collectionRef,user.id)
            await setDoc(docRef,user)
            await createUserWithEmailAndPassword( auth, user.email, user.password );
            await signInWithEmailAndPassword(auth,user.email,user.password)
            setCurrentUser(await getUserWhenLoggedIn(user.email))
        } catch (error) {
            console.log(error)
        }


    }
    const getUser = async ({email,password})=>{
        
        try {
            const collectionRef = collection(db, 'users')
            const qry = query(collectionRef,and(where('email','==',email),where('password','==',password)))
            const qrySnapshot = await getDocs(qry)
            const user = qrySnapshot.docs.map(doc =>doc.data() )[0]
            console.log(user)
            if(user){
                setCurrentUser( await getUserWhenLoggedIn(user.email))
                console.log(currentUser)
                await signInWithEmailAndPassword(auth,user?.email,user?.password)

            }else{
                toast.error('User does not exist', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getUserWhenLoggedIn = async (email)=>{
        console.log(email)
        try {
            const collectionRef = collection(db, 'users')
            const qry = query(collectionRef,where('email','==',email))
            const qrySnapshot = await getDocs(qry)
            const user = qrySnapshot.docs.map(doc =>doc.data() )[0]
            if(user){
                return user
            }else{
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    const signOutUser = async () => {
        await signOut(auth)
        setCurrentUser(null)
        localStorage.clear()
        window.location.href ='/'
    }
    return (
    <AuthContext.Provider
        value={{
            auth,
            createUser,
            getUser,
            signOutUser,
            getUserWhenLoggedIn,
            currentUser,
            setCurrentUser
        }}
    >
        {children}
    </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext