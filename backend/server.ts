import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import medicamentosRouter from './routes/medicamentos'
import laboratoriosRouter from './routes/laboratorios'
import lotesRouter from './routes/lotes'
import alertasRouter from './routes/alertas'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/medicamentos', medicamentosRouter)
app.use('/laboratorios', laboratoriosRouter)
app.use('/lotes', lotesRouter)
app.use('/alertas', alertasRouter)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
