import { useState, useEffect } from 'react'

function Card({ title, count }: { title: string; count: number }) {
    return (
        <div className="card bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl font-bold">{count}</p>
        </div>
    )
}

function Dashboard() {
    const [medicamentos, setMedicamentos] = useState([])
    const [lotes, setLotes] = useState([])
    const [alertas, setAlertas] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/medicamentos')
            .then((res) => res.json())
            .then((data) => setMedicamentos(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/lotes')
            .then((res) => res.json())
            .then((data) => setLotes(data))
    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/alertas')
            .then((res) => res.json())
            .then((data) => setAlertas(data))
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="card-container grid grid-cols-3 gap-4 mb-8">
                <Card title="Medicamentos" count={medicamentos.length} />
                <Card title="Lotes" count={lotes.length} />
                <Card title="Alertas" count={alertas.length} />
            </div>

            <h2 className="text-2xl font-bold mb-4">Lista de Medicamentos</h2>
            <ul>
                {medicamentos.map((medicamento: any) => (
                    <li key={medicamento.id} className="mb-2">
                        {medicamento.nome}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard
