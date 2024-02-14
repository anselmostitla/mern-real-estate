import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await axios.post("/api/v1/auth/google", {
        name: result.user.displayName,
        email: result.user.email, photo: result.user.photoURL
      });
      console.log("res: ", res)
      if (res){
        navigate('/')
        dispatch(signInSuccess(res.data))
      }
      
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
    </button>
  );
}
