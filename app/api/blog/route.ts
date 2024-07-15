import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();
    } catch (error) {
        return Error("Connection Unsuccessful")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        await main();
        const posts  = await prisma.posts.findMany();
        return NextResponse.json({message:"Success",posts},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Error on server"},{status:500})
    }
};

export const POST = async (req: Request, res: Response) => {
    try {
        const {title,description} = await req.json();
        await main();
        const post = await prisma.posts.create({data:{title,description}});
        return NextResponse.json({message:"Success",post},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Error",error},{status:2500});
    }finally{
       await prisma.$disconnect();
    }
};
