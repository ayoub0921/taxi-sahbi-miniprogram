Page({
  data: {
    menuItems: [
      { id: 0, name: "MON PROFIL", url: "/pages/profile/profile" },
      { id: 1, name: "MES TRAJETS", url: "/pages/trajets/trajets" },
      { id: 2, name: "AIDE", url: "/pages/help/help" },
      { id: 3, name: "MESSAGES", url: "/pages/messages/messages" }
    ]
  },

  onLoad() {},

  navigateToPage(e) {
    const url = e.currentTarget.dataset.url;
    console.log(url)
    if (url) {
      my.navigateTo({
        url: url
      });
    }
  },

  closeMenu() {
    my.navigateBack();
  }
});
