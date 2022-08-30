import { Prisma } from "../prismaClient/prismaClient.js";

export default async function addCheck(req, res) {
    const input = req.body
    console.log(input)
    const inputId = input.id
    const inputName = input.name
    const inputGate = input.gate
    console.log({ inputId, inputName, inputGate })

    if (!inputId || !inputName) return res.status(400).json('please enter both name and id')

    let user = await Prisma.user.findUnique({
        where: {
            id: Number(inputId)
        }
    })

    if (!user) {
        user = await Prisma.user.create({
            data: {
                name: inputName,
                id: Number(inputId)
            }
        })
    }

    if (user.name !== inputName) {
        return res.status(400).json('This ID does not belong to this name')
    }

    await Prisma.user
        .update({
            where: {
                id: Number(inputId)
            },
            data: {
                Check: {
                    create: {
                        Gate: inputGate
                    }
                }
            }
        })
        .then(() => {
            res.status(200).json('Checked!')
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('Error: ' + err.message)
        })

    console.log('Checked!')

}