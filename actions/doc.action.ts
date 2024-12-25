'use server'
import prisma from "@/lib/db"

export async function uploadDoc(createdBy: string, title: string, htmlString:string) {
    const doc = await prisma.document.create({
        data:{
            createdBy,
            title,
            htmlString
        }
    })
    return doc
}

export async function getdocs(email:string){
    const docs = await prisma.document.findMany({
        where:{
            createdBy:email
        }
    })
    return docs
}