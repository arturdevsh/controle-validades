import { Router } from 'express'
import { prisma } from '../db'

const router = Router()

router.get('/', async (req, res) => {
    const medicamentos = await prisma.medicamento.findMany()
    res.json(medicamentos)
})

router.post('/', async (req, res) => {
    const { nome, dosagem, tipo, laboratorio_id } = req.body
    const medicamento = await prisma.medicamento.create({
        data: {
            nome,
            dosagem,
            tipo,
            laboratorio_id,
        },
    })
    res.json(medicamento)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const medicamento = await prisma.medicamento.findUnique({
        where: { id: Number(id) },
    })
    res.json(medicamento)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { nome, dosagem, tipo, laboratorio_id } = req.body

    const medicamento = await prisma.medicamento.update({
        where: { id: Number(id) },
        data: {
            nome,
            dosagem,
            tipo,
            laboratorio_id,
        },
    })

    res.json(medicamento)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const medicamento = await prisma.medicamento.delete({
            where: { id: Number(id) },
        })
        res.json(medicamento)
    } catch (error) {
        res.status(400).json({
            erro: 'Não é possível excluir — existem lotes associados.',
        })
    }
})

export default router
