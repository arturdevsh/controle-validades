import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import MedicamentosCadastrar from './pages/medicamentos/Cadastrar'
import MedicamentosListar from './pages/medicamentos/Listar'
import LotesCadastrar from './pages/lotes/Cadastrar'
import LotesListar from './pages/lotes/Listar'

function App() {
    const [submenuMed, setSubmenuMed] = useState(false)
    const [submenuLot, setSubmenuLot] = useState(false)

    return (
        <Router>
            <div className="flex">
                {/* sidebar */}
                <aside className="w-48 h-screen fixed bg-gray-800 text-white shadow flex flex-col p-4 gap-4">
                    <h1 className="text-3xl font-bold ">SHELFY</h1>
                    <Link to="/" className="font-semibold hover:text-gray-300">
                        Dashboard
                    </Link>
                    <button
                        onClick={() => setSubmenuMed(!submenuMed)}
                        className="font-semibold hover:text-gray-300 flex items-center gap-1"
                    >
                        Medicamentos
                    </button>
                    {submenuMed && (
                        <div className="ml-4 flex flex-col gap-2">
                            <Link
                                to="/medicamentos/cadastrar"
                                className="text-sm hover:text-gray-300"
                            >
                                Cadastrar
                            </Link>
                            <Link
                                to="/medicamentos/listar"
                                className="text-sm hover:text-gray-300"
                            >
                                Listar
                            </Link>
                        </div>
                    )}
                    <button
                        onClick={() => setSubmenuLot(!submenuLot)}
                        className="font-semibold hover:text-gray-300 flex items-center gap-1"
                    >
                        Lotes
                    </button>
                    {submenuLot && (
                        <div className="ml-4 flex flex-col gap-2">
                            <Link
                                to="/lotes/cadastrar"
                                className="text-sm hover:text-gray-300"
                            >
                                Cadastrar
                            </Link>
                            <Link
                                to="/lotes/listar"
                                className="text-sm hover:text-gray-300"
                            >
                                Listar
                            </Link>
                        </div>
                    )}
                </aside>

                {/* conteúdo */}
                <main className="flex-1 ml-48 min-h-screen">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="/medicamentos/cadastrar"
                            element={<MedicamentosCadastrar />}
                        />
                        <Route
                            path="/medicamentos/listar"
                            element={<MedicamentosListar />}
                        />
                        <Route
                            path="/lotes/cadastrar"
                            element={<LotesCadastrar />}
                        />
                        <Route path="/lotes/listar" element={<LotesListar />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
