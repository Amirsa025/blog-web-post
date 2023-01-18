import React from 'react';
import UserPanelLayout from "../../app/Layouts/userPanelLayout";
import {NextPageWithLayout} from "../_app";
const Blog:NextPageWithLayout = () => {
    return (
        <div>
            blogbx
        </div>
    );
};
Blog.getLayout=(page: React.ReactElement<any, string | React.JSXElementConstructor<any>>)=><UserPanelLayout>{page}</UserPanelLayout>
export default Blog;
