
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

import React, { useEffect, useState } from 'react';

 

function App() {

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

 

  const fetchData = async () => {

    try {

      setIsLoading(true);

      setError('');

 

      const response = await fetch('https://www.freetogame.com/api/games');

 

      if (!response.ok) {

        throw new Error('Error al consultar la API');

      }

 

      const result = await response.json();

 

      setData(result);

    } catch (error) {

      setError('No se pudo cargar la información.');

    } finally {

      setIsLoading(false);

    }

  };

 

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
    <>
      

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {data.slice(0, 12).map((game) => (
          <div
            key={game.id}
            className="rounded-lg border bg-white p-4 shadow"
          >
            <img
              src={game.thumbnail}
              alt={game.title}
              className="w-full rounded-lg"
            />

            <h3 className="mt-3 text-lg font-bold">
              {game.title}
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {game.short_description}
            </p>

            <p className="mt-2">
              <strong>Género:</strong> {game.genre}
            </p>

            <p>
              <strong>Plataforma:</strong> {game.platform}
            </p>

            <p>
              <strong>Desarrollador:</strong> {game.developer}
            </p>

            <a
              href={game.game_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
            >
              Ver juego
            </a>
          </div>
        ))}
      </div>
    </>
  )}
</div>

 

        <button

          onClick={fetchData}

          disabled={isLoading}

          className="mt-6 rounded-lg bg-blue-500 px-5 py-3 font-semibold text-white shadow-md hover:bg-blue-600 disabled:bg-gray-400"

        >

          {isLoading ? 'Consultando...' : 'Consultar de nuevo'}

        </button>

      </section>

    </main>

  );

}

 

export default App;