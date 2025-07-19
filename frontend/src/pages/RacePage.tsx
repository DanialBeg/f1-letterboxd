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
  likes: number
  is_friend: boolean
  user_liked: boolean
}

const RacePage = () => {
  const { id } = useParams<{ id: string }>()
  const [race, setRace] = useState<Race | null>(null)
  const [, setReviews] = useState<Review[]>([])
  const [friendsReviews, setFriendsReviews] = useState<Review[]>([])
  const [popularReviews, setPopularReviews] = useState<Review[]>([])
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
        
        // For now, always use prototype data to showcase the friends/likes functionality
        // In a real app, you'd extend the API to include is_friend, likes, and user_liked fields
        let allReviews = reviewsResponse.data
        // Always use prototype data for demo
        allReviews = [
            {
              id: 1,
              user_name: 'Alex',
              rating: 4,
              comment: 'Great season opener! The battle between Max and Charles was intense. Loved seeing the new regulations in action.',
              created_at: '2024-03-03T10:00:00Z',
              likes: 12,
              is_friend: true,
              user_liked: false
            },
            {
              id: 2,
              user_name: 'Sarah',
              rating: 5,
              comment: 'Absolutely brilliant race. The strategy calls were perfect and the overtakes were spectacular. Best opener in years!',
              created_at: '2024-03-04T15:30:00Z',
              likes: 18,
              is_friend: true,
              user_liked: true
            },
            {
              id: 3,
              user_name: 'Mike',
              rating: 3,
              comment: 'Solid race but nothing too surprising. Expected more drama from the midfield. Still enjoyable though.',
              created_at: '2024-03-04T09:45:00Z',
              likes: 6,
              is_friend: true,
              user_liked: false
            },
            {
              id: 4,
              user_name: 'Emma',
              rating: 4,
              comment: 'Really impressed with the racing quality! The wheel-to-wheel action was fantastic and the DRS zones worked well.',
              created_at: '2024-03-03T18:20:00Z',
              likes: 14,
              is_friend: true,
              user_liked: true
            },
            {
              id: 5,
              user_name: 'Jordan',
              rating: 5,
              comment: 'What a start to the season! That battle for P3 was incredible. Can\'t wait for the next race!',
              created_at: '2024-03-03T16:10:00Z',
              likes: 9,
              is_friend: true,
              user_liked: false
            },
            {
              id: 6,
              user_name: 'RacingEnthusiast',
              rating: 4,
              comment: 'Amazing wheel-to-wheel action throughout the race. Best opening race in years! The new car designs really delivered.',
              created_at: '2024-03-05T09:15:00Z',
              likes: 45,
              is_friend: false,
              user_liked: false
            },
            {
              id: 7,
              user_name: 'F1Fanatic',
              rating: 3,
              comment: 'Good race but predictable outcome. Expected more from the midfield battles. At least the weather held up.',
              created_at: '2024-03-05T14:20:00Z',
              likes: 23,
              is_friend: false,
              user_liked: true
            },
            {
              id: 8,
              user_name: 'SpeedDemon',
              rating: 5,
              comment: 'Absolutely electric atmosphere! The crowd was incredible and the racing matched the energy. Pure motorsport magic.',
              created_at: '2024-03-06T11:30:00Z',
              likes: 67,
              is_friend: false,
              user_liked: false
            },
            {
              id: 9,
              user_name: 'CircuitWalker',
              rating: 2,
              comment: 'Disappointing race tbh. Too much following, not enough overtaking. The track layout doesn\'t help with close racing.',
              created_at: '2024-03-06T20:15:00Z',
              likes: 15,
              is_friend: false,
              user_liked: false
            },
            {
              id: 10,
              user_name: 'F1Historian',
              rating: 4,
              comment: 'Great technical racing with smart strategy calls. Reminded me of some classic Bahrain battles from the past.',
              created_at: '2024-03-07T08:45:00Z',
              likes: 31,
              is_friend: false,
              user_liked: true
            }
        ]
        
        setReviews(allReviews)
        
        // Separate friends' reviews and popular reviews
        const friends = allReviews.filter((review: Review) => review.is_friend)
        const others = allReviews.filter((review: Review) => !review.is_friend)
        
        setFriendsReviews(friends)
        setPopularReviews(others.sort((a: Review, b: Review) => b.likes - a.likes))
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
        const fallbackReviews = [
          {
            id: 1,
            user_name: 'Alex',
            rating: 4,
            comment: 'Great season opener! The battle between Max and Charles was intense. Loved seeing the new regulations in action.',
            created_at: '2024-03-03T10:00:00Z',
            likes: 12,
            is_friend: true,
            user_liked: false
          },
          {
            id: 2,
            user_name: 'Sarah',
            rating: 5,
            comment: 'Absolutely brilliant race. The strategy calls were perfect and the overtakes were spectacular. Best opener in years!',
            created_at: '2024-03-04T15:30:00Z',
            likes: 18,
            is_friend: true,
            user_liked: true
          },
          {
            id: 3,
            user_name: 'Mike',
            rating: 3,
            comment: 'Solid race but nothing too surprising. Expected more drama from the midfield. Still enjoyable though.',
            created_at: '2024-03-04T09:45:00Z',
            likes: 6,
            is_friend: true,
            user_liked: false
          },
          {
            id: 4,
            user_name: 'Emma',
            rating: 4,
            comment: 'Really impressed with the racing quality! The wheel-to-wheel action was fantastic and the DRS zones worked well.',
            created_at: '2024-03-03T18:20:00Z',
            likes: 14,
            is_friend: true,
            user_liked: true
          },
          {
            id: 5,
            user_name: 'Jordan',
            rating: 5,
            comment: 'What a start to the season! That battle for P3 was incredible. Can\'t wait for the next race!',
            created_at: '2024-03-03T16:10:00Z',
            likes: 9,
            is_friend: true,
            user_liked: false
          },
          {
            id: 6,
            user_name: 'RacingEnthusiast',
            rating: 4,
            comment: 'Amazing wheel-to-wheel action throughout the race. Best opening race in years! The new car designs really delivered.',
            created_at: '2024-03-05T09:15:00Z',
            likes: 45,
            is_friend: false,
            user_liked: false
          },
          {
            id: 7,
            user_name: 'F1Fanatic',
            rating: 3,
            comment: 'Good race but predictable outcome. Expected more from the midfield battles. At least the weather held up.',
            created_at: '2024-03-05T14:20:00Z',
            likes: 23,
            is_friend: false,
            user_liked: true
          },
          {
            id: 8,
            user_name: 'SpeedDemon',
            rating: 5,
            comment: 'Absolutely electric atmosphere! The crowd was incredible and the racing matched the energy. Pure motorsport magic.',
            created_at: '2024-03-06T11:30:00Z',
            likes: 67,
            is_friend: false,
            user_liked: false
          },
          {
            id: 9,
            user_name: 'CircuitWalker',
            rating: 2,
            comment: 'Disappointing race tbh. Too much following, not enough overtaking. The track layout doesn\'t help with close racing.',
            created_at: '2024-03-06T20:15:00Z',
            likes: 15,
            is_friend: false,
            user_liked: false
          },
          {
            id: 10,
            user_name: 'F1Historian',
            rating: 4,
            comment: 'Great technical racing with smart strategy calls. Reminded me of some classic Bahrain battles from the past.',
            created_at: '2024-03-07T08:45:00Z',
            likes: 31,
            is_friend: false,
            user_liked: true
          }
        ]
        
        setReviews(fallbackReviews)
        setFriendsReviews(fallbackReviews.filter(review => review.is_friend))
        setPopularReviews(fallbackReviews.filter(review => !review.is_friend).sort((a, b) => b.likes - a.likes))
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
      const allReviews = reviewsResponse.data
      setReviews(allReviews)
      
      // Separate friends' reviews and popular reviews
      const friends = allReviews.filter((review: Review) => review.is_friend)
      const others = allReviews.filter((review: Review) => !review.is_friend)
      
      setFriendsReviews(friends)
      setPopularReviews(others.sort((a: Review, b: Review) => b.likes - a.likes))
      
      setNewReview({ user_name: '', rating: 0, comment: '' })
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }

  const handleLikeToggle = async (reviewId: number) => {
    try {
      // In a real app, this would make an API call
      // await axios.post(`http://localhost:8080/api/reviews/${reviewId}/like`)
      
      // For demo, update locally
      const updateReviews = (reviewsList: Review[]) => 
        reviewsList.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                likes: review.user_liked ? review.likes - 1 : review.likes + 1,
                user_liked: !review.user_liked 
              }
            : review
        )
      
      setReviews(updateReviews)
      setFriendsReviews(updateReviews)
      setPopularReviews(prev => updateReviews(prev).sort((a, b) => b.likes - a.likes))
      
    } catch (error) {
      console.error('Error toggling like:', error)
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

  const renderReviewCard = (review: Review) => (
    <div key={review.id} className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">
            {review.user_name.charAt(0).toUpperCase()}
          </div>
          <span className="reviewer-name">{review.user_name}</span>
        </div>
        <div className="review-actions">
          <div className="review-rating">
            {renderRatingDots(review.rating)}
          </div>
          <button 
            className={`like-button ${review.user_liked ? 'liked' : ''}`}
            onClick={() => handleLikeToggle(review.id)}
          >
            <span className="heart-icon">♥</span>
            <span className="like-count">{review.likes}</span>
          </button>
        </div>
      </div>
      <div className="review-comment">{review.comment}</div>
    </div>
  )

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

          {/* Friends' Reviews */}
          {friendsReviews.length > 0 && (
            <div className="reviews-subsection">
              <h3 className="subsection-title">Reviews from friends</h3>
              <div className="reviews-list">
                {friendsReviews.map(renderReviewCard)}
              </div>
            </div>
          )}

          {/* Popular Reviews */}
          {popularReviews.length > 0 && (
            <div className="reviews-subsection">
              <h3 className="subsection-title">Popular reviews</h3>
              <div className="reviews-list">
                {popularReviews.map(renderReviewCard)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RacePage