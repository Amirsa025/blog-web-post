import React, {useState} from 'react';
import {Checkbox} from "@mui/material";
import { ClipLoader } from 'react-spinners';

interface  Categories {
    postData : any,
    category : any,
    status : any,
    handleFilters?: any,
}
const PostFilters:React.FC<Categories> = ({handleFilters,status,category}) => {
    const [checkedValues, setCheckedValues] = useState([]);

const handleToggle = (value: any)=>{
    // @ts-ignore
    const currentIndex = checkedValues.indexOf(value)
    const newChecked = [...checkedValues]
    if(currentIndex===-1){
        // @ts-ignore
        newChecked.push(value)
    }else{
        newChecked.splice(currentIndex,1)
    }
    setCheckedValues(newChecked)
    handleFilters(newChecked)
}
    return (
        <div className={"shadow-category"}>
            <h3 className={"text-[22px] font-bold"}>دسته بندی</h3>
            <div>
                {status === "loading" ? (
                    <div className="w-full  centers-element">
                        <ClipLoader size={30} color="#00C853" className="flex items-center justify-center"/>
                    </div>
                ) : status === "error" ? (
                    <span>Error:data load from server...</span>
                ) : (
                    <>
                        <div>
                            <div>
                                {
                                    category.map((filter:any,id:number)=>{
                                        return (
                                            <ul key={filter._id}>
                                                <li className="pt-[30px] flex filters-center justify-between w-[20rem] ">
                                                    <label htmlFor={filter.name}>
                                                        {filter.name}
                                                    </label>
                                                    <div>
                                                        <div className="checkbox-wrapper ">
                                                            <Checkbox color="success"
                                                                      sx={{
                                                                          color: "#00C853",
                                                                          '&.Mui-checked': {
                                                                              color: "#00C853",
                                                                          },
                                                                      }}
                                                                // @ts-ignore
                                                                      id= {filter._id} checked={checkedValues.indexOf(filter?._id)===-1 ? false :true!} onChange={()=>handleToggle(filter?._id)}></Checkbox>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </>

                )}
            </div>

        </div>
    );
};

export default PostFilters;
