Vue.createApp({
  template: '#my-app',
  data() {
    return {
      books: [
        {
          id: 1,
          name: '《算法导论》',
          date: '2006-9',
          price: 85.00,
          count: 1
        },
        {
          id: 2,
          name: '《UNIX编程艺术》',
          date: '2006-2',
          price: 59.00,
          count: 1
        },
        {
          id: 3,
          name: '《编程珠玑》',
          date: '2008-10',
          price: 39.00,
          count: 1
        },
        {
          id: 4,
          name: '《代码大全》',
          date: '2006-3',
          price: 128.00,
          count: 1
        },
      ]
    }
  },
  computed: {
    totalPrice() {
      let finalPrice = 0;
      for (let book of this.books) {
        finalPrice += book.count * book.price
      }
      // 比较笨的方法是不做过滤，直接在return处加单位
      return finalPrice
    },
    // Vue3不支持过滤器了，推荐两种做法：使用计算属性和使用全局的方法
    // 这种方式用得还是蛮多的，有时服务器返回的数据，格式并不是我们想要的，可以通过filter的map、item方式来做过滤转化
    // 但是采用字符串拼接和filter都不是最佳选择，我们可以封装成一个method进行调用
    filterBooks() {
      return this.books.map(item => {
        // 这里只做第一层拷贝
        const newItem = Object.assign({}, item); // 之所以多做一份拷贝是为了原数组对象books不被破坏，不然totalPrice显示为NaN，因为乘法无法用于字符串
        newItem.price = "￥" + item.price;
        return newItem;
      })
    }
  },
  methods: {
    increment(e) {
      // console.log(e);
      this.books[e].count++;
    },
    decrement(e) {
      this.books[e].count--;
    },
    removeBook(index) {
      this.books.splice(index, 1)
    },
    // 这里我们用方法实现过滤器的效果
    // 我们当前formatPrice只对当前组件有效，如果我们希望其他组件也能用到，可以放到全局 app.config.globalProperties（后面会讲）相当于实现全局filter效果
    formatPrice(price) {
      return '￥' + price
    }

  },
}).mount("#app");