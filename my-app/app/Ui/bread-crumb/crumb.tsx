import  React from "react";
import Link from "next/link";
import {navigation} from "../../constant/data";
import {Breadcrumbs} from "@material-tailwind/react";
interface CrumbProps {
    text?:any,
    href?:any,
    textGenerator?:any,
    last?:boolean,
}
const Crumbs:React.FC<CrumbProps>=({  text: defaultText, textGenerator, href, last=true })=> {
    // The last crumb is rendered as normal text since we are already on the page
    const [text, setText] = React.useState(defaultText)

    React.useEffect(() => {
        if ( !Boolean(textGenerator) ) return setText(defaultText)

        async function fetchData() {
            const currText = await textGenerator()
            setText(currText)
        }

        fetchData().then()

    }, [defaultText, textGenerator])
    if (last) {
        return <>
            <span className="text-green-500">{text}</span>
        </>
    }
    // All other crumbs will be rendered as links that can be visited
    return (
        <Link href={href} >
            {text}
        </Link>
    );
}
export default Crumbs
