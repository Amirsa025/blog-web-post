import React from "react";
import Crumbs from "./crumb";
interface breadcrumbsProps {
    router : any,
    subPath?:any,
    getDefaultTextGenerator?:any,
    getTextGenerator?:any,
}
const _defaultGetTextGenerator = () => null;
const _defaultGetDefaultTextGenerator = (path: any) => path;
const generatePathParts = (pathStr: string) => {
    const pathWithoutQuery = pathStr.split("?")[0];
    console.log(pathWithoutQuery)
    return pathWithoutQuery.split("   ",3)
        .filter(v => v.length > 0);
}
const CustomBreadCrump:React.FC<breadcrumbsProps>=({router,  getTextGenerator=_defaultGetTextGenerator, getDefaultTextGenerator=_defaultGetDefaultTextGenerator})=> {
    const breadcrumbs = React.useMemo(function generateBreadcrumbs() {
        const asPathNestedRoutes = generatePathParts(router.asPath);
        const pathnameNestedRoutes = generatePathParts(router.pathname);

        const crumblist = asPathNestedRoutes.map((subPath: any, idx: number) => {
            // Pull out and convert "[post_id]" into "post_id"
            const param = pathnameNestedRoutes[idx].replace("[", "").replace("]", "");

            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            return {
                href, textGenerator: getTextGenerator(param, router.query),
                text: getDefaultTextGenerator(subPath, href)
            };
        })

        return [{ href: "/", text: "خانه" }, ...crumblist];
    }, [router.asPath, router.pathname, router.query, getTextGenerator, getDefaultTextGenerator]);


    return (
       <>
           {breadcrumbs.map((crumb, idx) => (
               <Crumbs  {...crumb} key={idx} last={idx === breadcrumbs.length - 1} />
           ))}
       </>
    );
}

export default CustomBreadCrump



