import React from 'react';
import { Field} from "formik";
interface InputSearchProps {
    label?:string,
    inputValue ?:string,
    type ? : string,
    placeholder ? : string,
    name:string,
    inputClassName?:string,
    labelClassName?:string,
    iconName ? : string,
}
const SearchFiled:React.FC<InputSearchProps> = ({type,placeholder,name,inputClassName,iconName}) => {
    return (
        <>
            <div className="">
                <div className={`flex items-center border-[rgba(0, 0, 0, 0.2)] searchShadow lg:w-[47.5rem]  ${inputClassName}`}>
                    <i className={`${iconName} text-[1.4rem] px-4 text-[#7B7B7B]`}></i>
                    <Field type={type} placeholder={placeholder} name={name} className={`w-[25rem]  lg:w-[47.5rem] text-[#929294] px-4 h-[56px]  focus:outline-0 ` } ></Field>
                </div>
            </div>
        </>
    );
};

export default SearchFiled
