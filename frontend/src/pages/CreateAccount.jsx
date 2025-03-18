import { Link } from "react-router-dom";
import {React, useState} from 'react';
import google from '../assets/images/loginPage/google.png';
import facebook from '../assets/images/loginPage/facebook.png';
import login0 from '../assets/images/loginPage/login0.png';
import login2 from '../assets/images/loginPage/login2.png';
import login3 from '../assets/images/loginPage/login3.png';
import login4 from '../assets/images/loginPage/login4.png';
import line from '../assets/images/loginPage/lineLogin.png';
import line1 from '../assets/images/loginPage/lineLogin.png';
import LoginButton from "../component/Login.jsx";
import Loader from "../component/Loading.jsx";


export const SignInPage = () => {
    let name = "Name";
    let email = "Email";
    let pass = "Password";
    const [loading, setLoading] = useState(false);

    const handleCreateAccount = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Redirect or perform other actions here
        }, 2000);
    };
    return (
        <div className="bg-white flex flex-row justify-center w-full h-screen">
            <div className="bg-white w-full h-full relative overflow-auto">
                <div className="absolute w-[295px] h-[19px] top-[803px] left-[227px]">
                    <div className="absolute top-0 left-0 [font-family:'Inter-Medium',Helvetica] font-medium text-black text-base tracking-[1.60px] leading-[normal] whitespace-nowrap">
                        Already have an account?
                    </div>

                    <Link to="/login" className="absolute top-0 left-[242px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#6b6bf9] text-base tracking-[1.60px] leading-[normal] whitespace-nowrap">
                        Login
                    </Link>
                </div>
                <div className="absolute w-[388px] h-[33px] top-[339px] left-[159px]">
                    <label className="absolute top-0 left-1 opacity-50 [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-base tracking-[1.60px] leading-[normal] whitespace-nowrap" htmlFor="name">
                        <input
                            id="name"
                            type="text"
                            className="absolute w-[386px] h-5 top-[15px] left-0 border-b-2 border-gray-300 focus:outline-none focus:border-black"
                            placeholder={name}
                            onChange={(e) => name = e.target.value}
                        />
                    </label>
                </div>

                <div className="absolute w-[388px] h-[33px] top-[427px] left-[159px]">
                    <label className="absolute top-0 left-1 opacity-50 [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-base tracking-[1.60px] leading-[normal] whitespace-nowrap" htmlFor="email">
                        <input
                            id="email"
                            type="email"
                            className="absolute w-[386px] h-5 top-[15px] left-0 border-b-2 border-gray-300 focus:outline-none focus:border-black"
                            placeholder={email}
                            onChange={(e) => email = e.target.value}
                        />
                    </label>
                </div>

                <div className="absolute w-[388px] h-8 top-[515px] left-[159px]">
                    <label className="absolute top-0 left-1 opacity-50 [font-family:'Roboto-Bold',Helvetica] font-bold text-black text-base tracking-[1.60px] leading-[normal] whitespace-nowrap" htmlFor="password">
                        <input
                            id="password"
                            type="password"
                            className="absolute w-[386px] h-5 top-[15px] left-0 border-b-2 border-gray-300 focus:outline-none focus:border-black"
                            placeholder={pass}
                            onChange={(e) => pass = e.target.value}
                        />
                    </label>
                </div>

                <div className="inline-flex gap-5 top-[682px] left-[146px] items-center absolute">
                    <img
                        className="relative w-[100px] h-px object-cover"
                        alt="Line"
                        src={line1}
                    />

                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-base tracking-[1.60px] leading-[normal] whitespace-nowrap">
                        Or Create Account with
                    </div>

                    <img
                        className="relative w-[100px] h-px object-cover"
                        alt="Line"
                        src={line}
                    />

                </div>

                <div className="absolute w-[226px] h-10 top-[732px] left-[259px]">
                    <div className="absolute w-10 h-10 top-0 left-0 bg-white rounded-[20px] shadow-[0px_4px_4px_#00000040]">
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                            className="absolute w-[30px] h-[30px] top-[5px] left-[5px] object-cover"
                            alt="Image"
                            src={google}
                        />
                    </div>

                    <div className="absolute w-[42px] h-10 top-0 left-[92px]">
                        <div className="relative w-[50px] h-12 -left-1">
                            <div className="absolute w-10 h-10 top-0 left-[5px] bg-[#d9d9d9] rounded-[20px]" />

                            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                            <img
                                className="absolute w-[42px] h-10 top-0 left-0"
                                alt="Image"
                                src={facebook}
                            />
                        </div>
                    </div>
                </div>


                <div className="justify-center top-[570px] left-[157px] items-center absolute">
                    {loading ? (
                        <Loader />
                    ) : (
                        <button onClick={handleCreateAccount}>
                            <LoginButton type={"Create Account"} />
                        </button>
                    )}
                </div>

                <div className="top-[188px] left-[159px] [font-family:'Roboto-Bold',Helvetica] font-bold absolute text-black text-[28px] tracking-[0.28px] leading-[normal] whitespace-nowrap">
                    Welcome
                </div>

                <div className="absolute w-[229px] h-[41px] top-[25px] left-[25px]">
                    <div className="absolute w-[34px] h-[39px] top-0 left-0 bg-[100%_100%]">
                        <img
                            className="absolute w-[36px] h-[36px] top-[21px] left-0"
                            alt="Logo"
                            src={login2}
                        />
                    </div>

                    <div className="absolute top-6 left-12 [font-family:'Spartan-SemiBold',Helvetica] font-semibold text-black text-[28px] tracking-[0.28px] leading-[normal] whitespace-nowrap">
                        Zoho
                    </div>

                    <div className="top-6 left-[120px] opacity-50 [font-family:'Spartan-SemiBold',Helvetica] font-semibold absolute text-black text-[28px] tracking-[0.28px] leading-[normal] whitespace-nowrap">
                        Home
                    </div>
                </div>

                <p className="absolute top-[236px] left-[159px] opacity-50 [font-family:'Roboto-Medium',Helvetica] font-medium text-black text-2xl tracking-[0.24px] leading-[33px]">
                    You are one Step away from becoming <br />a member of Zoho Home
                </p>

                <div className="absolute w-[596px] h-[511px] top-[176px] left-[756px] bg-[100%_100%]">
                    <img
                        className="absolute w-[496px] h-[392px] top-[55px] left-[50px]"
                        alt="Happy bunch desk"
                        src={login0}
                    />
                </div>

                <img
                    className=" w-[283px] h-[129px] fixed right-0 bottom-0"
                    alt="Vector"
                    src={login4}
                />

                <img
                    className="w-[619px] h-[127px] left-[498px] absolute top-0"
                    alt="Vector"
                    src={login3}
                />

                <img
                    className="w-16 h-[261px] right-0 fixed top-0"
                    alt="Vector"
                    src={login4}
                />
            </div>
        </div>
    );
};

export default SignInPage;