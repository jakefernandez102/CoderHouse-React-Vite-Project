/* eslint-disable valid-typeof */
/* eslint-disable react/prop-types */
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext,  useEffect,  useState } from "react";
import { app, db} from "../data/firebase";
import { and, collection, doc,  getDocs, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const AuthContext = createContext();



const AuthProvider = ({children}) => {
    const userLS= typeof window !== undefined ? JSON.parse(localStorage.getItem('userLogged')) ?? [] : []
    
    const [currentUser,setCurrentUser]=useState(typeof window !== 'undefined' ? JSON.parse( localStorage.getItem( 'userLogged' ) ) ?? null : null)
    
    const [imageURL,setImageURL] = useState({});

    const auth = getAuth( app );

    useEffect(()=>{
        if(userLS){
            handleSetImageUrl({name:userLS.image})
            return
        }
        
    },[auth])
    const createUser = async (user)=>{
        try {
            await createUserWithEmailAndPassword( auth, user.email, user.password );
            localStorage.setItem( 'userLogged', JSON.stringify( user ) );
            const collectionRef = collection(db,'users')
            const docRef = doc(collectionRef,user.id)
            await setDoc(docRef,user)
            await signInWithEmailAndPassword(auth,user.email,user.password)
            setCurrentUser(await getUserWhenLoggedIn(user.email))
        } catch (error) {
            console.log(error)
            switch (error.code) {
                case 'auth/email-already-in-use':
                    toast.error(`Email address ${user.email} already in use.`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'auth/invalid-email':
                    toast.error(`Email address ${user.email} is invalid.`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'auth/operation-not-allowed':
                    toast.error(`Error during sign up.`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'auth/weak-password':
                    toast.error('Password is not strong enough. Add additional characters including special characters and numbers.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                case 'auth/user-not-founnd':
                    toast.error('User not found.', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
                default:
                    toast.error(error.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    break;
        }
        }


    }
    const getUser = async ({email,password})=>{
        if(!auth)return
        try {
            const collectionRef = collection(db, 'users')
            const qry = query(collectionRef,and(where('email','==',email),where('password','==',password)))
            const qrySnapshot = await getDocs(qry)
            const user = qrySnapshot.docs.map(doc =>doc.data() )[0]
            if(user){
                setCurrentUser( await getUserWhenLoggedIn(user.email))
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
            console.error(error)
        }
    }
    const getUserWhenLoggedIn = async (email)=>{
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
            console.error(error)
        }
    }

    const signOutUser = async () => {
        await signOut(auth)
        setCurrentUser(null)
        localStorage.clear()
        window.location.href ='/'
    }

    const handleSetImageUrl = (url) =>{
        setImageURL(url)
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
            setCurrentUser,
            imageURL,
            handleSetImageUrl
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