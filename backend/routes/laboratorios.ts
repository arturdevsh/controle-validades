import { Router } from 'express'
import { prisma } from '../db'

const router = Router()

router.get('/', async (req, res) => {
    const laboratorios = await prisma.laboratorio.findMany()
    res.json(laboratorios)
})

router.post('/', async (req, res) => {
    const { nome, cnpj, representante } = req.body
    const laboratorio = await prisma.laboratorio.create({
        data: {
            nome,
            cnpj,
            representante,
        },
    })
    res.json(laboratorio)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const laboratorio = await prisma.laboratorio.findUnique({
        where: { id: Number(id) },
    })
    res.json(laboratorio)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, cnpj, representante } = req.body

    const laboratorio = await prisma.laboratorio.update({
        where: { id: Number(id) },
        data: {
            nome,
            cnpj,
            representante,
        },
    })

    res.json(laboratorio)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    const laboratorio = await prisma.laboratorio.delete({
        where: { id: Number(id) },
    })

    res.json(laboratorio)
})

export default router
