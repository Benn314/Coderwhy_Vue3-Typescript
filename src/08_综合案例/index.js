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
      return finalPrice
    },
    // Vue3不支持过滤器了，推荐两种做法：使用计算属性和使用全局的方法
    filterBooks() {
      return this.books.map(item => {
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
    }

  },
}).mount("#app");