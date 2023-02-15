import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

interface NavbarItems {
    navigation: any
}

const NavBarItems: React.FC<NavbarItems> = ({navigation}) => {
    const router = useRouter();

    return (
        <>
            {
                navigation.map((item: { path: string | UrlObject; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, idx: React.Key | null | undefined) => {
                    return (
                        <div key={idx} className="topnav overflow-hidden md:pl-[2rem] md:px-[0.8rem] lg:pl-[21px] lg:pr-[15px] xl:px-[45px] text-gray-600 hover:text-[#00C853] py-[50px]">

                            <Link href={item.path} legacyBehavior  >
                                <a
                                    className={` ${
                                        router.pathname === item.path
                                            ? "active pb-[40px]  text-[#00C853] hover:text-[#00C853]"
                                            : "text-[#373737]"
                                    }`}
                                >
                                    { item.title }
                                </a>

                            </Link>
                        </div>
                    )
                })
            }
        </>
    );
};

export default NavBarItems
