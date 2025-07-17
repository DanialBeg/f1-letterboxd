package main

import (
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Season struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Year int    `json:"year" gorm:"unique"`
	Name string `json:"name"`
}

type Race struct {
	ID               uint    `json:"id" gorm:"primaryKey"`
	SeasonID         uint    `json:"season_id"`
	Season           Season  `json:"season" gorm:"foreignKey:SeasonID"`
	Name             string  `json:"name"`
	Location         string  `json:"location"`
	Date             string  `json:"date"`
	RoundNumber      int     `json:"round_number"`
	CircuitName      string  `json:"circuit_name"`
	Winner           string  `json:"winner"`
	WinningConstructor string  `json:"winning_constructor"`
	SecondPlace      string  `json:"second_place"`
	ThirdPlace       string  `json:"third_place"`
	PosterURL        string  `json:"poster_url"`
	AverageRating    float64 `json:"average_rating"`
	ReviewCount      int     `json:"review_count"`
}

type Review struct {
	ID        uint    `json:"id" gorm:"primaryKey"`
	RaceID    uint    `json:"race_id"`
	Race      Race    `json:"race" gorm:"foreignKey:RaceID"`
	UserName  string  `json:"user_name"`
	Rating    float64 `json:"rating"`
	Comment   string  `json:"comment"`
	CreatedAt string  `json:"created_at"`
}

var db *gorm.DB

func main() {
	var err error
	
	// Database connection - use SQLite for development
	db, err = gorm.Open(sqlite.Open("f1_letterboxd.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto-migrate schemas
	db.AutoMigrate(&Season{}, &Race{}, &Review{})

	// Seed data
	seedData(db)

	router := gin.Default()

	// CORS middleware
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		
		c.Next()
	})

	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// API routes
	api := router.Group("/api")
	{
		api.GET("/seasons", getSeasons)
		api.GET("/seasons/:year/races", getRacesByYear)
		api.GET("/races/:id", getRaceByID)
		api.GET("/races/:id/reviews", getReviewsByRace)
		api.POST("/races/:id/reviews", createReview)
	}

	port := ":8080"
	log.Printf("Server starting on %s", port)
	log.Printf("Database file: f1_letterboxd.db")
	if err := router.Run(port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func getSeasons(c *gin.Context) {
	var seasons []Season
	db.Order("year desc").Find(&seasons)
	c.JSON(http.StatusOK, seasons)
}

func getRacesByYear(c *gin.Context) {
	year := c.Param("year")
	var races []Race
	
	// First get the season by year
	var season Season
	if err := db.Where("year = ?", year).First(&season).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Season not found"})
		return
	}
	
	// Then get races for that season
	db.Where("season_id = ?", season.ID).Preload("Season").Order("round_number").Find(&races)
	c.JSON(http.StatusOK, races)
}

func getRaceByID(c *gin.Context) {
	id := c.Param("id")
	var race Race
	
	if err := db.Preload("Season").First(&race, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Race not found"})
		return
	}
	
	c.JSON(http.StatusOK, race)
}

func getReviewsByRace(c *gin.Context) {
	raceID := c.Param("id")
	var reviews []Review
	
	db.Where("race_id = ?", raceID).Order("created_at desc").Find(&reviews)
	c.JSON(http.StatusOK, reviews)
}

func createReview(c *gin.Context) {
	raceID := c.Param("id")
	var review Review
	
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	// Validate rating is between 0.5 and 5.0 in 0.5 increments
	if review.Rating < 0.5 || review.Rating > 5.0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be between 0.5 and 5.0"})
		return
	}
	
	// Check if rating is in 0.5 increments
	if (review.Rating * 2) != float64(int(review.Rating * 2)) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Rating must be in 0.5 increments (e.g., 1.0, 1.5, 2.0, etc.)"})
		return
	}
	
	review.RaceID = parseUint(raceID)
	review.CreatedAt = getCurrentTime()
	
	db.Create(&review)
	c.JSON(http.StatusCreated, review)
}

func parseUint(s string) uint {
	val, err := strconv.ParseUint(s, 10, 32)
	if err != nil {
		return 0
	}
	return uint(val)
}

func getCurrentTime() string {
	return time.Now().Format(time.RFC3339)
}