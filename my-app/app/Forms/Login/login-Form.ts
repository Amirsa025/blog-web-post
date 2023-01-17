export interface LoginFormValues {
    userName : string,
    password : string,
    inputClassName?:string,
    setIsOpen ?:any
    open ?:any
}
export interface LoginFormProps {
    userName?: string,
    password?: string,
    inputClassName?:string,
    iconClassName?:string
    Router?:any
    setIsOpen ?:any
    open ?:any
}
