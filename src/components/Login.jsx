import React, { useState, useEffect } from "react";
import axios from "axios";

import { useGoogleLogin } from "@react-oauth/google";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { FcGoogle } from "react-icons/fc";
import { client } from "../client";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          const { name, id, picture } = res.data;
          const doc = {
            _id: id,
            _type: "user",
            userName: name,
            image: picture,
          };

          client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
          });
          console.log(res.data);

          setProfile(res.data);
        })
        .catch((err) => console.log("Huan" + err));
    }
  }, [user]);
  // const responseGoogle = (response) => {
  //   console.log(response);

  //   localStorage.setItem("user", JSON.stringify(response.profileObj));
  //   console.log(response.profileObj);
  // const { name, googleId, imageUrl } = response.profileObj;

  // const doc = {
  //   _id: googleId,
  //   _type: "user",
  //   userName: name,
  //   image: imageUrl,
  // };

  // client.createIfNotExists(doc).then(() => {
  //   navigate("/", { replace: true });
  // });
  // };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}
            >
              <FcGoogle className="mr-4" /> Sign in with google
            </button>
            {/* <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
