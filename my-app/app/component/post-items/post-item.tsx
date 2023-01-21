import React from 'react';
import Image from "next/image";
interface PosItem {
    postItem:any
}
const PostItem:React.FC<PosItem> = ({postItem}) => {
    return (
        <>
            {
                postItem?.map((post: any) => {
                    return (
                        <div className=" flex flex-col md:flex-row md:max-w-6xl my-4 " key={post?._id}>
                            <img
                                className=" w-full  h-64 md:h-64 object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                src={'https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg'} alt={post?.title} />
                            <div className={"md:pr-[40px]"}>
                                <div className={"text-center md:text-right"}>
                                    <h5>{post?.title}</h5>
                                </div>
                                <div className={"pt-[38px]"}>
                                    <p className={"text-justify text-[1rem] text-[#373737] font-normal font-thin lg:text-height line-clamp-3 lg:pl-[10rem]"}>
                                        {post?.body}
                                    </p>
                                    <div
                                        className={"mt-[60px]  centers-element w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 flex items-center justify-around flex-wrap"}>
                                        <div className={"py-8"}>
                                            <div className="flex items-center justify-start">
                                                <i className="ri-calendar-line"></i>
                                                <h6 className={"px-2 text-[10px] lg:text-[12px]"}>۲۰ تیر
                                                    ۱۴۰۰</h6>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-center">
                                                <i className="ri-calendar-line"></i>
                                                <h6 className={" text-[12px] lg:text-[13px]"}>{post?.commentCount} نظر </h6>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-start">
                                                <i className="ri-calendar-line"></i>
                                                <h6 className={"  text-[12px] lg:text-[13px]"}>{post?.author} </h6>
                                            </div>
                                        </div>
                                        <button
                                            className="hidden md:block ml-[70px]  bg-[#00C853] rounded-[15px] hover:bg-green-500 w-[156px]  lg:h-[40px] h-[56px] text-white">بیشتر
                                        </button>
                                    </div>
                                    <div className="py-4 md:hidden  centers-element">
                                        <button
                                            className=" ml-[70px]  bg-[#00C853] rounded-[15px] hover:bg-green-500 w-[156px]  h-[50px] lg:h-[56px] text-white">بیشتر
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    );
};

export default PostItem
