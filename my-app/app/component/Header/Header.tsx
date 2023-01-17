import { Disclosure} from '@headlessui/react'
import dynamic from "next/dynamic";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import {navigation} from "../../constant/data";
import Link from "next/link";
import { useRouter } from 'next/router';

import CustomBreadcrump from "../../Ui/bread-crumb/breadcrump";
const Modal = dynamic(() => import('../../Ui/modal'), {
    ssr: false,
})
export default function Header() {
    const router = useRouter();
    return (
        <div>
            <Disclosure as="nav" className="bg-white  custom-shadow">
                {({ open }) => (
                    <>
                        <div className="lg:app-container py-[26px]">
                            <div className="relative flex h-16 items-center justify-between px-2">
                                <div className="absolute inset-y-0 left-0 flex items-center md:hidden px-4">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex  items-center px-4 lg:px-0 lg:justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Image
                                            className="block h-8 w-auto lg:hidden"
                                            src="/image/logo.png"
                                            alt="Your Company"
                                            width="82"
                                            height="82"
                                        />
                                        <Image
                                            className="block h-8 w-auto hidden lg:block"
                                            src="/image/logo.png"
                                            alt="Your Company"
                                            width="82"
                                            height="82"
                                        />
                                    </div>
                                    <div className="hidden  md:block md:px-[50px] lg:px-[75px]">
                                        <div className="hidden sm:ml-6 sm:block">
                                            <div className="flex space-x-4 text-center">
                                                {
                                                    navigation.map((item, idx) => {
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex md:pl-8 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                  <Modal/>

                                    {/* Profile dropdown */}
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                <ul className="px-[130px] md:flex md:space-x-6 md:space-x-reverse md:space-y-0 text-center">
                                    {
                                        navigation.map((item, idx) => {
                                            return (
                                                <li key={idx} className="px-8  text-gray-600 hover:text-[#00C853] py-4">
                                                    <Link href={item.path} legacyBehavior  >
                                                        <a
                                                            className={` ${
                                                                router.pathname === item.path
                                                                    ? " text-[#00C853] hover:text-[#00C853]"
                                                                    : "text-[#373737]"
                                                            }`}
                                                        >
                                                            { item.title }
                                                        </a>

                                                    </Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <Modal/>

                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <div className={"lg:app-container pt-8"}>
            <CustomBreadcrump router={router}/>
            </div>
        </div>
    )
}
