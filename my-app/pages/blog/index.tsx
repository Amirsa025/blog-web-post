import React, {useState} from 'react';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useQuery} from "@tanstack/react-query";
import {ClipLoader} from "react-spinners";
import Image from "next/image";
import {Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PostFilters from "../../app/component/PostFilters";
import axios from "axios";

const Blog = () => {

    const [page, setPage] = React.useState(4)
    const [isShow, setShow] = React.useState(false);
    const fetchProjects = (page = 1) => fetch(`https://challenge.webjar.ir/posts?limit=5&skip=${page}&page=` + page).then((res) => res.json())
    const FetchAllpost = () => fetch(`https://challenge.webjar.ir/posts`).then((res) => res.json())
    const FetchCategory = async () => {
        const {data} = await axios.get(
            "https://challenge.webjar.ir/post-categories?skip=10"
        );
        return data;
    }
    //   fetch data from server (post)
    const {
        isLoading,
        isError,
        refetch,
        data: post,
    } = useQuery({
        queryKey: ['page' + page],
        queryFn: () => fetchProjects(page),
        keepPreviousData: true,
        refetchOnWindowFocus:false
    })
    //   fetch data from server (category)
    const {data: category, status: statusCategories} = useQuery({
        queryKey: ["category"],
        queryFn: FetchCategory
    })
    const {data: Allpost, status: statusAllpost} = useQuery({
        queryKey: ["AllPost"],
        queryFn: FetchAllpost
    })
    // const [searchResults, setSearchResults] = React.useState([]);
    // const [Filters, setFilters] = useState([])
    const [searchTerm, setSearchTerm] = React.useState("");
    const [posts, setPost] = useState(post)
    const handleFilters = (filters: any) => {
        const filterWithClick = post?.filter((item: any) => {
            return !filters.includes(item?.category)
        })
        console.log(filterWithClick)
        setPost(filterWithClick)
    }
    //search as pages
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    };
    React.useEffect(() => {
        const results = post?.filter((post: any) =>
            post?.title.toLowerCase().includes(searchTerm)
        )
        setPost(results);
        refetch().then()
    }, [refetch, post]);

    return (
        <div className="lg:app-container md:px-[50px] px-[3rem] ">
            <div className={"pt-[5.125rem] centers-element text-[2rem] font-bold"}>
                <h1>وبلاگ</h1>
            </div>
            <div className={"py-[4rem] w-full centers-element flex-col "}>
                <div className="flex items-center border-[rgba(0, 0, 0, 0.2)] searchShadow lg:w-[47.5rem] ">
                    <i className={`ri-search-line text-[1.4rem] px-4 text-[#7B7B7B]`}></i>
                    <input
                        type="text"
                        placeholder="جستجو کنید..."
                        className="w-[25rem]  lg:w-[47.5rem] text-[#929294] px-4 h-[56px]  focus:outline-0"
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className={"flex flex-col xl:flex-row "}>
                <div className={"centers-element  lg:items-start lg:justify-start pt-24"}>
                    <PostFilters
                        handleFilters={(filters: any) => handleFilters(filters)}
                        status={statusCategories}
                        category={category}
                        postData={post}/>
                </div>
                <div className={" lg:mr-[12rem] "}>

                    {isLoading ? (
                        <div className="w-full  centers-element">
                            <ClipLoader size={100} color="#00C853" className="flex items-center justify-center"/>
                        </div>
                    ) : isError ? (
                        <div>دریافت اطلاعات از سرور ...</div>
                    ) : (
                        <div>
                            {
                                posts?.map((post: any) => {
                                    return (
                                        <div className="pt-[100px] flex flex-col md:flex-row" key={post?._id}>
                                            <div className={" w-full centers-element py-2"}>
                                                <Image src="https://challenge.webjar.ir/images/1.jpg" width="300"
                                                       height="288" alt="blogpost" className=""/>

                                            </div>
                                            <div className={"md:pr-[40px]"}>
                                                <div className={"text-center md:text-right"}>
                                                    <h5>{post?.title}</h5>
                                                </div>
                                                <div className={"pt-[38px]"}>
                                                    <p className={"text-justify lg:text-height line-clamp-3 lg:pl-[10rem]"}>
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
                            <div className="centers-element w-full">
                                <Stack spacing={2} className="direction-page py-4 text-green-400">
                                    <Pagination color="success" count={9} shape="rounded" variant="outlined"
                                                onChange={(event, index) => setPage(index + 4)}/>
                                </Stack>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            <ReactQueryDevtools initialIsOpen/>
        </div>
    );
};

export default Blog;
