Page({
  data: {
    rating: 0 ,
    comment:""
  },

  setRating(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      rating: index + 1
    });
    console.log("Selected Rating:", this.data.rating);
  },

  onCommentInput(e) {
    this.setData({
      comment: e.detail.value
    });
  },

  onClearComment() {
    this.setData({
      comment: ""
    });
  }
});
