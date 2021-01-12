import Head from "next/head";
import { useEffect, useState } from "react";
import CustomButton from "../components/custom-button/custom-button.component";
import CustomInput from "../components/custom-input/custom-input.component";
import Navbar from "../components/navbar/navbar.component";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        console.log(email);
    }, [email]);

    return (
        <div>
            <Head>
                <title>Sign Up | Ency</title>
            </Head>
            <div
                style={{ backgroundImage: "url('./home/landing-page.svg')" }}
                className="bg-no-repeat h-screen bg-cover bg-center"
            >
                <Navbar />
                <div className="mt-10 w-full flex justify-center">
                    <div className="max-w-6xl w-full mx-10">
                        <div className="max-w-xs w-full">
                            <h1 className="text-4xl font-bold pb-2">Sign Up</h1>
                            <p className="text-gray-500">Create an account</p>

                            <div className="mt-8">
                                <CustomInput
                                    label="Your Email"
                                    type="email"
                                    name="email"
                                    placeHolder="Enter Your Email"
                                    onChange={setEmail}
                                    formValidate={(value) => {
                                        if (!value) return "Invalid Value enterd";
                                        if (!value.includes("@"))
                                            return "Not a valid email. You are missing an @ character";
                                    }}
                                />
                                <CustomInput
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeHolder="Enter Your Password"
                                    onChange={setPassword}
                                    formValidate={(value) => {
                                        if (!value) return "Invalid Value Entered";
                                        if (value.length < 6)
                                            return "Password should be atleast 6 characters or longer";
                                        if (!/[0-9]/.test(value))
                                            return "Password should contain atleast one number";
                                        if (!/[a-z]/i.test(value))
                                            return "Password should contain atleast one Alphabet";
                                    }}
                                />
                                <CustomInput
                                    label="Confirm Password"
                                    type="password"
                                    name="confirm-password"
                                    placeHolder="Enter Your Password Again"
                                    onChange={setConfirmPassword}
                                    formValidate={(value) => {
                                        if (!value) return "Please Enter Your Password Again";
                                        if (value !== password) return "Password Doesn't Match";
                                    }}
                                />

                                <CustomButton className="w-full">Sign Up</CustomButton>

                                <p className="text-center w-full my-4">or</p>

                                <CustomButton
                                    className="w-full bg-white mb-10"
                                    bgColor="white"
                                    color="primary"
                                    transitionBgColor="primary"
                                    transitionColor="white"
                                >
                                    <span>
                                        <img src="./other/google-icon.svg" alt="googles logo" width="24px" className="inline-block mr-3 bg-white p-0.5 rounded" />
                    Sign Up With Google
                  </span>
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
