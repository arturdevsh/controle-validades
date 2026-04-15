import { useState, useEffect } from 'react'

function MedicamentosListar() {
    const [medicamentos, setMedicamentos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/medicamentos')
            .then((res) => res.json())
            .then((data) => {
                setMedicamentos(data)
            })
    }, [])

    function excluir(id: number) {
        fetch(`http://localhost:3000/medicamentos/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (!res.ok) {
                alert('Não foi possível excluir o medicamento')
                return
            }
            // Atualiza a lista de medicamentos após a exclusão
            setMedicamentos(medicamentos.filter((m) => m.id !== id))
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Listar Medicamentos</h1>
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold">
                            Nome
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold">
                            Dosagem
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold">
                            Tipo
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.map((medicamento) => (
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
                            <td className="py-2 px-4 border-b flex gap-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Editar
                                </button>

                                <button
                                    onClick={() => excluir(medicamento.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MedicamentosListar
