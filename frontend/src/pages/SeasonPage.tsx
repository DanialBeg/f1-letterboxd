import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

interface Race {
  id: number
  name: string
  location: string
  date: string
  round_number: number
  circuit_name: string
  winner: string
  poster_url: string
  average_rating: number
  review_count: number
}

const SeasonPage = () => {
  const { year } = useParams<{ year: string }>()
  const [races, setRaces] = useState<Race[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/seasons/${year}/races`)
        setRaces(response.data)
      } catch (error) {
        console.error('Error fetching races:', error)
        // Fallback data for demo
        setRaces([
          {
            id: 1,
            name: 'Bahrain Grand Prix',
            location: 'Sakhir, Bahrain',
            date: '2024-03-02',
            round_number: 1,
            circuit_name: 'Bahrain International Circuit',
            winner: 'Max Verstappen',
            poster_url: '',
            average_rating: 4.2,
            review_count: 15
          },
          {
            id: 2,
            name: 'Saudi Arabian Grand Prix',
            location: 'Jeddah, Saudi Arabia',
            date: '2024-03-09',
            round_number: 2,
            circuit_name: 'Jeddah Corniche Circuit',
            winner: 'Max Verstappen',
            poster_url: '',
            average_rating: 3.8,
            review_count: 12
          },
          {
            id: 3,
            name: 'Australian Grand Prix',
            location: 'Melbourne, Australia',
            date: '2024-03-24',
            round_number: 3,
            circuit_name: 'Albert Park Circuit',
            winner: 'Carlos Sainz',
            poster_url: '',
            average_rating: 4.5,
            review_count: 23
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRaces()
  }, [year])

  if (loading) {
    return <div className="loading">Loading races...</div>
  }

  const renderRatingDots = (rating: number) => {
    const dots = []
    
    for (let i = 1; i <= 5; i++) {
      const isFull = i <= Math.floor(rating)
      const isHalf = i === Math.ceil(rating) && rating % 1 === 0.5
      
      dots.push(
        <span
          key={i}
          className={`rating-dot ${isFull ? 'filled' : isHalf ? 'half' : ''}`}
        />
      )
    }
    return dots
  }

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>{year} Season</span>
      </div>
      
      <div className="races-container">
        <div className="section-header">
          <h1 className="page-title">{year} Formula 1 Season</h1>
          <p className="section-subtitle">
            {races.length} races • Track the ones you've watched
          </p>
        </div>
        
        <div className="races-grid">
          {races.map((race) => (
            <Link
              key={race.id}
              to={`/races/${race.id}`}
              className="race-card"
            >
              <div 
                className="race-poster"
                style={{
                  backgroundImage: race.poster_url ? `url(${race.poster_url})` : undefined
                }}
              >
                <div className="race-poster-content">
                  <div className="race-round">Round {race.round_number}</div>
                  <div className="race-poster-title">{race.name.replace(' Grand Prix', '')}</div>
                </div>
              </div>
              <div className="race-info">
                <div className="race-name">{race.name}</div>
                <div className="race-location">{race.location}</div>
                <div className="race-date">{new Date(race.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}</div>
                {race.review_count > 0 && (
                  <div className="race-rating">
                    <div className="rating-dots">
                      {renderRatingDots(race.average_rating)}
                    </div>
                    <span className="rating-count">{race.review_count} reviews</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SeasonPage