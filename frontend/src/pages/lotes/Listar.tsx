import { useState, useEffect } from 'react'

function LotesListar() {
    const [lotes, setLotes] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/lotes')
            .then((res) => res.json())
            .then((data) => {
                setLotes(data)
            })
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Listar Lotes</h1>
            <ul>
                {lotes.map((lote) => (
                    <li key={lote.id}>
                        <p>Numero: {lote.numero_lote}</p>
                        <p>Data de Validade: {lote.data_validade}</p>
                        <p>Quantidade: {lote.quantidade}</p>
                        <p>Data de Recebimento: {lote.data_recebimento}</p>
                        <p>Medicamento ID: {lote.medicamento_id}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default LotesListar
