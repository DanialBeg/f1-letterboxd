import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Race {
  id: number
  name: string
  circuit: string
  country: string
  date: string
  season_year: number
}

interface Review {
  id: number
  race_id: number
  race_name: string
  circuit: string
  country: string
  rating: number
  review: string
  user_name: string
  created_at: string
}

const HomePage = () => {
  const [recentRaces, setRecentRaces] = useState<Race[]>([])
  const [friendsReviews, setFriendsReviews] = useState<Review[]>([])
  const [popularRaces, setPopularRaces] = useState<Race[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch recent races (we'll get all races and sort by date)
        const racesResponse = await axios.get('http://localhost:8080/api/seasons/2024/races')
        const races = racesResponse.data
        
        // Add flag emojis to the races
        const raceFlags: { [key: string]: string } = {
          "Bahrain Grand Prix": "🇧🇭",
          "Saudi Arabian Grand Prix": "🇸🇦", 
          "Australian Grand Prix": "🇦🇺",
          "Japanese Grand Prix": "🇯🇵",
          "Chinese Grand Prix": "🇨🇳",
          "Miami Grand Prix": "🇺🇸",
          "Emilia Romagna Grand Prix": "🇮🇹",
          "Monaco Grand Prix": "🇲🇨",
          "Canadian Grand Prix": "🇨🇦",
          "Spanish Grand Prix": "🇪🇸",
          "Austrian Grand Prix": "🇦🇹",
          "British Grand Prix": "🇬🇧",
          "Hungarian Grand Prix": "🇭🇺",
          "Belgian Grand Prix": "🇧🇪",
          "Dutch Grand Prix": "🇳🇱",
          "Italian Grand Prix": "🇮🇹",
          "Azerbaijan Grand Prix": "🇦🇿",
          "Singapore Grand Prix": "🇸🇬",
          "United States Grand Prix": "🇺🇸",
          "Mexico City Grand Prix": "🇲🇽",
          "Brazilian Grand Prix": "🇧🇷",
          "Las Vegas Grand Prix": "🇺🇸",
          "Qatar Grand Prix": "🇶🇦",
          "Abu Dhabi Grand Prix": "🇦🇪"
        }
        
        const racesWithFlags = races.map((race: Race) => ({
          ...race,
          country: raceFlags[race.name] || "🏁"
        }))
        
        // Sort by date and take the most recent 6
        const sortedRaces = racesWithFlags.sort((a: Race, b: Race) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).slice(0, 6)
        setRecentRaces(sortedRaces)
        
        // For now, use same races for popular races (in real app, this would be based on review counts/ratings)
        setPopularRaces(racesWithFlags.slice(0, 6))
        
        // Mock friends reviews data (in real app, this would come from an API)
        setFriendsReviews([
          {
            id: 1,
            race_id: races[0]?.id || 1,
            race_name: races[0]?.name || "Bahrain Grand Prix",
            circuit: races[0]?.circuit || "Bahrain International Circuit",
            country: "🇧🇭",
            rating: 4,
            review: "Amazing race with great wheel-to-wheel action!",
            user_name: "Alex",
            created_at: "2024-03-02"
          },
          {
            id: 2,
            race_id: races[1]?.id || 2,
            race_name: races[1]?.name || "Saudi Arabian Grand Prix",
            circuit: races[1]?.circuit || "Jeddah Corniche Circuit",
            country: "🇸🇦",
            rating: 5,
            review: "Absolutely incredible race! Best of the season so far.",
            user_name: "Sarah",
            created_at: "2024-03-09"
          },
          {
            id: 3,
            race_id: races[2]?.id || 3,
            race_name: races[2]?.name || "Australian Grand Prix",
            circuit: races[2]?.circuit || "Albert Park Circuit",
            country: "🇦🇺",
            rating: 3,
            review: "Good race but a bit predictable.",
            user_name: "Mike",
            created_at: "2024-03-24"
          }
        ])
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        // Fallback data
        setRecentRaces([
          { id: 1, name: "Bahrain Grand Prix", circuit: "Bahrain International Circuit", country: "🇧🇭", date: "2024-03-02", season_year: 2024 },
          { id: 2, name: "Saudi Arabian Grand Prix", circuit: "Jeddah Corniche Circuit", country: "🇸🇦", date: "2024-03-09", season_year: 2024 },
          { id: 3, name: "Australian Grand Prix", circuit: "Albert Park Circuit", country: "🇦🇺", date: "2024-03-24", season_year: 2024 }
        ])
        setPopularRaces([
          { id: 4, name: "Japanese Grand Prix", circuit: "Suzuka Circuit", country: "🇯🇵", date: "2024-04-07", season_year: 2024 },
          { id: 5, name: "Chinese Grand Prix", circuit: "Shanghai International Circuit", country: "🇨🇳", date: "2024-04-21", season_year: 2024 },
          { id: 6, name: "Miami Grand Prix", circuit: "Miami International Autodrome", country: "🇺🇸", date: "2024-05-05", season_year: 2024 }
        ])
        setFriendsReviews([
          {
            id: 1,
            race_id: 1,
            race_name: "Bahrain Grand Prix",
            circuit: "Bahrain International Circuit",
            country: "🇧🇭",
            rating: 4,
            review: "Amazing race with great wheel-to-wheel action!",
            user_name: "Alex",
            created_at: "2024-03-02"
          },
          {
            id: 2,
            race_id: 2,
            race_name: "Saudi Arabian Grand Prix",
            circuit: "Jeddah Corniche Circuit",
            country: "🇸🇦",
            rating: 5,
            review: "Absolutely incredible race! Best of the season so far.",
            user_name: "Sarah",
            created_at: "2024-03-09"
          },
          {
            id: 3,
            race_id: 3,
            race_name: "Australian Grand Prix",
            circuit: "Albert Park Circuit",
            country: "🇦🇺",
            rating: 3,
            review: "Good race but a bit predictable.",
            user_name: "Mike",
            created_at: "2024-03-24"
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <div className="hero-section">
        <h1 className="hero-title">Track every F1 race you've watched.</h1>
        <p className="hero-subtitle">
          Save those you want to see. Tell your friends what's good.
        </p>
      </div>

      {/* Recent Races Gallery */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Races</h2>
          <Link to="/races" className="view-all-link">View all races this season →</Link>
        </div>
        <div className="races-gallery">
          {recentRaces.map((race) => (
            <Link key={race.id} to={`/races/${race.id}`} className="race-card-gallery">
              <div className="race-poster">
                <div className="race-flag">{race.country}</div>
              </div>
              <div className="race-info">
                <h3 className="race-name">{race.name}</h3>
                <p className="race-circuit">{race.circuit}</p>
                <p className="race-date">{new Date(race.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Friends Reviews */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Reviews from Friends</h2>
          <Link to="/reviews" className="view-all-link">View all reviews →</Link>
        </div>
        <div className="races-gallery">
          {friendsReviews.map((review) => (
            <Link key={review.id} to={`/races/${review.race_id}`} className="race-card-gallery friend-review-card">
              <div className="race-poster">
                <div className="race-flag">{review.country}</div>
              </div>
              <div className="race-info">
                <h3 className="race-name">{review.race_name}</h3>
                <p className="race-circuit">{review.circuit}</p>
                <div className="friend-review-info">
                  <div className="friend-avatar">
                    {review.user_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="friend-rating">
                    <span className="stars">{renderStars(review.rating)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Races */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Popular Races</h2>
          <Link to="/races" className="view-all-link">View all races →</Link>
        </div>
        <div className="races-gallery">
          {popularRaces.map((race) => (
            <Link key={race.id} to={`/races/${race.id}`} className="race-card-gallery">
              <div className="race-poster">
                <div className="race-flag">{race.country}</div>
              </div>
              <div className="race-info">
                <h3 className="race-name">{race.name}</h3>
                <p className="race-circuit">{race.circuit}</p>
                <p className="race-date">{new Date(race.date).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage