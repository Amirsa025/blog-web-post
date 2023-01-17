import React from 'react';
import {withFormik} from "formik";
import InnerLoginForm from "./Inner-login-form";
import {LoginFormProps, LoginFormValues} from "./login-Form";
import Router from "next/router";
import * as yup from 'yup';
import {storageKeys} from "../../constant/storage-key";

import {authenticateService} from "../../helper/authenticateService";
let LoginSchema:any =yup.object().shape({
    userName:yup.string().required('لطفا در در وارد کردن نام کاربری خود دقت کنید').min(4,'لطفا در در وارد کردن نام کاربری خود دقت کنید'),
    password:yup.string().required('لطفا در در وارد کردن رمز عبور خود دقت کنید').min(4,'لطفا در در وارد کردن رمز عبور خود دقت کنید')
});
const setToStorage = (key:any,value:any):void => {
    if(typeof window !== 'undefined'){
        return window.localStorage.setItem(key,value)
    }
}
const LoginForm = withFormik<LoginFormProps,LoginFormValues>({
    mapPropsToValues : (props) => {
        return {
            userName:props.userName?? '',
            password :props.password?? '',
            setIsOpen :props.setIsOpen??'',
            open :props.open??'',
        }
    },
    handleSubmit : async (values,{props}) => {
        try {
            const response = await authenticateService.authenticate(values)
            console.log(JSON.stringify(response?.token?.accessToken))
                setToStorage(storageKeys.loginInfo,response?.fullName)
                setToStorage(storageKeys.token,response?.token?.accessToken)
                setToStorage(storageKeys.refreshToken,response?.token?.accessToken  )
            await Router.push('/blog')
            props.setIsOpen(!props.open)
        }catch (e) {
          alert(e)
        }
    },
    validationSchema:LoginSchema
})(InnerLoginForm)

export default LoginForm;
