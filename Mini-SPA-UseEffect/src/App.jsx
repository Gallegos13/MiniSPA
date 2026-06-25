import './App.css'
import { useEffect, useState } from 'react';

// Componente principal de la aplicación
function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [juegoActual, setJuegoActual] = useState(0);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://www.freetogame.com/api/games?category=sports');

      if (!response.ok) {
        throw new Error('Error al consultar la API');
      }

      const result = await response.json();

      setData(result);
      setJuegoActual(Math.floor(Math.random() * result.length));
    } catch {
      setError('No se pudo cargar la información.');
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          Mi mini SPA con API
        </h1>

        <p className="mt-2 text-gray-500">
          Esta aplicación consume una API externa usando useEffect.
        </p>

        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
          {isLoading && <p>Cargando información...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!isLoading && !error && data && (
            <div className="rounded-lg border bg-white p-4 shadow max-w-md mx-auto">
              <img
                src={data[juegoActual].thumbnail}
                alt={data[juegoActual].title}
                className="w-full rounded-lg"
              />

              <h2 className="mt-4 text-2xl font-bold">
                {data[juegoActual].title}
              </h2>

              <p className="mt-2 text-gray-600">
                {data[juegoActual].short_description}
              </p>

              <p>
                <strong>Género:</strong> {data[juegoActual].genre}
              </p>

              <p>
                <strong>Plataforma:</strong> {data[juegoActual].platform}
              </p>

              <p>
                <strong>Desarrollador:</strong> {data[juegoActual].developer}
              </p>

              <a
                href={data[juegoActual].game_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
              >
                Ver juego
              </a>
            </div>
          )}

          <button
            onClick={fetchData}
            disabled={isLoading}
            className="mt-6 rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white shadow-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isLoading ? 'Consultando...' : 'Consultar de nuevo'}
          </button>
        </div>
      </section>
    </main>
  );
}

export default App; // 