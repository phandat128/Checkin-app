import {Prisma} from '../prismaClient/prismaClient.js'

export default async function getHistory(req,res){
    const checkList = await Prisma.check.findMany({
        include: {
            User: true
        }
    })

    return res.status(200).json(checkList)
}


