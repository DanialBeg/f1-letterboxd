import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface UserReview {
  id: number
  race_id: number
  race_name: string
  circuit: string
  country: string
  season_year: number
  rating: number
  comment: string
  created_at: string
  likes: number
  user_liked: boolean
}

const ReviewsPage = () => {
  const [userReviews, setUserReviews] = useState<UserReview[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        // In a real app, this would fetch the current user's reviews
        // For now, use prototype data
        const prototypeReviews = [
          {
            id: 1,
            race_id: 1,
            race_name: "Bahrain Grand Prix",
            circuit: "Bahrain International Circuit",
            country: "🇧🇭",
            season_year: 2024,
            rating: 4,
            comment: "Great season opener! The battle between Max and Charles was intense. Loved seeing the new regulations in action.",
            created_at: "2024-03-03T10:00:00Z",
            likes: 12,
            user_liked: false
          },
          {
            id: 2,
            race_id: 2,
            race_name: "Saudi Arabian Grand Prix",
            circuit: "Jeddah Corniche Circuit",
            country: "🇸🇦",
            season_year: 2024,
            rating: 5,
            comment: "Absolutely brilliant race. The strategy calls were perfect and the overtakes were spectacular. Best opener in years!",
            created_at: "2024-03-09T15:30:00Z",
            likes: 18,
            user_liked: true
          },
          {
            id: 3,
            race_id: 3,
            race_name: "Australian Grand Prix",
            circuit: "Albert Park Circuit",
            country: "🇦🇺",
            season_year: 2024,
            rating: 3,
            comment: "Solid race but nothing too surprising. Expected more drama from the midfield. Still enjoyable though.",
            created_at: "2024-03-24T09:45:00Z",
            likes: 6,
            user_liked: false
          },
          {
            id: 4,
            race_id: 4,
            race_name: "Japanese Grand Prix",
            circuit: "Suzuka Circuit",
            country: "🇯🇵",
            season_year: 2024,
            rating: 5,
            comment: "Suzuka never disappoints! The technical nature of this track really showed the skill differences between drivers.",
            created_at: "2024-04-07T14:20:00Z",
            likes: 25,
            user_liked: true
          },
          {
            id: 5,
            race_id: 5,
            race_name: "Chinese Grand Prix",
            circuit: "Shanghai International Circuit",
            country: "🇨🇳",
            season_year: 2024,
            rating: 4,
            comment: "Welcome back to Shanghai! The track changes really improved the racing. Great to see F1 back in China.",
            created_at: "2024-04-21T11:10:00Z",
            likes: 14,
            user_liked: false
          },
          {
            id: 6,
            race_id: 6,
            race_name: "Miami Grand Prix",
            circuit: "Miami International Autodrome",
            country: "🇺🇸",
            season_year: 2024,
            rating: 3,
            comment: "The atmosphere was incredible but the racing was a bit processional. Track needs some tweaks for better overtaking.",
            created_at: "2024-05-05T16:30:00Z",
            likes: 9,
            user_liked: false
          }
        ]
        
        setUserReviews(prototypeReviews)
      } catch (error) {
        console.error('Error fetching user reviews:', error)
        setUserReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchUserReviews()
  }, [])

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const handleLikeToggle = async (reviewId: number) => {
    try {
      // In a real app, this would make an API call
      // For demo, update locally
      setUserReviews(prev => 
        prev.map(review => 
          review.id === reviewId 
            ? { 
                ...review, 
                likes: review.user_liked ? review.likes - 1 : review.likes + 1,
                user_liked: !review.user_liked 
              }
            : review
        )
      )
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  if (loading) {
    return <div className="loading">Loading your reviews...</div>
  }

  return (
    <div className="reviews-page">
      <div className="page-header">
        <h1 className="page-title">Your Reviews</h1>
        <p className="page-subtitle">
          All the races you've reviewed • {userReviews.length} reviews
        </p>
      </div>

      {userReviews.length === 0 ? (
        <div className="empty-state">
          <h3>No reviews yet</h3>
          <p>Start reviewing races to see them here!</p>
          <Link to="/races" className="cta-button">Browse Races</Link>
        </div>
      ) : (
        <div className="user-reviews-container">
          <div className="user-reviews-grid">
            {userReviews.map((review) => (
              <div key={review.id} className="user-review-card">
                <Link to={`/races/${review.race_id}`} className="review-race-link">
                  <div className="review-race-poster">
                    <div className="race-flag">{review.country}</div>
                  </div>
                  <div className="review-race-info">
                    <h3 className="review-race-name">{review.race_name}</h3>
                    <p className="review-race-circuit">{review.circuit}</p>
                    <p className="review-race-year">{review.season_year}</p>
                  </div>
                </Link>
                
                <div className="review-content">
                  <div className="review-header">
                    <div className="review-rating">
                      <span className="stars">{renderStars(review.rating)}</span>
                      <span className="rating-text">({review.rating}/5)</span>
                    </div>
                    <button 
                      className={`like-button ${review.user_liked ? 'liked' : ''}`}
                      onClick={() => handleLikeToggle(review.id)}
                    >
                      <span className="heart-icon">♥</span>
                      <span className="like-count">{review.likes}</span>
                    </button>
                  </div>
                  
                  <p className="review-comment">{review.comment}</p>
                  
                  <div className="review-meta">
                    <span className="review-date">
                      {new Date(review.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ReviewsPage