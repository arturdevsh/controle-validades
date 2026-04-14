import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Medicamentos from './pages/medicamentos'

function App() {
    const [menuAberto, setMenuAberto] = useState(false)

    return (
        <Router>
            <div className="flex">
                {/* sidebar */}
                <aside className="w-48 min-h-screen bg-gray-800 text-white shadow flex flex-col p-4 gap-4">
                    <Link to="/" className="font-semibold hover:text-gray-300">
                        Dashboard
                    </Link>
                    <Link
                        to="/medicamentos"
                        className="font-semibold hover:text-gray-300"
                    >
                        Medicamentos
                    </Link>
                </aside>

                {/* conteúdo */}
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="/medicamentos"
                            element={<Medicamentos />}
                        />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App
