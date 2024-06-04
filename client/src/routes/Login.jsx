import { useState, useEffect, useRef } from "react";
import TextField from "../components/TextField";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SignIn, SignUp } from "../api";
import toast from "react-hot-toast";
import { signUpSchema, loginSchema } from "../utils";
import useUserStore from "../hooks/useUserStore";
import { getUser } from "../api";
import { useAnimate } from "framer-motion";
import joi from "joi";
import { UserRound, Pencil } from "lucide-react";

export default function Login() {
  const [agreed, setAgreed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [scope, animate] = useAnimate();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [disabled, setDisabled] = useState(false);
  let cloudinaryRef = useRef();
  let uploadWidgetRef = useRef();
  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    serverError: "",
  });
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePicture: { url: "" },
  });

  const handleAgreedChange = () => {
    setAgreed((prev) => !prev);
  };
  const handleUserDataChange = (event) => {
    setValidationError((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleError = (err) => {
    if (!err.response || err.code === "ERR_NETWORK") {
      toast.error(err.message);
      toast.error("Server Unavailable");
    } else if (err.response.status === 500) {
      toast.error("Internal Server Error. Please try again later");
    } else if (err.response?.data?.error) {
      switch (err.response.data.error) {
        case "USER_ALREADY_EXISTS":
          setValidationError((prev) => ({
            ...prev,
            serverError: "User already exists with this email",
          }));
          break;
        case "USER_NOT_FOUND":
          setValidationError((prev) => ({
            ...prev,
            serverError: "No user exists with this email",
          }));
          break;
        case "INCORRECT_EMAIL_OR_PASSWORD":
          setValidationError((prev) => ({
            ...prev,
            serverError: "Incorrect email or password",
          }));
          break;

        default:
          toast.error("Oops! Something went wrong. Please try again");
          break;
      }
    } else {
      toast.error("Oops! Something went wrong. Please try again");
    }
  };

  const handleValidationError = (err) => {
    switch (err.details[0].context.key) {
      case "name":
        setValidationError((prev) => ({
          ...prev,
          name: "Name must be a string",
        }));
        break;
      case "email":
        setValidationError((prev) => ({
          ...prev,
          email: "Email must be a valid email address",
        }));
        break;
      case "password":
        setValidationError((prev) => ({
          ...prev,
          password: err.message,
        }));
        break;
      case "profilePicture":
        setValidationError((prev) => ({
          ...prev,
          serverError: "Profile Picuture is required",
        }));
        break;
      case "url":
        setValidationError((prev) => ({
          ...prev,
          serverError: "Profile Picuture is required",
        }));
        break;

      default:
        setValidationError((prev) => ({
          ...prev,
          confirmPassword: err.message,
        }));
        break;
    }
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      let err = null;

      // Validate form data based on login or signup
      if (login) {
        const { error } = loginSchema.validate(userData);
        err = error;
      } else {
        const { error } = signUpSchema.validate(userData);
        err = error;
      }

      // Check for password match in signup
      if (!login && !err && userData.confirmPassword !== userData.password) {
        err = {
          message: "Passwords do not match",
          details: [{ context: { key: "confirmPassword" } }],
        };
      }

      // If no validation errors, call respective API and handle success or error
      if (!err) {
        if (!login && agreed) {
          const data = await SignUp(userData);
          setUser(data);
          toast.success("Account created successfully");
          setLoading(false);
          animate(
            scope.current,
            {
              x: -466,
            },
            { ease: "easeOut", duration: 0.8 }
          );
        } else {
          const data = await SignIn(userData);
          setUser(data);
          toast.success("Successfully Logged In");
          setLoading(false);
          navigate("/");
        }
      } else {
        setLoading(false);
        handleValidationError(err);
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const handleOtpChange = async (event) => {
    try {
      if (event.target.value?.length === 4) {
        setCode(event.target.value);

        const { error } = joi.string().alphanum().validate(event.target.value);

        setLoading(true);
        if (!error) {
          setDisabled(true);
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 1000);
        } else {
          setLoading(false);
          setValidationError((prev) => ({ ...prev, otpError: "Invalid Code" }));
        }
      } else {
        setCode(event.target.value);
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
        navigate("/");
        toast.success("You are already logged in");
      })
      .catch((err) => {
        const codes = ["INVALID_JWT", "TOKEN_EXPIRED", "JWT_NOT_FOUND"];
        if (!codes.includes(err.response?.data?.error)) {
          handleError(err);
        }
      });
    cloudinaryRef.current = window.cloudinary;
    uploadWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dphpgb4hg",
        uploadPreset: "x4jdqunx",
        multiple: false,
      },
      (error, result) => {
        if (error) toast.error("Something went wrong. Please try again");
        else {
          if (result.event === "queues-end") {
            toast.success("Image uploaded successfully");
            setUserData((prev) => ({
              ...prev,
              profilePicture: {
                url: result.info.files[0].uploadInfo.secure_url,
              },
            }));
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    setUserData({
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      profilePicture: { url: "" },
    });
    if (location.pathname === "/user/sign-up") {
      setLogin(false);
    }
    if (location.pathname === "/user/login") {
      setLogin(true);
    }
  }, [location.pathname]);

  return (
    <div className="flex w-screen h-screen text-gray-300 bg-secondary-300 justify-center urbanist items-center">
      <div className="bg-secondary-200 border border-gray-800 max-w-[500px] p-16 rounded-md">
        <div className="overflow-hidden  w-full">
          <div ref={scope} className="flex items-center">
            <div id="login-signup" className="min-w-[370px]">
              <div className="mb-8 flex flex-col space-y-2">
                <h1 className="text-4xl font-bold w-full text-left text-primary">
                  {login ? "Login" : "Register"}
                </h1>
                <div className="text-m">
                  {login ? (
                    <>
                      <span>New to BrainOP?&nbsp;&nbsp;</span>
                      <Link
                        className="text-primary hover:underline"
                        to="/user/sign-up"
                      >
                        Create an account
                      </Link>
                    </>
                  ) : (
                    <>
                      <span>Already have an account?&nbsp;&nbsp;</span>
                      <Link
                        className="text-primary hover:underline"
                        to="/user/login"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="">Upload Profile Picture</label>
                <div className="w-full flex justify-center">
                  {!login && (
                    <div className="relative rounded-full overflow-hidden flex justify-center items-center border-4 border-primary">
                      {userData.profilePicture.url ? (
                        <img
                          src={userData.profilePicture?.url.replace(
                            "/upload",
                            `/upload/w_150`
                          )}
                          className=" w-20 h-20 object-cover"
                          alt="profile-pic"
                        />
                      ) : (
                        <>
                          <UserRound className="text-primary w-20 h-20" />
                        </>
                      )}
                      <Pencil
                        onClick={() => {
                          uploadWidgetRef.current.open();
                          setValidationError((prev) => ({
                            ...prev,
                            serverError: "",
                          }));
                        }}
                        className="absolute opacity-0 transition-all duration-600 hover:opacity-100 bg-[rgba(0,0,0,.2)]"
                      />
                    </div>
                  )}
                </div>
              </div>
              {validationError.serverError && (
                <p className="text-red-500 text-sm ">
                  {validationError.serverError}
                </p>
              )}
              <form className="flex flex-col" onSubmit={handleFormSubmit}>
                <div className="flex flex-col mb-8 space-y-4">
                  {!login && (
                    <TextField
                      label="Name"
                      name="name"
                      value={userData.name}
                      onChange={handleUserDataChange}
                      placeholder="Enter your name"
                      required
                    />
                  )}
                  {validationError.name && (
                    <p className="text-red-500 text-sm ">
                      {validationError.name}
                    </p>
                  )}
                  <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleUserDataChange}
                    placeholder="Enter email"
                    type="email"
                    required
                  />
                  {validationError.email && (
                    <p className="text-red-500 text-sm ">
                      {validationError.email}
                    </p>
                  )}
                  <TextField
                    label="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserDataChange}
                    placeholder="Enter password"
                    type="password"
                    required
                  />
                  {validationError.password && (
                    <p className={`text-red-500 text-sm `}>
                      {validationError.password}
                    </p>
                  )}
                  {!login && (
                    <>
                      <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        value={userData.repeatPassword}
                        onChange={handleUserDataChange}
                        placeholder="Repeat Password"
                        type="password"
                        required
                      />
                      {validationError.confirmPassword && (
                        <p className="text-red-500 text-sm ">
                          {validationError.confirmPassword}
                        </p>
                      )}
                      <div className="flex space-x-2">
                        <CheckBox
                          className="fill-primary"
                          checked={agreed}
                          required
                          onCheckedChange={handleAgreedChange}
                        />
                        <span>I agree to Terms & Conditions</span>
                      </div>
                    </>
                  )}
                </div>
                <Button loading={loading} className="bg-primary">
                  {login ? "Login" : "Create an Account"}
                </Button>
              </form>
            </div>
            <div
              id="verification"
              className="min-w-[370px] min-h-full ml-24 flex flex-col items-center space-y-6 "
            >
              <div className="spcae-y-2 flex flex-col justify-center space-y-16">
                <h2 className="text-center text-7xl text-primary">
                  Welcome to BrainOp
                </h2>
                <p className="text-center">
                  A welcome message with OTP for email verification is sent to{" "}
                  {user?.email} (Enter any 4 alphanumeric characters)
                </p>
              </div>

              <div className="flex mt-16 flex-col justify-center">
                <TextField
                  label="Enter OTP"
                  value={code}
                  disabled={disabled}
                  onChange={handleOtpChange}
                />
                {validationError.otpError && (
                  <p className="text-red-500 text-sm">
                    {validationError.otpError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
