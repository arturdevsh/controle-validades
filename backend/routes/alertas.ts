import { Router } from 'express'
import { prisma } from '../db'

const router = Router()

router.get('/', async (req, res) => {
    const alertas = await prisma.alerta.findMany()
    res.json(alertas)
})

router.post('/', async (req, res) => {
    const { dias_antes_vencimento, lote_id, data_gerado, status } = req.body
    const alerta = await prisma.alerta.create({
        data: {
            dias_antes_vencimento,
            lote_id,
            data_gerado: new Date(data_gerado),
            status,
        },
    })
    res.json(alerta)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const alerta = await prisma.alerta.findUnique({
        where: { id: Number(id) },
    })
    res.json(alerta)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { dias_antes_vencimento, lote_id, data_gerado, status } = req.body
    const alerta = await prisma.alerta.update({
        where: { id: Number(id) },
        data: {
            dias_antes_vencimento,
            lote_id,
            data_gerado: new Date(data_gerado),
            status,
        },
    })
    res.json(alerta)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const alerta = await prisma.alerta.delete({
        where: { id: Number(id) },
    })
    res.json(alerta)
})

export default router
