Component({
  // Component properties, equivalent to props in other frameworks
  properties: {
    message: {
      type: String,
      value: 'Default message'
    }
  },
  // Component data
  data: {
    count: 0
  },
  // Component methods
  methods: {
    increment() {
      this.setData({
        count: this.data.count + 1
      });
    }
  },
  // Component lifecycle hooks
  lifetimes: {
    attached() {
      // Called when the component is attached to the page node tree
    },
    detached() {
      // Called when the component is removed from the page node tree
    }
  }
});