import React from "react";
import Crumbs from "./crumb";
interface breadcrumbsProps {
    router : any,
    subPath?:any,
    getDefaultTextGenerator?:any,
    getTextGenerator?:any,
}
import Breadcrumbs from '@mui/material/Breadcrumbs';
const _defaultGetTextGenerator = () => null;
const _defaultGetDefaultTextGenerator = (path: any) => path;
const generatePathParts = (pathStr: string) => {
    const pathWithoutQuery = pathStr.split("?")[0];
    return pathWithoutQuery.split("/")
        .filter(v => v.length > 0);
}

const CustomBreadCrump:React.FC<breadcrumbsProps>=({router,  getTextGenerator=_defaultGetTextGenerator, getDefaultTextGenerator=_defaultGetDefaultTextGenerator})=> {
    const generateBreadcrumbs=()=> {
        const asPathNestedRoutes = generatePathParts(router.asPath);
        const pathnameNestedRoutes= generatePathParts(router.pathname);
        const crumblist = asPathNestedRoutes.map((subPath: any, idx: number) => {
            const param = pathnameNestedRoutes[idx]
                .replace("[", "")
                .replace("]", "");
            const href = ""+asPathNestedRoutes
                    .slice(0, idx + 1)
                    .join("/");
            return {
                href, textGenerator: getTextGenerator(param, router.query),
                text: getDefaultTextGenerator(subPath, href)
            };
        })
        return [{ href: "", text: "خانه" }, ...crumblist];
    }
    const breadcrumbs = React.useMemo(
        generateBreadcrumbs, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]);
    return (
       <>
           <Breadcrumbs separator="›" aria-label="breadcrumb" className={"font-[IRANYekan]"}>
               {breadcrumbs.map((crumb, idx) => (
                   <Crumbs  {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
               ))}
           </Breadcrumbs>
       </>
    );
}

export default CustomBreadCrump



