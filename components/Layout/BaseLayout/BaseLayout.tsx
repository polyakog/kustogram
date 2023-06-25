import { NextPage } from "next";
import { PropsWithChildren, ReactElement } from "react";
import { Layout } from "./Layout";

export const BaseLayout: NextPage<PropsWithChildren> = ({children}) =>{
    return <Layout>{children}</Layout>
}

export const getLayout =(page:ReactElement)=>{
    return <BaseLayout>{page}</BaseLayout>
}