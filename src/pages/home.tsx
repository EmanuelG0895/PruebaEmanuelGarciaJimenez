"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Image from "next/image"

export default function Home() {
  const [characters, setCharacters] = useState<
    {
      id: number
      name: string
      status: string
      species: string
      image: string
      origin: { name: string }
      location: { name: string }
    }[]
  >([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/")
      return
    }

    const fetchCharacters = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/character")
        if (!response.ok) throw new Error("Failed to fetch characters")
        const data = await response.json()
        setCharacters(data.results)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error, por favor intenta más tarde")
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-900 to-black text-green-400 font-mono text-2xl">
        Cargando universo de Rick y Morty...
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-red-500 font-mono text-xl">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-purple-900 to-black text-white font-mono">
      <Head>
        <title>Rick and Morty Universe</title>
        <meta name="description" content="Explora personajes de Rick and Morty" />
      </Head>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-green-400 drop-shadow-lg">Rick and Morty Universe</h1>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition-all shadow-md"
          >
            🚪 Salir
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {characters.map((character) => (
            <div
              key={character.id}
              className="bg-black bg-opacity-40 border border-green-400 rounded-xl overflow-hidden shadow-lg hover:shadow-green-400 transition-shadow duration-300"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={character.image}
                  alt={character.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-green-300 truncate">{character.name}</h3>
                <div className="mt-2 flex items-center">
                  <span
                    className={`inline-block h-3 w-3 rounded-full mr-2 ${
                      character.status === "Alive"
                        ? "bg-green-500"
                        : character.status === "Dead"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                  <span className="text-sm text-gray-300">
                    {character.status} - {character.species}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-400">
                  <p>🌍 Origen: {character.origin.name}</p>
                  <p>📍 Ubicación: {character.location.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
