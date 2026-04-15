import { useState, useEffect } from 'react'

function MedicamentosListar() {
    const [medicamentos, setMedicamentos] = useState([])
    const [editando, setEditando] = useState(null)

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

    function salvar() {
        fetch(`http://localhost:3000/medicamentos/${editando.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editando),
        })
            .then((res) => res.json())
            .then((atualizado) => {
                setMedicamentos(
                    medicamentos.map((m: any) =>
                        m.id === atualizado.id ? atualizado : m
                    )
                )
                setEditando(null)
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Listar Medicamentos</h1>

            {editando && (
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        Editando: {editando.nome}
                    </h2>
                    <input
                        className="border rounded p-2 mr-2"
                        value={editando.nome}
                        onChange={(e) =>
                            setEditando({ ...editando, nome: e.target.value })
                        }
                        placeholder="Nome"
                    />
                    <input
                        className="border rounded p-2 mr-2"
                        value={editando.dosagem}
                        onChange={(e) =>
                            setEditando({
                                ...editando,
                                dosagem: e.target.value,
                            })
                        }
                        placeholder="Dosagem"
                    />
                    <input
                        className="border rounded p-2 mr-2"
                        value={editando.tipo}
                        onChange={(e) =>
                            setEditando({ ...editando, tipo: e.target.value })
                        }
                        placeholder="Tipo"
                    />
                    <button
                        onClick={salvar}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Salvar
                    </button>
                    <button
                        onClick={() => setEditando(null)}
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                        Cancelar
                    </button>
                </div>
            )}

            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Nome
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Dosagem
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Tipo
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.map((medicamento) => (
                        <tr key={medicamento.id}>
                            <td className="py-2 px-4 border-b text-center">
                                {medicamento.nome}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {medicamento.dosagem}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {medicamento.tipo}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => setEditando(medicamento)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => excluir(medicamento.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MedicamentosListar
