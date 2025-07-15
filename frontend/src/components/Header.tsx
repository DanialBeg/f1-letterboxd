import { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          F1 Letterboxd
        </Link>
        
        <div className="search-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-icon">
              🔍
            </div>
            <input
              type="text"
              className="search-input"
              placeholder="Search races, circuits, drivers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        <nav>
          <ul className="nav-links">
            <li><Link to="/">Races</Link></li>
            <li><Link to="/reviews">Reviews</Link></li>
            <li><Link to="/watchlist">Watchlist</Link></li>
            <li><Link to="/" className="write-review-btn">+ Review</Link></li>
            <li><Link to="/profile" className="profile-link">Profile</Link></li>
            <li><button className="sign-out-btn">Sign Out</button></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header