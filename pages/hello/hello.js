// Taxi Sahbi Miniprogram with Morocco City Pricing - Simple Test Version
Page({
  data: {
    latitude: 33.5731,
    longitude: -7.5898,
    taxis: [
      { id: 0, name: "Petit Taxi", image: "/assets/images/smallTaxi.png", type: "petit" },
      { id: 1, name: "Grand Taxi", image: "/assets/images/grandTaxi.png", type: "grand" }
    ],
    selectedTaxi: 0,
    switchedCourse: "private",
    
    // City selection (hidden but used for calculation)
    selectedCity: "casa", // Default city
    cities: [
      { id: "casa", name: "Casablanca", nameAr: "الدار البيضاء" },
      { id: "rabat", name: "Rabat", nameAr: "الرباط" },
      { id: "tanger", name: "Tanger", nameAr: "طنجة" },
      { id: "kenitra", name: "Kénitra", nameAr: "القنيطرة" }
    ],
    
    // STATIC TEST VALUES - automatically used when confirming
    distanceKm: 10, // Static 10km for testing
    durationMinutes: 25, // Static 25 min for testing
    
    isNightTime: false,
    isMorningTime: false,
    calculatedPrice: null,
    priceBreakdown: null,
    
    // UI state
    isLoading: false,
    loadingMessage: null,
    tripDetails: null,
    
    pickupLocation: null,
    destinationLocation: null
  },

  // ==================== MOROCCO CITY TARIFFS ====================
  cityTariffs: {
    casa: {
      tarifPerKm: 0.2,
      prixDepart: 2.2,
      meterMinPrice: 80,
      tarifStop: 0.2,
      minPrixCourse: 8,
      tarifNight: 0.5,
      tarifMorning: 0
    },
    rabat: {
      tarifPerKm: 0.2,
      prixDepart: 2,
      meterMinPrice: 65,
      tarifStop: 0.2,
      minPrixCourse: 7,
      tarifNight: 0.5,
      tarifMorning: 0
    },
    tanger: {
      tarifPerKm: 0.3,
      prixDepart: 1.6,
      meterMinPrice: 120,
      tarifStop: 0.4,
      minPrixCourse: 5,
      tarifNight: 0.5,
      tarifMorning: 0
    },
    kenitra: {
      tarifPerKm: 0.2,
      prixDepart: 1.5,
      meterMinPrice: 80,
      tarifStop: 0.2,
      minPrixCourse: 6.5,
      tarifNight: 0.5,
      tarifMorning: 0
    }
  },

  onLoad() {
    this.initializePage();
  },

  initializePage() {
    // Check time of day for surcharges
    this.checkTimeOfDay();
    
    // Auto-calculate price with static values on load
    this.calculatePriceForCity();
  },

  // ==================== TIME-BASED SURCHARGES ====================
  checkTimeOfDay() {
    const now = new Date();
    const hour = now.getHours();
    
    // Night time: 8 PM to 6 AM (20:00 - 06:00)
    const isNight = hour >= 20 || hour < 6;
    
    // Morning rush: 6 AM to 9 AM (06:00 - 09:00)
    const isMorning = hour >= 6 && hour < 9;
    
    this.setData({
      isNightTime: isNight,
      isMorningTime: isMorning
    });
  },

  // ==================== PRICE CALCULATION ====================
  calculatePriceForCity() {
    const { selectedCity, distanceKm, durationMinutes, selectedTaxi, isNightTime, isMorningTime } = this.data;
    
    const tariff = this.cityTariffs[selectedCity];
    const taxiType = this.data.taxis[selectedTaxi].type;
    
    // Calculate base price
    let basePrice = tariff.prixDepart;
    
    // Add distance cost
    const distanceInKm = distanceKm;
    const distanceCost = distanceInKm * tariff.tarifPerKm;
    basePrice += distanceCost;
    
    // Add stop/waiting time cost
    let stopCost = 0;
    if (durationMinutes && durationMinutes > 0) {
      const expectedMinutes = distanceInKm * 2;
      const waitingMinutes = Math.max(0, durationMinutes - expectedMinutes);
      stopCost = waitingMinutes * tariff.tarifStop;
      basePrice += stopCost;
    }
    
    // Apply time-based surcharges
    let surcharge = 0;
    let surchargeDescription = '';
    
    if (isNightTime) {
      surcharge = basePrice * tariff.tarifNight;
      surchargeDescription = `Tarif nuit (+${(tariff.tarifNight * 100).toFixed(0)}%)`;
      basePrice += surcharge;
    } else if (isMorningTime && tariff.tarifMorning > 0) {
      surcharge = basePrice * tariff.tarifMorning;
      surchargeDescription = `Tarif matin (+${(tariff.tarifMorning * 100).toFixed(0)}%)`;
      basePrice += surcharge;
    }
    
    // Apply minimum price
    const finalPrice = Math.max(basePrice, tariff.minPrixCourse);
    
    // Grand Taxi surcharge (50% more)
    let grandTaxiSurcharge = 0;
    if (taxiType === 'grand') {
      grandTaxiSurcharge = finalPrice * 0.5;
    }
    
    const totalPrice = finalPrice + grandTaxiSurcharge;
    
    // Create detailed breakdown
    const breakdown = {
      prixDepart: tariff.prixDepart.toFixed(2),
      distanceCost: distanceCost.toFixed(2),
      stopCost: stopCost.toFixed(2),
      surcharge: surcharge.toFixed(2),
      surchargeDescription: surchargeDescription,
      grandTaxiSurcharge: grandTaxiSurcharge.toFixed(2),
      subtotal: finalPrice.toFixed(2),
      minimumApplied: finalPrice === tariff.minPrixCourse,
      minPrixCourse: tariff.minPrixCourse.toFixed(2),
      totalPrice: totalPrice.toFixed(2)
    };
    
    // Create trip details for display
    const tripDetails = {
      distance: `${distanceKm}`,
      duration: `${durationMinutes}`,
      estimatedPrice: totalPrice.toFixed(2),
      distanceValue: distanceKm
    };
    
    this.setData({
      calculatedPrice: totalPrice.toFixed(2),
      priceBreakdown: breakdown,
      tripDetails: tripDetails
    });
    
    console.log('Price calculated:', totalPrice.toFixed(2), 'MAD');
    
    return {
      totalPrice: totalPrice.toFixed(2),
      breakdown: breakdown
    };
  },

  // ==================== TAXI TYPE SELECTION ====================
  selectTaxi(e) {
    const selectedId = e.currentTarget.dataset.id;
    this.setData({ selectedTaxi: selectedId });
    
    // Recalculate price with new taxi type
    this.calculatePriceForCity();
    
    console.log("Selected Taxi:", this.data.taxis[selectedId].name);
  },

  // ==================== TRIP MODE ====================
  onModeSwitchChange(e) {
    const value = e.detail.value;
    const mode = value ? "private" : "share";
    this.setData({ switchedCourse: mode });
    
    console.log("Trip mode:", mode);
  },

  setPrivate() {
    this.setData({ switchedCourse: "private" });
  },

  setShare() {
    this.setData({ switchedCourse: "share" });
  },

  // ==================== CURRENT POSITION (TEST DATA) ====================
  getCurrentPosition() {
    this.setData({ 
      isLoading: true,
      loadingMessage: 'Récupération de votre position...'
    });

    // Simulate getting position
    setTimeout(() => {
      const cityCoordinates = {
        casa: { lat: 33.5731, lng: -7.5898, name: "Casa Port, Casablanca" },
        rabat: { lat: 33.9716, lng: -6.8498, name: "Agdal, Rabat" },
        tanger: { lat: 35.7595, lng: -5.8340, name: "Médina, Tanger" },
        kenitra: { lat: 34.2610, lng: -6.5802, name: "Centre-ville, Kénitra" }
      };

      const currentCity = cityCoordinates[this.data.selectedCity];
      
      this.setData({
        pickupLocation: {
          lat: currentCity.lat,
          lng: currentCity.lng,
          address: currentCity.name
        },
        latitude: currentCity.lat,
        longitude: currentCity.lng,
        isLoading: false
      });

      my.showToast({
        content: 'Position récupérée',
        type: 'success',
        duration: 2000
      });
    }, 1000);
  },

  // ==================== CONFIRM TRIP (NAVIGATE TO CONFIRMATION) ====================
  confirmTrip() {
    const cityName = this.data.cities.find(c => c.id === this.data.selectedCity).name;
    const taxiName = this.data.taxis[this.data.selectedTaxi].name;
    const modeText = this.data.switchedCourse === 'private' ? 'Privatisé' : 'Partagé';

    // Calculate final price with discount if shared
    let finalPrice = parseFloat(this.data.calculatedPrice);
    if (this.data.switchedCourse === 'share') {
      finalPrice = finalPrice * 0.7; // 30% discount
    }

    // Create trip data for confirmation page
    const testTripData = {
      tripId: 'TRIP-' + Date.now(),
      distance: `${this.data.distanceKm} km`,
      duration: `${this.data.durationMinutes} min`,
      estimatedPrice: finalPrice.toFixed(2),
      distanceValue: this.data.distanceKm,
      
      priceBreakdown: this.data.priceBreakdown,
      
      pickup: this.data.pickupLocation || {
        lat: this.data.latitude,
        lng: this.data.longitude,
        address: `Point de départ, ${cityName}`
      },
      destination: {
        lat: this.data.latitude + 0.05,
        lng: this.data.longitude + 0.05,
        address: `Destination, ${cityName}`
      },
      
      selectedTaxi: {
        id: this.data.selectedTaxi,
        name: taxiName,
        type: this.data.taxis[this.data.selectedTaxi].type,
        image: this.data.taxis[this.data.selectedTaxi].image
      },
      tripMode: this.data.switchedCourse,
      tripModeText: modeText,
      
      city: {
        id: this.data.selectedCity,
        name: cityName
      },
      
      isNightTime: this.data.isNightTime,
      isMorningTime: this.data.isMorningTime,
      bookingTime: new Date().toISOString(),
      
      hasDiscount: this.data.switchedCourse === 'share',
      discountAmount: this.data.switchedCourse === 'share' ? 
        (parseFloat(this.data.calculatedPrice) * 0.3).toFixed(2) : '0.00'
    };

    // Show confirmation dialog
    my.confirm({
      title: 'Confirmer la réservation',
      content: `Ville: ${cityName}\nDistance: ${testTripData.distance}\nDurée: ${testTripData.duration}\nTaxi: ${taxiName}\nMode: ${modeText}\n\nPrix: ${testTripData.estimatedPrice} MAD`,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      success: (result) => {
        if (result.confirm) {
          this.navigateToConfirmation(testTripData);
        }
      }
    });
  },

  navigateToConfirmation(tripData) {
    my.navigateTo({
      url: `/pages/confirmation/confirmation?tripData=${encodeURIComponent(JSON.stringify(tripData))}`,
      success: () => {
        console.log('✅ Navigated to confirmation');
      },
      fail: (error) => {
        console.error('❌ Navigation failed:', error);
        my.showToast({
          content: 'Erreur de navigation',
          type: 'fail'
        });
      }
    });
  },

  modifyTrip() {
    my.showToast({
      content: 'Modification du trajet',
      type: 'none'
    });
    
    // Reset trip details
    this.setData({ tripDetails: null });
    
    // Recalculate
    setTimeout(() => {
      this.calculatePriceForCity();
    }, 500);
  },

  // ==================== MENU ====================
  showMenu() {
    my.navigateTo({
      url: "/pages/menu/menu",
      fail: () => {
        my.showToast({
          content: 'Page menu non disponible',
          type: 'none'
        });
      }
    });
  },

  // ==================== LIFECYCLE ====================
  onShow() {
    // Recheck time of day when page is shown
    this.checkTimeOfDay();
    
    // Recalculate price
    this.calculatePriceForCity();
  },

  onUnload() {
    console.log('Page unloaded');
  }
});