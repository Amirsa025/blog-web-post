import dynamic from "next/dynamic";

const Modal = dynamic(() => import('../app/Ui/modal'), {
    ssr: false,
})
const Blog = () => {

    return (
        <div className="lg:app-container  lg:pl-[78px] md:px-[3rem] ">
                   <div className={"flex items-center justify-center font-semibold py-3 "}>
                       برای دیدن پست ها لطفا لاگین کنید
                   </div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Modal/>
        </div>
    );
};

export default Blog;
