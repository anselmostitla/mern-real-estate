import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from "axios";
import { updateSuccess, deleteUserSucces } from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("currentUser profile: ", currentUser);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  // const [file, setFile] = useState(undefined);
  const [progresspercent, setProgresspercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [errorUpdating, setErrorUpdating] = useState("");
  const [loading, setLoading] = useState(false);
  const [successUpdating, setSuccessUpdating] = useState(false);

  const handleFileUpload = (e) => {
    e.preventDefault();
    const file = e.target?.files[0];
    console.log("file:::: ", file);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file?.name;
    // const storageRef = ref(storage, fileName);
    // const uploadTask = uploadBytesResumable(storageRef, file);

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + " % done");
        setProgresspercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
        console.log(error)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // console.log("currentUser handle submit profile: ", currentUser)
      const res = await axios.put(
        `/api/v1/user/update/${currentUser._id}`,
        formData
      );
      console.log("res.data profile: ", res.data);
      dispatch(updateSuccess(res.data));
      setSuccessUpdating(true)
    } catch (error) {
      console.log("error: ", error);
      console.log("error.response: ", error.response);
      console.log("error.response.message: ", error.response.data.message);
      setErrorUpdating(error.response.data.message);
    }
    setLoading(false);
  };

  const handleDelete = async() => {
    try {
      const res = await axios.delete(`/api/v1/user/delete/${currentUser._id}`)
      if (res.status === 200) {
        dispatch(deleteUserSucces())
      }
      
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          onChange={(e) => handleFileUpload(e)}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error image upload(image must be less than 2mb)
            </span>
          ) : progresspercent > 0 && progresspercent < 100 ? (
            <span className="text-green-700">{`Uploading ${progresspercent}%`}</span>
          ) : progresspercent === 100 ? (
            <span className="text-green-700">{`Image successfully uploaded!`}</span>
          ) : (
            ""
          )}
        </p>
        <input
          className="border p-3 rounded-lg"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          onChange={handleChange}
          // {...register("username")}
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          onChange={handleChange}
          type="email"
          // {...register("email")}
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="password"
          id="password"
          onChange={handleChange}
          type="password"
          // {...register("password")}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "UPDATE"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign-out</span>
      </div>
      <p className="text-red-500 text-sm mt-5">{errorUpdating}</p>
      <p className="text-green-500 text-sm mt-5">
        {successUpdating? 'User updated successfully!':''}
      </p>
    </div>
  );
}
