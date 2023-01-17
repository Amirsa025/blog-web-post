import React from 'react';
import {ErrorMessage, Field} from "formik";
interface InputProps {
    label?:string,
    inputValue ?:string,
    type ? : string,
    placeholder ? : string,
    name:string,
    inputClassName?:string,
    labelClassName?:string,
    iconName ? : string,
}
const Input:React.FC<InputProps> = ({label,type,placeholder,name,inputClassName,labelClassName,iconName}) => {

    return (
        <>
           <div className="flex flex-col  ">
               <label className={`${labelClassName} pb-[8px] text-right font-normal text-[18px] `}>{label}</label>
                <div className={`flex items-center border-[rgba(0, 0, 0, 0.2)] rounded-[0.5rem] border  w-[394px] `}>
                    <i className={`${iconName} text-[1.4rem] px-4 text-[#00000033]`}></i>
                    <Field type={type} placeholder={placeholder} name={name} className={` w-[394px]  text-[#929294] px-4 h-[56px]  focus:outline-0 ` } ></Field>
                </div>
               <div className="text-red-400 text-right text-[12px] py-1">
                   <ErrorMessage name={name}  />
               </div>
           </div>
        </>
    );
};

export default Input
