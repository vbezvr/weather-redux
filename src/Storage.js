export const storage = {
  saveFavoriteCities(favoriteCities) {
    localStorage.setItem("cities", favoriteCities);
  },

  saveCurrentCity(currentCity) {
    localStorage.setItem("currentCity", currentCity);
  },

  getFavoriteCities() {
    if (!this.isEmpty()) {
      return localStorage.getItem("cities").split(",");
    }
    return []
  },

  getCurrentCity() {
    return localStorage.getItem("currentCity");
  },

  isCitySaved(city) {
    return this.getFavoriteCities().includes(city);
  },

  isEmpty() {
    return !localStorage.getItem('cities');
  },

  addFavoriteCitiesItem(cityName) {

    const updatesCities = this.getFavoriteCities();
    updatesCities.push(cityName);
    this.saveFavoriteCities(updatesCities);

  },

  deleteFavoriteCitiesItem(cityName) {
    const updatesCities = this.getFavoriteCities().filter(elem => elem !== cityName)
    this.saveFavoriteCities(updatesCities);

  },
};
