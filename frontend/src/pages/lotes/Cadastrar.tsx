import { useState } from 'react'

function LotesCadastrar() {
    const [numero, setNumero] = useState('')
    const [data_validade, setData_validade] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [data_recebimento, setData_recebimento] = useState('')
    const [medicamento_id, setMedicamento_id] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Lógica para cadastrar o lote
        fetch('http://localhost:3000/lotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                numero_lote: numero,
                data_validade,
                quantidade: Number(quantidade),
                data_recebimento,
                medicamento_id: Number(medicamento_id),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Lote cadastrado:', data)
                // Limpar o formulário após o cadastro
                setNumero('')
                setData_validade('')
                setQuantidade('')
                setData_recebimento('')
                setMedicamento_id('')
            })
            .catch((error) => {
                console.error('Erro ao cadastrar lote:', error)
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Cadastrar Lote</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="numero"
                    >
                        Número
                    </label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="numero"
                        type="text"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="data_validade"
                    >
                        Data de Validade
                    </label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="data_validade"
                        type="date"
                        value={data_validade}
                        onChange={(e) => setData_validade(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="quantidade"
                    >
                        Quantidade
                    </label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="quantidade"
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="data_recebimento"
                    >
                        Data de Recebimento
                    </label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="data_recebimento"
                        type="date"
                        value={data_recebimento}
                        onChange={(e) => setData_recebimento(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="medicamento_id"
                    >
                        ID do Medicamento
                    </label>
                    <input
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="medicamento_id"
                        type="number"
                        value={medicamento_id}
                        onChange={(e) => setMedicamento_id(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    )
}

export default LotesCadastrar
