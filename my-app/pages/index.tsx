import React, {useState} from 'react';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {useQuery} from "@tanstack/react-query";
import {ClipLoader} from "react-spinners";
import {Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import PostFilters from "../app/component/PostFilters/PostFilters";
import PostItem from "../app/component/post-items/post-item";

const Blog = () => {

    const [page, setPage] = React.useState(4)
    const fetchProjects = (page = 1) => fetch(`https://challenge.webjar.ir/posts?limit=5&skip=${page}&page=` + page).then((res) => res.json())
    const FetchCategory = async () => {
        const {data} = await axios.get(
            "https://challenge.webjar.ir/post-categories?skip=10"
        );
        return data;
    }
    //   fetch data from server (post)
    const [searchTerm, setSearchTerm] = React.useState("");
    const {
        isLoading,
        isError,
        refetch,
        data: post,
    } = useQuery({
        queryKey: ['page' + page,searchTerm],
        queryFn: () => fetchProjects(page),
        keepPreviousData: true,
        refetchOnWindowFocus:false,
        staleTime: 0,
        cacheTime: 0
    })
    //   fetch data from server (category)
    const {data: category, status: statusCategories} = useQuery({
        queryKey: ["category"],
        queryFn: FetchCategory
    })

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
                <div className={" lg:mr-[12rem] w-full"}>

                    {isLoading ? (
                        <div className="w-full  centers-element">
                            <ClipLoader size={100} color="#00C853" className="flex items-center justify-center"/>
                        </div>
                    ) : isError ? (
                        <div>دریافت اطلاعات از سرور ...</div>
                    ) : (
                        <div>
                             <PostItem postItem={posts}/>
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
