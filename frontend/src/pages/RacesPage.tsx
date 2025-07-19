import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Season {
  id: number
  year: number
  name: string
}

const RacesPage = () => {
  const [seasons, setSeasons] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/seasons')
        setSeasons(response.data)
      } catch (error) {
        console.error('Error fetching seasons:', error)
        // Fallback data for demo
        setSeasons([
          { id: 1, year: 2024, name: '2024 Formula 1 World Championship' },
          { id: 2, year: 2023, name: '2023 Formula 1 World Championship' },
          { id: 3, year: 2022, name: '2022 Formula 1 World Championship' },
          { id: 4, year: 2021, name: '2021 Formula 1 World Championship' }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchSeasons()
  }, [])

  if (loading) {
    return <div className="loading">Loading seasons...</div>
  }

  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">Browse F1 Races</h1>
        <p className="hero-subtitle">
          Explore races from every Formula 1 season
        </p>
      </div>
      
      <div className="seasons-container">
        <div className="section-header">
          <h2 className="section-title">Browse by Season</h2>
          <p className="section-subtitle">Discover races from Formula 1's greatest years</p>
        </div>
        
        <div className="seasons-grid">
          {seasons.map((season) => (
            <Link
              key={season.id}
              to={`/seasons/${season.year}`}
              className="season-card"
            >
              <div className="season-year">{season.year}</div>
              <div className="season-name">{season.name.replace(`${season.year} `, '')}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RacesPage