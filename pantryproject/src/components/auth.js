import {auth, googleProvider} from "../configs/firebaseConfig";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";


export const Auth = () =>{

    console.log(auth?.currentUser?.photoURL);

    const siginInWithGoole = async () => {
        try{
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        };
    }

    const logout = async () => {
        try{
            await signOut(auth);
        } catch (err) {
            console.error(err);
        };
    }

    return(
        <div>

            <button onClick={siginInWithGoole}> Sign in With Google</button>
            <button onClick={logout}>Logout</button>
        </div>
    )
}