import { Router } from 'express'
import { prisma } from '../db'

const router = Router()

router.get('/', async (req, res) => {
    const lotes = await prisma.lote.findMany({ include: { medicamento: true } })
    res.json(lotes)
})

router.get('/alerta', async (req, res) => {
    const hoje = new Date()
    const alerta = await prisma.lote.findMany({
        where: {
            data_validade: {
                gte: hoje,
                lte: new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000),
            },
        },
        include: { medicamento: true },
        orderBy: {
            data_validade: 'asc',
        },
    })
    res.json(alerta)
})

router.post('/', async (req, res) => {
    const {
        numero_lote,
        medicamento_id,
        quantidade,
        data_validade,
        data_recebimento,
    } = req.body
    const lote = await prisma.lote.create({
        data: {
            numero_lote,
            medicamento_id,
            quantidade,
            data_validade: new Date(data_validade),
            data_recebimento: new Date(data_recebimento),
        },
    })
    res.json(lote)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const lote = await prisma.lote.findUnique({
        where: { id: Number(id) },
    })
    res.json(lote)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const {
        numero_lote,
        medicamento_id,
        quantidade,
        data_validade,
        data_recebimento,
    } = req.body
    const lote = await prisma.lote.update({
        where: { id: Number(id) },
        data: {
            numero_lote,
            medicamento_id,
            quantidade,
            data_validade: new Date(data_validade),
            data_recebimento: new Date(data_recebimento),
        },
    })
    res.json(lote)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const lote = await prisma.lote.delete({
        where: { id: Number(id) },
    })
    res.json(lote)
})

export default router
