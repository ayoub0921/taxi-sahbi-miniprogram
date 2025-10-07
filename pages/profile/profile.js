Page({
  data: {
    cities : [
      "Casablanca",
      "Rabat",
      "Fès",
      "Marrakech",
      "Agadir",
      "Tanger",
      "Meknès",
      "Oujda",
      "Tétouan",
      "Khouribga",
      "El Jadida",
      "Béni Mellal",
      "Nador",
      "Mohammédia",
      "Kénitra",
      "Safi",
      "Ouarzazate",
      "Errachidia",
      "Laâyoune",
      "Dakhla",
      "Taza",
      "Guelmim",
      "Larache",
      "Ksar El Kebir",
      "Settat",
      "Al Hoceïma",
      "Berrechid",
      "Témara",
      "Ifrane",
      "Azrou",
      "Tan-Tan",
      "Midelt",
      "Fquih Ben Salah",
      "Taourirt",
      "Essaouira",
      "Sidi Kacem",
      "Sidi Slimane"
    ],
    cityIndex: 0

    
  },

  bindCityChange: function(e) {
    this.setData({
      cityIndex: e.detail.value
    });
  },
  onSubmit: function() {
    // Handle form submission
  },

  updatePassword() {
    my.navigateTo({ url: "/pages/updatePassword/updatePassword" });
  },
  
  logout() {
    console.log('logout')
  },

  addNewCard() {

    my.navigateTo({

      url:"/pages/addNewCard/addNewCard"
    })
  },
  onLoad() {},
});
