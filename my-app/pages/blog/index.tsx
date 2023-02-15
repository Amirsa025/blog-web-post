import React, {useState} from 'react';
import UserPanelLayout from "../../app/Layouts/userPanelLayout";
import {NextPageWithLayout} from "../_app";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import PostFilters from "../../app/component/PostFilters/PostFilters";
import {ClipLoader} from "react-spinners";
import PostItem from "../../app/component/post-items/post-item";
import {Stack} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
const Blog:NextPageWithLayout = () => {
    const [page, setPage] = React.useState(0)
    const fetchProjects = (page = 1) => fetch(`https://challenge.webjar.ir/posts?limit=4&skip=${page}&page=`+ page).then((res) => res.json())
    const FetchCategory = async () => {
        const {data} = await axios.get(
            "https://challenge.webjar.ir/post-categories?skip=10"
        );
        return data;
    }

    const [searchTerm, setSearchTerm] = React.useState("");
    const {
        isLoading,
        isError,
        refetch,
        data: post,
    } = useQuery({
        queryKey: ['page' ,page, searchTerm],
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
        refetch()
    }, [refetch, post]);
    return (
        <div className="lg:app-container  lg:pl-[78px] md:px-[3rem] ">
            <div className={"pt-[5.125rem] centers-element text-[2rem] font-bold"}>
                <h1>وبلاگ</h1>
            </div>
            <div className={"py-[4rem] w-full centers-element flex-col "}>
                <div className="flex items-center border-[rgba(0, 0, 0, 0.2)] searchShadow lg:w-[50.5rem] ">
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
            <div className={"flex flex-col  items-center md:items-center xl:flex-row xl:items-start "}>
                <div className={"centers-element  lg:items-end lg:justify-end "}>
                    <PostFilters
                        handleFilters={(filters: any) => handleFilters(filters)}
                        status={statusCategories}
                        category={category}
                        postData={post}/>
                </div>
                <div className={" lg:mr-[8] w-full"}>

                    {isLoading ? (
                        <div className="w-full  centers-element">
                            <ClipLoader size={100} color="#00C853" className="flex items-center justify-center"/>
                        </div>
                    ) : isError ? (
                        <div>دریافت اطلاعات از سرور ...</div>
                    ) : (
                        <div className={"px-8 lg:pr-[4rem] xl:pr-[4rem] flex justify-center flex-col "}>
                            <PostItem postItem={posts}/>
                            <div className="flex items-center justify-center  w-full">
                                <Stack spacing={2} className="direction-page py-4 text-[#00C853] ">
                                    <Pagination count={14} shape="rounded"
                                                className={"font-[IRANYekan] text-[#00C853]"}
                                                onChange={(event, page) => setPage(page +1)}/>
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
Blog.getLayout=(page: React.ReactElement<any, string | React.JSXElementConstructor<any>>)=><UserPanelLayout>{page}</UserPanelLayout>
export default Blog;
