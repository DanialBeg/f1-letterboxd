import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Season {
  id: number
  year: number
  name: string
  drivers_champion?: string
  constructors_champion?: string
}

const RacesPage = () => {
  const [, setSeasons] = useState<Season[]>([])
  const [groupedSeasons, setGroupedSeasons] = useState<{ [decade: string]: Season[] }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/seasons')
        // For now, always use enhanced data with champions to showcase the feature
        // In a real app, you'd extend the API to include drivers_champion and constructors_champion fields
        const seasonsData = response.data
        
        // Comprehensive champion data for all F1 seasons
        const championData: { [key: number]: { drivers_champion: string, constructors_champion: string } } = {
          // 2020s
          2025: { drivers_champion: 'TBD', constructors_champion: 'TBD' },
          2024: { drivers_champion: 'Max Verstappen', constructors_champion: 'Red Bull Racing' },
          2023: { drivers_champion: 'Max Verstappen', constructors_champion: 'Red Bull Racing' },
          2022: { drivers_champion: 'Max Verstappen', constructors_champion: 'Red Bull Racing' },
          2021: { drivers_champion: 'Max Verstappen', constructors_champion: 'Red Bull Racing' },
          2020: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Mercedes' },
          
          // 2010s
          2019: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Mercedes' },
          2018: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Mercedes' },
          2017: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Mercedes' },
          2016: { drivers_champion: 'Nico Rosberg', constructors_champion: 'Mercedes' },
          2015: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Mercedes' },
          2014: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Mercedes' },
          2013: { drivers_champion: 'Sebastian Vettel', constructors_champion: 'Red Bull Racing' },
          2012: { drivers_champion: 'Sebastian Vettel', constructors_champion: 'Red Bull Racing' },
          2011: { drivers_champion: 'Sebastian Vettel', constructors_champion: 'Red Bull Racing' },
          2010: { drivers_champion: 'Sebastian Vettel', constructors_champion: 'Red Bull Racing' },
          
          // 2000s
          2009: { drivers_champion: 'Jenson Button', constructors_champion: 'Brawn GP' },
          2008: { drivers_champion: 'Lewis Hamilton', constructors_champion: 'Ferrari' },
          2007: { drivers_champion: 'Kimi Raikkonen', constructors_champion: 'Ferrari' },
          2006: { drivers_champion: 'Fernando Alonso', constructors_champion: 'Renault' },
          2005: { drivers_champion: 'Fernando Alonso', constructors_champion: 'Renault' },
          2004: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Ferrari' },
          2003: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Ferrari' },
          2002: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Ferrari' },
          2001: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Ferrari' },
          2000: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Ferrari' },
          
          // 1990s
          1999: { drivers_champion: 'Mika Hakkinen', constructors_champion: 'Ferrari' },
          1998: { drivers_champion: 'Mika Hakkinen', constructors_champion: 'McLaren' },
          1997: { drivers_champion: 'Jacques Villeneuve', constructors_champion: 'Williams' },
          1996: { drivers_champion: 'Damon Hill', constructors_champion: 'Williams' },
          1995: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Benetton' },
          1994: { drivers_champion: 'Michael Schumacher', constructors_champion: 'Williams' },
          1993: { drivers_champion: 'Alain Prost', constructors_champion: 'Williams' },
          1992: { drivers_champion: 'Nigel Mansell', constructors_champion: 'Williams' },
          1991: { drivers_champion: 'Ayrton Senna', constructors_champion: 'McLaren' },
          1990: { drivers_champion: 'Ayrton Senna', constructors_champion: 'McLaren' },
          
          // 1980s
          1989: { drivers_champion: 'Alain Prost', constructors_champion: 'McLaren' },
          1988: { drivers_champion: 'Ayrton Senna', constructors_champion: 'McLaren' },
          1987: { drivers_champion: 'Nelson Piquet', constructors_champion: 'Williams' },
          1986: { drivers_champion: 'Alain Prost', constructors_champion: 'Williams' },
          1985: { drivers_champion: 'Alain Prost', constructors_champion: 'McLaren' },
          1984: { drivers_champion: 'Niki Lauda', constructors_champion: 'McLaren' },
          1983: { drivers_champion: 'Nelson Piquet', constructors_champion: 'Ferrari' },
          1982: { drivers_champion: 'Keke Rosberg', constructors_champion: 'Ferrari' },
          1981: { drivers_champion: 'Nelson Piquet', constructors_champion: 'Williams' },
          1980: { drivers_champion: 'Alan Jones', constructors_champion: 'Williams' },
          
          // 1970s
          1979: { drivers_champion: 'Jody Scheckter', constructors_champion: 'Ferrari' },
          1978: { drivers_champion: 'Mario Andretti', constructors_champion: 'Lotus' },
          1977: { drivers_champion: 'Niki Lauda', constructors_champion: 'Ferrari' },
          1976: { drivers_champion: 'James Hunt', constructors_champion: 'Ferrari' },
          1975: { drivers_champion: 'Niki Lauda', constructors_champion: 'Ferrari' },
          1974: { drivers_champion: 'Emerson Fittipaldi', constructors_champion: 'McLaren' },
          1973: { drivers_champion: 'Jackie Stewart', constructors_champion: 'Lotus' },
          1972: { drivers_champion: 'Emerson Fittipaldi', constructors_champion: 'Lotus' },
          1971: { drivers_champion: 'Jackie Stewart', constructors_champion: 'Tyrrell' },
          1970: { drivers_champion: 'Jochen Rindt', constructors_champion: 'Lotus' },
          
          // 1960s
          1969: { drivers_champion: 'Jackie Stewart', constructors_champion: 'Matra' },
          1968: { drivers_champion: 'Graham Hill', constructors_champion: 'Lotus' },
          1967: { drivers_champion: 'Denny Hulme', constructors_champion: 'Brabham' },
          1966: { drivers_champion: 'Jack Brabham', constructors_champion: 'Brabham' },
          1965: { drivers_champion: 'Jim Clark', constructors_champion: 'Lotus' },
          1964: { drivers_champion: 'John Surtees', constructors_champion: 'Ferrari' },
          1963: { drivers_champion: 'Jim Clark', constructors_champion: 'Lotus' },
          1962: { drivers_champion: 'Graham Hill', constructors_champion: 'BRM' },
          1961: { drivers_champion: 'Phil Hill', constructors_champion: 'Ferrari' },
          1960: { drivers_champion: 'Jack Brabham', constructors_champion: 'Cooper' },
          
          // 1950s
          1959: { drivers_champion: 'Jack Brabham', constructors_champion: 'Cooper' },
          1958: { drivers_champion: 'Mike Hawthorn', constructors_champion: 'Vanwall' },
          1957: { drivers_champion: 'Juan Manuel Fangio', constructors_champion: 'Maserati' },
          1956: { drivers_champion: 'Juan Manuel Fangio', constructors_champion: 'Ferrari' },
          1955: { drivers_champion: 'Juan Manuel Fangio', constructors_champion: 'Mercedes' },
          1954: { drivers_champion: 'Juan Manuel Fangio', constructors_champion: 'Ferrari' },
          1953: { drivers_champion: 'Alberto Ascari', constructors_champion: 'Ferrari' },
          1952: { drivers_champion: 'Alberto Ascari', constructors_champion: 'Ferrari' },
          1951: { drivers_champion: 'Juan Manuel Fangio', constructors_champion: 'Alfa Romeo' },
          1950: { drivers_champion: 'Giuseppe Farina', constructors_champion: 'Alfa Romeo' }
        }
        
        const enhancedSeasons = seasonsData.map((season: Season) => ({
          ...season,
          drivers_champion: championData[season.year]?.drivers_champion || 'Unknown',
          constructors_champion: championData[season.year]?.constructors_champion || 'Unknown'
        }))
        
        setSeasons(enhancedSeasons)
        
        // Group seasons by decade
        const grouped = enhancedSeasons.reduce((acc: { [decade: string]: Season[] }, season) => {
          const decade = `${Math.floor(season.year / 10) * 10}s`
          if (!acc[decade]) {
            acc[decade] = []
          }
          acc[decade].push(season)
          return acc
        }, {})
        
        setGroupedSeasons(grouped)
      } catch (error) {
        console.error('Error fetching seasons:', error)
        // Fallback data for demo - extended to include 2025 with champions
        const fallbackSeasons = [
          { 
            id: 1, 
            year: 2025, 
            name: '2025 Formula 1 World Championship',
            drivers_champion: 'TBD',
            constructors_champion: 'TBD'
          },
          { 
            id: 2, 
            year: 2024, 
            name: '2024 Formula 1 World Championship',
            drivers_champion: 'Max Verstappen',
            constructors_champion: 'Red Bull Racing'
          },
          { 
            id: 3, 
            year: 2023, 
            name: '2023 Formula 1 World Championship',
            drivers_champion: 'Max Verstappen',
            constructors_champion: 'Red Bull Racing'
          },
          { 
            id: 4, 
            year: 2022, 
            name: '2022 Formula 1 World Championship',
            drivers_champion: 'Max Verstappen',
            constructors_champion: 'Red Bull Racing'
          },
          { 
            id: 5, 
            year: 2021, 
            name: '2021 Formula 1 World Championship',
            drivers_champion: 'Max Verstappen',
            constructors_champion: 'Red Bull Racing'
          },
          { 
            id: 6, 
            year: 2020, 
            name: '2020 Formula 1 World Championship',
            drivers_champion: 'Lewis Hamilton',
            constructors_champion: 'Mercedes'
          },
          { 
            id: 7, 
            year: 2019, 
            name: '2019 Formula 1 World Championship',
            drivers_champion: 'Lewis Hamilton',
            constructors_champion: 'Mercedes'
          },
          { 
            id: 8, 
            year: 2018, 
            name: '2018 Formula 1 World Championship',
            drivers_champion: 'Lewis Hamilton',
            constructors_champion: 'Mercedes'
          }
        ]
        setSeasons(fallbackSeasons)
        
        // Group fallback seasons by decade too
        const fallbackGrouped = fallbackSeasons.reduce((acc: { [decade: string]: Season[] }, season) => {
          const decade = `${Math.floor(season.year / 10) * 10}s`
          if (!acc[decade]) {
            acc[decade] = []
          }
          acc[decade].push(season)
          return acc
        }, {})
        
        setGroupedSeasons(fallbackGrouped)
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
        
        {Object.keys(groupedSeasons)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((decade) => (
            <div key={decade} className="decade-section">
              <h3 className="decade-title">{decade}</h3>
              <div className="races-gallery">
                {groupedSeasons[decade].map((season) => (
                  <Link
                    key={season.id}
                    to={`/seasons/${season.year}`}
                    className="race-card-gallery season-poster-card"
                  >
                    <div className="race-poster season-poster">
                      <div className="season-poster-content">
                        <div className="season-year-large">{season.year}</div>
                        <div className="season-subtitle">Formula 1</div>
                        <div className="season-subtitle">World Championship</div>
                        
                        {season.drivers_champion && season.constructors_champion && (
                          <div className="season-champions">
                            <div className="champion-section">
                              <div className="champion-emoji">🏆</div>
                              <div className="champion-name">{season.drivers_champion}</div>
                            </div>
                            <div className="champion-section">
                              <div className="champion-emoji">🏎️</div>
                              <div className="champion-name">{season.constructors_champion}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="race-info">
                      <h3 className="race-name">{season.year} Season</h3>
                      {season.drivers_champion && season.constructors_champion && (
                        <div className="card-champions">
                          <p className="card-champion">🏆 {season.drivers_champion}</p>
                          <p className="card-champion">🏎️ {season.constructors_champion}</p>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default RacesPage