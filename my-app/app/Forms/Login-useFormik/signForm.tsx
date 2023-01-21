import React from 'react';
import {useFormik} from "formik";
import * as yup from 'yup';
import {ClipLoader} from "react-spinners";
import {Button, TextField} from "@mui/material";
import useSignupMutation from "./useSignupMutation";
import Cookies from "universal-cookie";
import {storageKeys} from "../../constant/storage-key";
import Router from "next/router";

let LoginSchema: any = yup.object().shape({
    userName: yup.string().required('لطفا در در وارد کردن نام کاربری خود دقت کنید').min(4, 'لطفا در در وارد کردن نام کاربری خود دقت کنید'),
    password: yup.string().required('لطفا در در وارد کردن رمز عبور خود دقت کنید').min(4, 'لطفا در در وارد کردن رمز عبور خود دقت کنید')
});

interface  buttonProps {
    isSubmitting?:boolean
    isValid?:boolean,
    setIsOpen ?:any
    open ?:any
}
const setToStorage = (key: any, value: any): void => {
    if (typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value)
    }
}
const StoreTokenLogin = (token: string, refreshToken?: string): void => {
    const cookies = new Cookies();
    cookies.set('post-token', token, {
        path: '/',
        maxAge: (3600)
    });
    cookies.set('post-refresh-token', refreshToken, {
        path: '/',
        maxAge: (2 * 3600)
    });
}
const SignForm:React.FC<buttonProps> = ({isSubmitting,open,setIsOpen}) => {
    const { mutate ,isSuccess,isError,isLoading} = useSignupMutation();
    const [loading, setLoading] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            userName: "",
            password: ""
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            // @ts-ignore
            mutate(values, {
                onSuccess: (response) => {
                    StoreTokenLogin(response?.token?.accessToken, response?.token?.refreshToken)
                    setToStorage(storageKeys.loginInfo,response?.fullName)
                        setTimeout(() => {
                            setLoading(true);
                            setIsOpen(!open)
                        },2000)
                    Router.push('/blog').then()
                },
                onError: (response) => {
                    setLoading(true);
                    console.log(response);
                    setLoading(false);
                }
            });

        }
    });
    return (
        <>
            {isSuccess && <p className="centers-element text-green-400">با موفقیت وارد شدید!</p>}
            {isError && <p className="centers-element text-red-400">در ورود با خطا مواجه شدید</p>}
            <form onSubmit={formik.handleSubmit} className="w-full centers-element flex-col">
                    <div className="flex flex-col  ">
                        <label className={` pb-[8px] text-right font-normal text-[18px] `}>{"نام کاربری"}</label>
                        <div className="flex items-center border-[rgba(0, 0, 0, 0.2)] rounded-[0.5rem] border  w-[394px] ">
                            <i className={`ri-user-line text-[1.4rem] px-4 text-[#00000033]`}></i>
                            <input
                                id="userName"
                                placeholder={" نام کاربری خود را وارد کنید"}
                                className={"w-[394px]  font-[IRANYekan] text-[#929294] px-4 h-[56px]  focus:outline-0"}
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.userName && Boolean(formik.errors.userName)}
                        </div>
                        <p className="text-red-400 text-right py-2">{formik.errors.password}</p>
                    </div>
                <div className = {"pt-[1.5rem]" }>
                    <div  className="flex flex-col  ">
                        <label className={` pb-[8px] text-right font-normal text-[18px] `}>{"رمز عبور"}</label>
                        <div className="flex items-center border-[rgba(0, 0, 0, 0.2)] rounded-[0.5rem] border  w-[394px] ">
                            <i className={`ri-lock-line text-[1.4rem] px-4 text-[#00000033]`}></i>
                            <input
                                id="password"
                                placeholder={"رمز عبور  خود را وارد کنید "}
                                className={"w-[394px]  font-[IRANYekan] text-[#929294] px-4 h-[56px]  focus:outline-0"}
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.userName && Boolean(formik.errors.userName)}
                        </div>
                              <p className="text-red-400 py-2 text-right">{formik.errors.password}</p>
                    </div>
                </div>
                <div className={" text-white py-[3rem] "}>
                    <Button color="primary" className="font-[IRANYekan] text-center hover:bg-green-200 bg-[#00C853] w-[394px] rounded-[1rem] h-[3.5rem]"  disabled={loading}  variant="contained" fullWidth type="submit">
                        {!isSubmitting && "ورود"}
                        {isLoading && <div className="px-4 flex items-center">
                            <ClipLoader size={20}  color="#fffff" />
                        </div>}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default SignForm;
