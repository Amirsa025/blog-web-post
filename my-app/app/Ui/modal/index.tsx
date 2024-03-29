import { Dialog, Transition } from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import React from "react"
import Cookies from "universal-cookie";
import {storageKeys} from "../../constant/storage-key";
import SignForm from "../../Forms/Login-useFormik/signForm";
import useSignupMutation from "../../Forms/Login-useFormik/useSignupMutation";
export default function MyModal() {
    let [isOpen, setIsOpen] = useState(false)
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    useEffect(()=> {
        getFromStorage()
    },[])
    const getFromStorage = (key?:any) => {
        if (typeof window !== "undefined") {
            return   window.localStorage.getItem(key)
        }
    }
    const getFromCookie = (key?:any) => {
        const cookies = new Cookies();
        if (typeof window !== "undefined") {
            return   cookies.get(key)
        }
    }
    const logout = ()=>{
        const cookies = new Cookies();
        window.localStorage.clear()

        cookies.remove('post-token')
        cookies.remove('post-refresh-token')
        location.reload()
    }
    return (
        <>
            <div className="flex items-center justify-center">
                {
                    getFromCookie('post-token') && getFromCookie('post-refresh-token') ?
                        <div className="flex items-center justify-center w-full">
                            <div className={"px-2 "}>{getFromStorage(storageKeys.loginInfo)}</div>
                            <button
                                onClick={logout}
                                type="button"
                                className={" border border-red-400 w-1/2 lg:w-[157px]  h-[56px] text-red-400 rounded-[15px] hover:bg-red-800 hover:text-white"}
                            >
                                <span className="sr-only">login modal</span>
                               خروج
                            </button>
                        </div>

                        :
                        <button
                            onClick={openModal}
                            type="button"
                            className={" border border-[#00C853] w-[157px] h-[56px] text-[#00C853] rounded-[15px] hover:bg-[#00C853] hover:text-white"}
                        >
                            <span className="sr-only">login modal</span>
                            ورود
                        </button>

                }

            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden  bg-white lg:py-[5.375rem] text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="centers-element text-[2rem] pt-4 lg:text-[2.813rem] font-medium "
                                    >
                                         ورود به حساب کاربری
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <div className=" py-[3rem]">

                                            <SignForm open={isOpen} setIsOpen={setIsOpen}/>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
