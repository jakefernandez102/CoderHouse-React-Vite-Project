import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${ import.meta.env.VITE_FIREBASE_APIKEY }`,
    authDomain: `${ import.meta.env.VITE_FIREBASE_AUTHDOMAIN }`,
    projectId: `${ import.meta.env.VITE_FIREBASE_PROJECTID }`,
    storageBucket: `${ import.meta.env.VITE_FIREBASE_STORAGEBUCKET }`,
    messagingSenderId: `${ import.meta.env.VITE_FIREBASE_MESSAGINSENDERID }`,
    appId: `${ import.meta.env.VITE_FIREBASE_APPID }`,
}; import { generateNewID } from '../helpers/generateID.js';
import { toast } from "react-toastify";


// Initialize Firebase
export const app = initializeApp( firebaseConfig );
export const db = getFirestore( app );
export const storage = getStorage( app );

export async function getProducts ()
{
    const docsRef = collection( db, 'products' );
    const snapshot = await getDocs( docsRef );
    return snapshot.docs.map( doc => doc.data() );
}

export async function getCategoriesFS ()
{
    const collectionRef = collection( db, 'products' );
    const snapshot = await getDocs( collectionRef );
    const users = snapshot.docs.map( doc => doc.data() );

    const categories = users.map( user => user.category );
    const uniqueCategories = [...new Set( categories )];
    return uniqueCategories;
}

export async function getCategory ( category )
{
    const docsRef = collection( db, 'products' );
    const qry = query( docsRef, where( 'category', '==', category ) );
    const qrySnapshot = await getDocs( qry );
    return qrySnapshot.docs.map( doc => doc.data() );
}

export async function userExists ( id )
{
    const docRef = doc( db, 'users', id );
    const user = await getDoc( docRef );
    return user.exists();
}

export async function addOrderToUserCart ( productsInCart, user )
{
    console.log( user );
    const collectionRef = collection( db, 'users' );
    const qry = query( collectionRef, where( 'id', '==', user.id ) );
    const qrySnapshot = await getDocs( qry );
    const _user = qrySnapshot.docs.map( doc => doc.data() )[0];

    if ( _user?.orders !== undefined )
    {
        console.log( 'modifica' );
        console.log( _user.orders );
        let newOrder = [{ id: generateNewID(), order: [...productsInCart], createdAt: new Date( Date.now() ).toLocaleDateString( 'en-US', { year: 'numeric', day: 'numeric', month: 'long' } ) }];
        _user.orders = [..._user.orders, ...newOrder];
        const docRef = doc( collectionRef, user.id );
        setDoc( docRef, _user );
        setTimeout( () =>
        {
            window.location.href = `/bill/${ _user.id }-${ _user.orders[_user.orders.length - 1].id }`;
        }, 3000 );
    } else
    {
        console.log( _user.orders );
        console.log( 'nueva' );
        _user.orders = [{ id: generateNewID(), order: [...productsInCart], createdAt: new Date( Date.now() ).toLocaleDateString( 'en-US', { year: 'numeric', day: 'numeric', month: 'long' } ) }];
        const docRef = doc( collectionRef, user.id );
        setDoc( docRef, _user );
        setTimeout( () =>
        {
            window.location.href = `/bill/${ _user.id }-${ _user.orders[`${ _user.orders.length - 1 }`].id }`;
        }, 3000 );
    }

}

export async function getLastOrder ( orderId )
{
    const userId = orderId.split( '-' )[0];
    const realOrderId = orderId.split( '-' )[1];

    const userDocRef = doc( db, 'users', userId );
    const snapshot = await getDoc( userDocRef );
    const user = snapshot.data();
    console.log( user.orders );

    return user.orders;


}

export async function changePassword ( user )
{
    const docRef = doc( db, 'users', user.id );
    await setDoc( docRef, user );
    localStorage.setItem( 'userLogged', JSON.stringify( user ) );

    toast.success( 'Password changed successfully!!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    } );
}
export async function updateUser ( user )
{
    const docRef = doc( db, 'users', user.id );
    await setDoc( docRef, user );
    localStorage.setItem( 'userLogged', JSON.stringify( user ) );

    toast.success( 'User modified successfully!!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    } );
}

export async function uploadUserImage ( imageToUpload )
{
    console.log( imageToUpload );
    const imageRef = ref( storage, `images/users_image/${ imageToUpload.name }` );
    await uploadBytes( imageRef, imageToUpload );

    getDownloadURL( imageRef ).then( response =>
    {
        localStorage.setItem( 'actualImage', JSON.stringify( { name: response } ) );
    } );
    toast.success( 'Image changed successfully!!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    } );
}