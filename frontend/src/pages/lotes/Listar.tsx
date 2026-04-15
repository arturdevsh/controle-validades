import { useState, useEffect } from 'react'

function LotesListar() {
    const [lotes, setLotes] = useState([])
    const [editando, setEditando] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/lotes')
            .then((res) => res.json())
            .then((data) => {
                setLotes(data)
            })
    }, [])

    function excluir(id: number) {
        fetch(`http://localhost:3000/lotes/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            if (!res.ok) {
                alert('Não foi possível excluir o lote')
                return
            }
            // Atualiza a lista de lotes após a exclusão
            setLotes(lotes.filter((l) => l.id !== id))
        })
    }

    function salvar() {
        fetch(`http://localhost:3000/lotes/${editando.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editando),
        })
            .then((res) => res.json())
            .then((atualizado) => {
                setLotes(
                    lotes.map((l: any) =>
                        l.id === atualizado.id ? atualizado : l
                    )
                )
                setEditando(null)
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Listar Lotes</h1>
            {editando && (
                <div className="bg-white p-4 shadow-md rounded-lg mb-4">
                    <h2 className="text-xl font-bold mb-2">Editar Lote</h2>
                    <form>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Número do Lote
                            </label>
                            <input
                                type="text"
                                value={editando.numero_lote}
                                onChange={(e) =>
                                    setEditando({
                                        ...editando,
                                        numero_lote: e.target.value,
                                    })
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Data de Validade
                            </label>
                            <input
                                type="date"
                                value={
                                    new Date(editando.data_validade)
                                        .toISOString()
                                        .split('T')[0]
                                }
                                onChange={(e) =>
                                    setEditando({
                                        ...editando,
                                        data_validade: new Date(e.target.value),
                                    })
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Quantidade
                            </label>
                            <input
                                type="number"
                                value={editando.quantidade}
                                onChange={(e) =>
                                    setEditando({
                                        ...editando,
                                        quantidade: parseInt(e.target.value),
                                    })
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Data de Recebimento
                            </label>
                            <input
                                type="date"
                                value={
                                    new Date(editando.data_recebimento)
                                        .toISOString()
                                        .split('T')[0]
                                }
                                onChange={(e) =>
                                    setEditando({
                                        ...editando,
                                        data_recebimento: new Date(
                                            e.target.value
                                        ),
                                    })
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Medicamento ID
                            </label>
                            <input
                                type="number"
                                value={editando.medicamento_id}
                                onChange={(e) =>
                                    setEditando({
                                        ...editando,
                                        medicamento_id: parseInt(
                                            e.target.value
                                        ),
                                    })
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            onClick={salvar}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            onClick={() => setEditando(null)}
                            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded ml-2"
                        >
                            Cancelar
                        </button>
                    </form>
                </div>
            )}
            <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Numero
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Data de Validade
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Quantidade
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Data de Recebimento
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Medicamento
                        </th>
                        <th className="py-2 px-4 bg-gray-200 text-gray-600 font-semibold text-center">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {lotes.map((lote) => (
                        <tr key={lote.id}>
                            <td className="py-2 px-4 border-b text-center">
                                {lote.numero_lote}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {new Date(
                                    lote.data_validade
                                ).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {lote.quantidade}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {new Date(
                                    lote.data_recebimento
                                ).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {lote.medicamento?.nome || 'N/A'}
                                {/* Exibe o nome do medicamento relacionado */}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => setEditando(lote)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => excluir(lote.id)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
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

export default LotesListar
