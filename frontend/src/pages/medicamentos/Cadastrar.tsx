import { useState } from 'react'

function MedicamentosCadastrar() {
    const [nome, setNome] = useState('')
    const [dosagem, setDosagem] = useState('')
    const [tipo, setTipo] = useState('')
    const [laboratorio_id, setLaboratorio_id] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Lógica para cadastrar o medicamento
        fetch('http://localhost:3000/medicamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                dosagem,
                tipo,
                laboratorio_id: Number(laboratorio_id),
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Medicamento cadastrado:', data)
                // Limpar o formulário após o cadastro
                setNome('')
                setDosagem('')
                setTipo('')
                setLaboratorio_id('')
            })
            .catch((error) => {
                console.error('Erro ao cadastrar medicamento:', error)
            })
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">Cadastrar Medicamento</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="nome"
                    >
                        Nome
                    </label>
                    <input
                        id="nome"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="dosagem"
                    >
                        Dosagem
                    </label>
                    <input
                        id="dosagem"
                        type="text"
                        value={dosagem}
                        onChange={(e) => setDosagem(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tipo"
                    >
                        Tipo
                    </label>
                    <input
                        id="tipo"
                        type="text"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="laboratorio_id"
                    >
                        Laboratório
                    </label>
                    <input
                        id="laboratorio_id"
                        type="text"
                        value={laboratorio_id}
                        onChange={(e) => setLaboratorio_id(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default MedicamentosCadastrar
