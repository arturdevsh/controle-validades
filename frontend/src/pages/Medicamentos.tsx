import { useState, useEffect } from 'react'

function Medicamentos() {
    const [medicamentos, setMedicamentos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/medicamentos')
            .then((res) => res.json())
            .then((data) => setMedicamentos(data))
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Medicamentos</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Nome</th>
                        <th className="py-2 px-4 border-b">Descrição</th>
                        <th className="py-2 px-4 border-b">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.map((medicamento: any) => (
                        <tr key={medicamento.id}>
                            <td className="py-2 px-4 border-b">
                                {medicamento.nome}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {medicamento.dosagem}
                            </td>
                            <td className="py-2 px-4 border-b">
                                {medicamento.tipo}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Medicamentos
