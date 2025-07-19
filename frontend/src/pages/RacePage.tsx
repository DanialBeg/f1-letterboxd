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
  winning_constructor: string
  second_place: string
  third_place: string
  poster_url: string
  average_rating: number
  review_count: number
  season: {
    year: number
  }
}

interface Review {
  id: number
  user_name: string
  rating: number
  comment: string
  created_at: string
}

const RacePage = () => {
  const { id } = useParams<{ id: string }>()
  const [race, setRace] = useState<Race | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [newReview, setNewReview] = useState({
    user_name: '',
    rating: 0,
    comment: ''
  })
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    const fetchRaceData = async () => {
      try {
        const [raceResponse, reviewsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/races/${id}`),
          axios.get(`http://localhost:8080/api/races/${id}/reviews`)
        ])
        setRace(raceResponse.data)
        setReviews(reviewsResponse.data)
      } catch (error) {
        console.error('Error fetching race data:', error)
        // Fallback data for demo
        setRace({
          id: 1,
          name: 'Bahrain Grand Prix',
          location: 'Sakhir, Bahrain',
          date: '2024-03-02',
          round_number: 1,
          circuit_name: 'Bahrain International Circuit',
          winner: 'Max Verstappen',
          winning_constructor: 'Red Bull Racing',
          second_place: 'Sergio Perez',
          third_place: 'Carlos Sainz',
          poster_url: '',
          average_rating: 4.2,
          review_count: 2,
          season: { year: 2024 }
        })
        setReviews([
          {
            id: 1,
            user_name: 'F1Fan2024',
            rating: 4,
            comment: 'Great season opener! The battle between Max and Charles was intense.',
            created_at: '2024-03-03T10:00:00Z'
          },
          {
            id: 2,
            user_name: 'RacingEnthusiast',
            rating: 5,
            comment: 'Absolutely brilliant race. The strategy calls were perfect and the overtakes were spectacular.',
            created_at: '2024-03-04T15:30:00Z'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRaceData()
  }, [id])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`http://localhost:8080/api/races/${id}/reviews`, newReview)
      // Refresh reviews
      const reviewsResponse = await axios.get(`http://localhost:8080/api/races/${id}/reviews`)
      setReviews(reviewsResponse.data)
      setNewReview({ user_name: '', rating: 0, comment: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  const renderRatingDots = (rating: number, interactive = false) => {
    const dots = []
    const displayRating = interactive && hoverRating > 0 ? hoverRating : rating
    
    for (let i = 1; i <= 5; i++) {
      const isFull = i <= Math.floor(displayRating)
      const isHalf = i === Math.ceil(displayRating) && displayRating % 1 === 0.5
      
      if (interactive) {
        dots.push(
          <span 
            key={i} 
            className="star-container"
            onMouseLeave={() => setHoverRating(0)}
          >
            <span
              className={`star-half star-left ${i - 0.5 <= displayRating ? 'active' : ''}`}
              onClick={() => setNewReview({ ...newReview, rating: i - 0.5 })}
              onMouseEnter={() => setHoverRating(i - 0.5)}
            />
            <span
              className={`star-half star-right ${i <= displayRating ? 'active' : ''}`}
              onClick={() => setNewReview({ ...newReview, rating: i })}
              onMouseEnter={() => setHoverRating(i)}
            />
          </span>
        )
      } else {
        dots.push(
          <span key={i} className={`star ${isFull ? 'active' : isHalf ? 'half' : ''}`} />
        )
      }
    }
    return dots
  }

  if (loading) {
    return <div className="loading">Loading race details...</div>
  }

  if (!race) {
    return <div className="loading">Race not found</div>
  }

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <Link to={`/seasons/${race.season.year}`}>{race.season.year} Season</Link>
        <span>{race.name}</span>
      </div>

      <div className="race-detail">
        <div className="race-detail-header">
          <div 
            className="race-detail-poster"
            style={{
              backgroundImage: race.poster_url ? `url(${race.poster_url})` : undefined
            }}
          >
            <div className="race-detail-poster-content">
              <div className="race-round">Round {race.round_number}</div>
              <div className="race-poster-title">{race.name.replace(' Grand Prix', '')}</div>
            </div>
          </div>
          
          <div className="race-detail-info">
            <h1 className="race-detail-title">{race.name}</h1>
            <p style={{ color: '#9ab', marginBottom: '24px' }}>
              {race.location} • {new Date(race.date + 'T12:00:00').toLocaleDateString('en-US', { 
                year: 'numeric',
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            
            <div className="race-meta">
              <div className="meta-item">
                <div className="meta-label">🏁 Circuit</div>
                <div className="meta-value">{race.circuit_name}</div>
              </div>
              <div className="meta-item">
                <div className="meta-label">🏆 Winner</div>
                <div className="meta-value">{race.winner}</div>
              </div>
              {race.winning_constructor && (
                <div className="meta-item">
                  <div className="meta-label">🏎️ Winning Constructor</div>
                  <div className="meta-value">{race.winning_constructor}</div>
                </div>
              )}
              {race.second_place && race.third_place && (
                <div className="meta-item">
                  <div className="meta-label">🏅 Remaining Podium Places</div>
                  <div className="meta-value">
                    🥈 2nd: {race.second_place}<br />
                    🥉 3rd: {race.third_place}
                  </div>
                </div>
              )}
              {race.review_count > 0 && (
                <div className="meta-item">
                  <div className="meta-label">⭐ Average Rating</div>
                  <div className="meta-value">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {renderRatingDots(Math.round(race.average_rating))}
                      </div>
                      <span>({race.average_rating.toFixed(1)})</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="meta-item">
                <div className="meta-label">Reviews</div>
                <div className="meta-value">{race.review_count} reviews</div>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-section">
          <div className="reviews-header">
            <h2 className="reviews-title">Reviews</h2>
            <p className="section-subtitle">Share your thoughts on this race</p>
          </div>
          
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-input"
                value={newReview.user_name}
                onChange={(e) => setNewReview({ ...newReview, user_name: e.target.value })}
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Rating</label>
              <div className="rating-input">
                {renderRatingDots(newReview.rating, true)}
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Review</label>
              <textarea
                className="form-input form-textarea"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="What did you think of this race? Any memorable moments or standout performances?"
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Add Review
            </button>
          </form>

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.user_name.charAt(0).toUpperCase()}
                    </div>
                    <span className="reviewer-name">{review.user_name}</span>
                  </div>
                  <div className="review-rating">
                    {renderRatingDots(review.rating)}
                  </div>
                </div>
                <div className="review-comment">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RacePage