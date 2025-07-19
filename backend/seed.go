package main

import (
	"fmt"
	"log"

	"gorm.io/gorm"
)

func seedData(db *gorm.DB) {
	log.Println("Checking if data already exists...")
	// Check if data already exists
	var seasonCount int64
	result := db.Model(&Season{}).Count(&seasonCount)
	if result.Error != nil {
		log.Printf("Error checking existing data: %v", result.Error)
		return
	}

	if seasonCount > 0 {
		log.Printf("Data already exists (%d seasons), skipping seed", seasonCount)
		return
	}

	log.Println("No existing data found, proceeding with seeding...")

	// Create all F1 seasons from 1950-2025
	seasons := []Season{}
	for year := 2025; year >= 1950; year-- {
		seasons = append(seasons, Season{
			Year: year,
			Name: fmt.Sprintf("%d Formula 1 World Championship", year),
		})
	}

	log.Println("Creating seasons...")
	for _, season := range seasons {
		result := db.Create(&season)
		if result.Error != nil {
			log.Printf("Error creating season %d: %v", season.Year, result.Error)
			return
		}
	}
	log.Printf("Created %d seasons successfully", len(seasons))

	// Get the 2024 season for race creation
	log.Println("Retrieving 2024 season for race creation...")
	var season2024 Season
	result = db.Where("year = ?", 2024).First(&season2024)
	if result.Error != nil {
		log.Printf("Error retrieving 2024 season: %v", result.Error)
		return
	}

	// Create 2024 F1 races (complete season)
	races2024 := []Race{
		{
			SeasonID:           season2024.ID,
			Name:               "Bahrain Grand Prix",
			Location:           "Sakhir, Bahrain",
			Date:               "2024-03-02",
			RoundNumber:        1,
			CircuitName:        "Bahrain International Circuit",
			Winner:             "Max Verstappen",
			WinningConstructor: "Red Bull Racing",
			SecondPlace:        "Sergio Perez",
			ThirdPlace:         "Carlos Sainz",
			PosterURL:          "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:           season2024.ID,
			Name:               "Saudi Arabian Grand Prix",
			Location:           "Jeddah, Saudi Arabia",
			Date:               "2024-03-09",
			RoundNumber:        2,
			CircuitName:        "Jeddah Corniche Circuit",
			Winner:             "Max Verstappen",
			WinningConstructor: "Red Bull Racing",
			SecondPlace:        "Sergio Perez",
			ThirdPlace:         "Charles Leclerc",
			PosterURL:          "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Australian Grand Prix",
			Location:    "Melbourne, Australia",
			Date:        "2024-03-24",
			RoundNumber: 3,
			CircuitName: "Albert Park Circuit",
			Winner:      "Carlos Sainz",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Japanese Grand Prix",
			Location:    "Suzuka, Japan",
			Date:        "2024-04-07",
			RoundNumber: 4,
			CircuitName: "Suzuka International Racing Course",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Chinese Grand Prix",
			Location:    "Shanghai, China",
			Date:        "2024-04-21",
			RoundNumber: 5,
			CircuitName: "Shanghai International Circuit",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Miami Grand Prix",
			Location:    "Miami Gardens, Florida",
			Date:        "2024-05-05",
			RoundNumber: 6,
			CircuitName: "Miami International Autodrome",
			Winner:      "Lando Norris",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Emilia Romagna Grand Prix",
			Location:    "Imola, Italy",
			Date:        "2024-05-19",
			RoundNumber: 7,
			CircuitName: "Autodromo Enzo e Dino Ferrari",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Monaco Grand Prix",
			Location:    "Monte Carlo, Monaco",
			Date:        "2024-05-26",
			RoundNumber: 8,
			CircuitName: "Circuit de Monaco",
			Winner:      "Charles Leclerc",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Canadian Grand Prix",
			Location:    "Montreal, Canada",
			Date:        "2024-06-09",
			RoundNumber: 9,
			CircuitName: "Circuit Gilles-Villeneuve",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Spanish Grand Prix",
			Location:    "Barcelona, Spain",
			Date:        "2024-06-23",
			RoundNumber: 10,
			CircuitName: "Circuit de Barcelona-Catalunya",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Austrian Grand Prix",
			Location:    "Spielberg, Austria",
			Date:        "2024-06-30",
			RoundNumber: 11,
			CircuitName: "Red Bull Ring",
			Winner:      "George Russell",
			PosterURL:   "",
		},
		{
			SeasonID:           season2024.ID,
			Name:               "British Grand Prix",
			Location:           "Silverstone, United Kingdom",
			Date:               "2024-07-07",
			RoundNumber:        12,
			CircuitName:        "Silverstone Circuit",
			Winner:             "Lewis Hamilton",
			WinningConstructor: "Mercedes",
			SecondPlace:        "Max Verstappen",
			ThirdPlace:         "Lando Norris",
			PosterURL:          "https://upload.wikimedia.org/wikipedia/commons/4/48/2024_British_Grand_Prix%2C_Hamilton_%284%29.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Hungarian Grand Prix",
			Location:    "Budapest, Hungary",
			Date:        "2024-07-21",
			RoundNumber: 13,
			CircuitName: "Hungaroring",
			Winner:      "Oscar Piastri",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Belgian Grand Prix",
			Location:    "Spa-Francorchamps, Belgium",
			Date:        "2024-07-28",
			RoundNumber: 14,
			CircuitName: "Circuit de Spa-Francorchamps",
			Winner:      "Lewis Hamilton",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/4/48/2024_British_Grand_Prix%2C_Hamilton_%284%29.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Dutch Grand Prix",
			Location:    "Zandvoort, Netherlands",
			Date:        "2024-08-25",
			RoundNumber: 15,
			CircuitName: "Circuit Zandvoort",
			Winner:      "Lando Norris",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Italian Grand Prix",
			Location:    "Monza, Italy",
			Date:        "2024-09-01",
			RoundNumber: 16,
			CircuitName: "Monza Circuit",
			Winner:      "Charles Leclerc",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Azerbaijan Grand Prix",
			Location:    "Baku, Azerbaijan",
			Date:        "2024-09-15",
			RoundNumber: 17,
			CircuitName: "Baku City Circuit",
			Winner:      "Oscar Piastri",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Singapore Grand Prix",
			Location:    "Singapore",
			Date:        "2024-09-22",
			RoundNumber: 18,
			CircuitName: "Marina Bay Street Circuit",
			Winner:      "Lando Norris",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "United States Grand Prix",
			Location:    "Austin, Texas",
			Date:        "2024-10-20",
			RoundNumber: 19,
			CircuitName: "Circuit of the Americas",
			Winner:      "Charles Leclerc",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Mexico City Grand Prix",
			Location:    "Mexico City, Mexico",
			Date:        "2024-10-27",
			RoundNumber: 20,
			CircuitName: "Autodromo Hermanos Rodriguez",
			Winner:      "Carlos Sainz",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Brazilian Grand Prix",
			Location:    "Sao Paulo, Brazil",
			Date:        "2024-11-03",
			RoundNumber: 21,
			CircuitName: "Interlagos",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Las Vegas Grand Prix",
			Location:    "Las Vegas, Nevada",
			Date:        "2024-11-23",
			RoundNumber: 22,
			CircuitName: "Las Vegas Strip Circuit",
			Winner:      "George Russell",
			PosterURL:   "",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Qatar Grand Prix",
			Location:    "Lusail, Qatar",
			Date:        "2024-12-01",
			RoundNumber: 23,
			CircuitName: "Lusail International Circuit",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2024.ID,
			Name:        "Abu Dhabi Grand Prix",
			Location:    "Abu Dhabi, UAE",
			Date:        "2024-12-08",
			RoundNumber: 24,
			CircuitName: "Yas Marina Circuit",
			Winner:      "Lando Norris",
			PosterURL:   "",
		},
	}

	log.Println("Creating 2024 races...")
	for _, race := range races2024 {
		result := db.Create(&race)
		if result.Error != nil {
			log.Printf("Error creating 2024 race %s: %v", race.Name, result.Error)
			return
		}
	}
	log.Printf("Created %d races for 2024 season", len(races2024))

	// Get the 2023 season for race creation
	log.Println("Retrieving 2023 season for race creation...")
	var season2023 Season
	result = db.Where("year = ?", 2023).First(&season2023)
	if result.Error != nil {
		log.Printf("Error retrieving 2023 season: %v", result.Error)
		return
	}

	// Create some 2023 F1 races
	races2023 := []Race{
		{
			SeasonID:    season2023.ID,
			Name:        "Bahrain Grand Prix",
			Location:    "Sakhir, Bahrain",
			Date:        "2023-03-05",
			RoundNumber: 1,
			CircuitName: "Bahrain International Circuit",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2023.ID,
			Name:        "Saudi Arabian Grand Prix",
			Location:    "Jeddah, Saudi Arabia",
			Date:        "2023-03-19",
			RoundNumber: 2,
			CircuitName: "Jeddah Corniche Circuit",
			Winner:      "Sergio Perez",
			PosterURL:   "",
		},
		{
			SeasonID:    season2023.ID,
			Name:        "Australian Grand Prix",
			Location:    "Melbourne, Australia",
			Date:        "2023-04-02",
			RoundNumber: 3,
			CircuitName: "Albert Park Circuit",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
		{
			SeasonID:    season2023.ID,
			Name:        "Azerbaijan Grand Prix",
			Location:    "Baku, Azerbaijan",
			Date:        "2023-04-30",
			RoundNumber: 4,
			CircuitName: "Baku City Circuit",
			Winner:      "Sergio Perez",
			PosterURL:   "",
		},
		{
			SeasonID:    season2023.ID,
			Name:        "Miami Grand Prix",
			Location:    "Miami Gardens, Florida",
			Date:        "2023-05-07",
			RoundNumber: 5,
			CircuitName: "Miami International Autodrome",
			Winner:      "Max Verstappen",
			PosterURL:   "https://upload.wikimedia.org/wikipedia/commons/b/b3/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3937_by_Stepro.jpg",
		},
	}

	log.Println("Creating 2023 races...")
	for _, race := range races2023 {
		result := db.Create(&race)
		if result.Error != nil {
			log.Printf("Error creating 2023 race %s: %v", race.Name, result.Error)
			return
		}
	}
	log.Printf("Created %d races for 2023 season", len(races2023))

	// Get the 2025 season for race creation
	log.Println("Retrieving 2025 season for race creation...")
	var season2025 Season
	result = db.Where("year = ?", 2025).First(&season2025)
	if result.Error != nil {
		log.Printf("Error retrieving 2025 season: %v", result.Error)
		return
	}

	// Create 2025 F1 races (upcoming season - first half of calendar)
	races2025 := []Race{
		{
			SeasonID:    season2025.ID,
			Name:        "Australian Grand Prix",
			Location:    "Melbourne, Australia",
			Date:        "2025-03-16",
			RoundNumber: 1,
			CircuitName: "Albert Park Circuit",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Chinese Grand Prix",
			Location:    "Shanghai, China",
			Date:        "2025-03-23",
			RoundNumber: 2,
			CircuitName: "Shanghai International Circuit",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Japanese Grand Prix",
			Location:    "Suzuka, Japan",
			Date:        "2025-04-06",
			RoundNumber: 3,
			CircuitName: "Suzuka International Racing Course",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Bahrain Grand Prix",
			Location:    "Sakhir, Bahrain",
			Date:        "2025-04-13",
			RoundNumber: 4,
			CircuitName: "Bahrain International Circuit",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Saudi Arabian Grand Prix",
			Location:    "Jeddah, Saudi Arabia",
			Date:        "2025-04-20",
			RoundNumber: 5,
			CircuitName: "Jeddah Corniche Circuit",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Miami Grand Prix",
			Location:    "Miami Gardens, Florida",
			Date:        "2025-05-04",
			RoundNumber: 6,
			CircuitName: "Miami International Autodrome",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Emilia Romagna Grand Prix",
			Location:    "Imola, Italy",
			Date:        "2025-05-18",
			RoundNumber: 7,
			CircuitName: "Autodromo Enzo e Dino Ferrari",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Monaco Grand Prix",
			Location:    "Monte Carlo, Monaco",
			Date:        "2025-05-25",
			RoundNumber: 8,
			CircuitName: "Circuit de Monaco",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Spanish Grand Prix",
			Location:    "Barcelona, Spain",
			Date:        "2025-06-01",
			RoundNumber: 9,
			CircuitName: "Circuit de Barcelona-Catalunya",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Canadian Grand Prix",
			Location:    "Montreal, Canada",
			Date:        "2025-06-15",
			RoundNumber: 10,
			CircuitName: "Circuit Gilles-Villeneuve",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "Austrian Grand Prix",
			Location:    "Spielberg, Austria",
			Date:        "2025-06-29",
			RoundNumber: 11,
			CircuitName: "Red Bull Ring",
			Winner:      "TBD",
			PosterURL:   "",
		},
		{
			SeasonID:    season2025.ID,
			Name:        "British Grand Prix",
			Location:    "Silverstone, United Kingdom",
			Date:        "2025-07-06",
			RoundNumber: 12,
			CircuitName: "Silverstone Circuit",
			Winner:      "TBD",
			PosterURL:   "",
		},
	}

	log.Println("Creating 2025 races...")
	for _, race := range races2025 {
		result := db.Create(&race)
		if result.Error != nil {
			log.Printf("Error creating 2025 race %s: %v", race.Name, result.Error)
			return
		}
	}
	log.Printf("Created %d races for 2025 season", len(races2025))

	log.Println("Database seeded successfully!")
}
