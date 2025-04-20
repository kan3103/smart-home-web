import { Link, useNavigate } from "react-router-dom";
import { React, useState, useEffect } from "react";
import login2 from "../assets/images/loginPage/login2.png";
import login0 from "../assets/images/loginPage/login0.png";
import login3 from "../assets/images/loginPage/login3.png";
import login4 from "../assets/images/loginPage/login4.png";
import LoginButton from "../component/Login.jsx";
import Loader from "../component/Loading";
import LoadingOverlay from "../component/LoadingOverlay";
import { MYIP } from "../api/ip.js"; // Import MYIP from your api file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isLoggedIn, navigate]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("username", email);
            formData.append("password", password);

            const response = await fetch(`http://${MYIP}/token`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            localStorage.setItem("access_token", data.access_token); // Store token in localStorage
            console.log("Login successful, access_token saved",data.access_token);

            setIsLoggedIn(true); // Trigger useEffect to navigate
        } catch (error) {
            console.error("Error during login:", error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center">
            {loading && <LoadingOverlay />} {/* Hiển thị overlay khi đang tải */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl p-4">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center mb-4">
                        <img className="w-16 h-16 mb-2" alt="Logo" src={login2} />
                        <div className="text-2xl font-semibold">Zoho Home</div>
                    </div>
                    <p className="text-center text-lg opacity-50 mb-4">
                        You are one step away from becoming a member of Zoho Home
                    </p>
                    <div className="w-full">
                        <div className="mb-4">
                            <input
                                id="email"
                                type="email"
                                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black p-2"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                id="password"
                                type="password"
                                className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-black p-2"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center">
                            {loading ? <Loader /> : (
                                <button onClick={handleLogin}>
                                    <LoginButton type={"Login"}/>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <span className="text-base">Don't have an account?</span>
                        <Link to="" className="text-base text-[#6b6bf9] ml-2">Create Account</Link>
                    </div>
                </div>
                <div className="hidden md:flex items-center justify-center">
                    <img className="w-3/4" alt="Happy bunch desk" src={login0} />
                    <img className="w-[20vw] h-[10vh] fixed right-0 bottom-0" alt="Vector" src={login4} />
                    <img className="w-[40vw] h-[10vh] left-[30vw] fixed top-0" alt="Vector" src={login3} />
                    <img className="w-[10vw] h-[30vh] right-0 fixed top-0" alt="Vector" src={login4} />
                </div>
            </div>
        </div>
    );
};

export default Login;

