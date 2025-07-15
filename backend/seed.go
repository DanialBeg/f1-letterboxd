package main

import (
	"log"
	"gorm.io/gorm"
)

func seedData(db *gorm.DB) {
	// Check if data already exists
	var seasonCount int64
	db.Model(&Season{}).Count(&seasonCount)
	if seasonCount > 0 {
		log.Println("Data already exists, skipping seed")
		return
	}

	// Create seasons
	seasons := []Season{
		{Year: 2024, Name: "2024 Formula 1 World Championship"},
		{Year: 2023, Name: "2023 Formula 1 World Championship"},
		{Year: 2022, Name: "2022 Formula 1 World Championship"},
		{Year: 2021, Name: "2021 Formula 1 World Championship"},
	}

	for _, season := range seasons {
		db.Create(&season)
	}

	// Get the 2024 season for race creation
	var season2024 Season
	db.Where("year = ?", 2024).First(&season2024)

	// Create 2024 F1 races
	races2024 := []Race{
		{
			SeasonID:     season2024.ID,
			Name:         "Bahrain Grand Prix",
			Location:     "Sakhir, Bahrain",
			Date:         "2024-03-02",
			RoundNumber:  1,
			CircuitName:  "Bahrain International Circuit",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/YEQBjQ20/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Saudi Arabian Grand Prix",
			Location:     "Jeddah, Saudi Arabia",
			Date:         "2024-03-09",
			RoundNumber:  2,
			CircuitName:  "Jeddah Corniche Circuit",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/2eABXqd0/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Australian Grand Prix",
			Location:     "Melbourne, Australia",
			Date:         "2024-03-24",
			RoundNumber:  3,
			CircuitName:  "Albert Park Circuit",
			Winner:       "Carlos Sainz",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/01WdpL42/s8/carlos-sainz-jr-ferrari-sf-24.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Japanese Grand Prix",
			Location:     "Suzuka, Japan",
			Date:         "2024-04-07",
			RoundNumber:  4,
			CircuitName:  "Suzuka International Racing Course",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/68yN1Jd6/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Chinese Grand Prix",
			Location:     "Shanghai, China",
			Date:         "2024-04-21",
			RoundNumber:  5,
			CircuitName:  "Shanghai International Circuit",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/6zQxdyO0/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Miami Grand Prix",
			Location:     "Miami Gardens, Florida",
			Date:         "2024-05-05",
			RoundNumber:  6,
			CircuitName:  "Miami International Autodrome",
			Winner:       "Lando Norris",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/YMdLaZ76/s8/lando-norris-mclaren-mcl38.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Emilia Romagna Grand Prix",
			Location:     "Imola, Italy",
			Date:         "2024-05-19",
			RoundNumber:  7,
			CircuitName:  "Autodromo Enzo e Dino Ferrari",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/0L1BVj90/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Monaco Grand Prix",
			Location:     "Monte Carlo, Monaco",
			Date:         "2024-05-26",
			RoundNumber:  8,
			CircuitName:  "Circuit de Monaco",
			Winner:       "Charles Leclerc",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/YW7BVA42/s8/charles-leclerc-ferrari-sf-24.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Canadian Grand Prix",
			Location:     "Montreal, Canada",
			Date:         "2024-06-09",
			RoundNumber:  9,
			CircuitName:  "Circuit Gilles-Villeneuve",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/YW7BVA40/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
		{
			SeasonID:     season2024.ID,
			Name:         "Spanish Grand Prix",
			Location:     "Barcelona, Spain",
			Date:         "2024-06-23",
			RoundNumber:  10,
			CircuitName:  "Circuit de Barcelona-Catalunya",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/2eABXqd2/s8/max-verstappen-red-bull-racing-rb20.jpg",
		},
	}

	for _, race := range races2024 {
		db.Create(&race)
	}

	// Get the 2023 season for race creation
	var season2023 Season
	db.Where("year = ?", 2023).First(&season2023)

	// Create some 2023 F1 races
	races2023 := []Race{
		{
			SeasonID:     season2023.ID,
			Name:         "Bahrain Grand Prix",
			Location:     "Sakhir, Bahrain",
			Date:         "2023-03-05",
			RoundNumber:  1,
			CircuitName:  "Bahrain International Circuit",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/YEQBjQ2Y/s8/max-verstappen-red-bull-racing-rb19.jpg",
		},
		{
			SeasonID:     season2023.ID,
			Name:         "Saudi Arabian Grand Prix",
			Location:     "Jeddah, Saudi Arabia",
			Date:         "2023-03-19",
			RoundNumber:  2,
			CircuitName:  "Jeddah Corniche Circuit",
			Winner:       "Sergio Perez",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/01WdpLv2/s8/sergio-perez-red-bull-racing-rb19.jpg",
		},
		{
			SeasonID:     season2023.ID,
			Name:         "Australian Grand Prix",
			Location:     "Melbourne, Australia",
			Date:         "2023-04-02",
			RoundNumber:  3,
			CircuitName:  "Albert Park Circuit",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/6zQxdyOY/s8/max-verstappen-red-bull-racing-rb19.jpg",
		},
		{
			SeasonID:     season2023.ID,
			Name:         "Azerbaijan Grand Prix",
			Location:     "Baku, Azerbaijan",
			Date:         "2023-04-30",
			RoundNumber:  4,
			CircuitName:  "Baku City Circuit",
			Winner:       "Sergio Perez",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/68yN1JdY/s8/sergio-perez-red-bull-racing-rb19.jpg",
		},
		{
			SeasonID:     season2023.ID,
			Name:         "Miami Grand Prix",
			Location:     "Miami Gardens, Florida",
			Date:         "2023-05-07",
			RoundNumber:  5,
			CircuitName:  "Miami International Autodrome",
			Winner:       "Max Verstappen",
			PosterURL:    "https://cdn-1.motorsport.com/images/mgl/0L1BVj9Y/s8/max-verstappen-red-bull-racing-rb19.jpg",
		},
	}

	for _, race := range races2023 {
		db.Create(&race)
	}

	log.Println("Database seeded successfully!")
}