import React from 'react';
import {Form} from "formik";
import Input from "../../Ui/Input";
import {ClipLoader} from "react-spinners";
interface  buttonProps {
    isSubmitting?:boolean
    isValid?:boolean
}
const InnerLoginForm:React.FC<buttonProps>= ({ isSubmitting ,isValid }) => {
    return (
        <Form className="w-full centers-element flex-col" >
            <Input iconName={"ri-user-line"} type="text" name={'userName'}  label={"نام کاربری"} placeholder={" نام کاربری خود را وارد کنید"}/>
            <div className = {"pt-[1.5rem]" }>
                <Input iconName={"ri-lock-line"}  name={'password'} label={"رمز عبور"} inputClassName={"text-red-400"} placeholder={"رمز عبور  خود را وارد کنید "}/>
            </div>
            <div className={" text-white py-[3rem]"}>
                <button className=" text-center hover:bg-green-200 bg-[#00C853] w-[394px] rounded-[1rem] h-[3.5rem]"   disabled={!isValid || isSubmitting}>
                    {!isSubmitting && "ورود"}
                    {/* eslint-disable-next-line react/jsx-no-undef */}
                    {isSubmitting &&  <ClipLoader size={20} color="#fffff" />}
                </button>
            </div>
        </Form>
    );
};
export default InnerLoginForm;
