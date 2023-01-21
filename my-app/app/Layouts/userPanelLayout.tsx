import React from 'react';
import Cookies from "universal-cookie";
interface  IuserPanelLayout {
        children :React.ReactElement
}
const UserPanelLayout:React.FC<IuserPanelLayout> = ({children}) => {
     const cookies = new Cookies();
     if( !cookies.get('post-token') && !cookies.get('post-refresh-token')){
            return (
                <div className="flex items-center justify-center text-[24px] text-yellow-800 ">کاربر محترم لطفا برای دیدن پست ها ابتدا لاگین کنید.</div>
            )
    }
    return (
        <div>

            {
               children
            }
        </div>
    );
};

export default UserPanelLayout;
