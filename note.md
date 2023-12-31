# 01-邂逅Vue3

## 简介

Angular入门门槛高，设计思想与node框架nest.js相似，而且都是用typescript编写

![image-20230710173601447](note.assets/image-20230710173601447.png)

![image-20230710173948226](note.assets/image-20230710173948226.png)

![image-20230710174309376](note.assets/image-20230710174309376.png)

![image-20230710174423995](note.assets/image-20230710174423995.png)

![image-20230710174656323](note.assets/image-20230710174656323.png)

![image-20230710174812290](note.assets/image-20230710174812290.png)

## Vue3库引入使用

![image-20230710174929137](note.assets/image-20230710174929137.png)

![image-20230710175330370](note.assets/image-20230710175330370.png)

> CDN这么看跟域名解析过程有点像，递归查找并缓存

![image-20230710175508204](note.assets/image-20230710175508204.png)

01_Vue3的引入.html

```html
<!-- CDN引入 -->
<body>
  <div id="app"></div>
  <script src="https://unpkg.com/vue@next"></script>
  <script>
    const why = {
      template: `<h2>Hello World!</h2>`,
    }
    const app = Vue.createApp(why);
    app.mount('#app');
  </script>
</body>
```

02_Vue3的引入.html

```html
<!-- 下载打包文件到本地并引入 -->
<body>
  <div id="app"></div>
  <script src='../js/vue.js'></script>
  <script>
    Vue.createApp({
      template:'<h2>Hello World!!!</h2>'
    }).mount('#app');
  </script>
</body>
```

​	

## 计数器案例（原生 & Vue 实现）

![image-20230711093536207](note.assets/image-20230711093536207.png)

03_计数器案例-原生.html

```html
<body>
  <h2 class="counter">0</h2>
  <button class="increment">+1</button>
  <button class="decrement">-1</button>

  <script>
    const counterEl = document.querySelector('.counter');
    const increment = document.querySelector('.increment');
    const decrement = document.querySelector('.decrement');

    let count= 100;
    counterEl.innerHTML=count;

    increment.addEventListener('click',()=>{
      count++;
      counterEl.innerHTML=count;
    })

    decrement.addEventListener('click',()=>{
      count--;
      counterEl.innerHTML=count;
    })
  </script>
</body>
```


> 挂载元素后面可以配置代码片段来快速生成

![image-20230711094357614](note.assets/image-20230711094357614.png)

在template中，vue3最外层给不给div标签都可以，vue2是要的

> 暂时不清楚上图说的另一方式编写有提示指的是什么（答：在template标签进行）

04_计数器案例-Vue.html

```html
<body>
  <div id="app"></div>
  <script src="../js/vue.js"></script>
  <script>
    Vue.createApp({
      // 在template中需要使用元素标签多的情况可以使用模板字符串，比普通单/双字符串方便
      template: `
        <div>
          <h2>{{message}}</h2>
          <h2>{{count}}</h2>
          <button @click='increment'>+1</button>
          <button @click='decrement'>-1</button>  
        </div>
      `,
      // 在vue2中，data是一个对象，但在vue3中，data是一个函数，我们一般是return一个对象
      // vue使得我们不需要再去进行原生dom绑定，data里返回的属性都会被加入响应式系统中，可以在模板中使用
      data: function(){
        return {
          message:'hello',
          count: 100
        }
      },
      methods:{
        increment(){
          // this拿的其实是proxy代理里的东西，再去获取到data里的属性count（答：这一部分是被Vue的响应式系统劫持）
          this.count++;
        },
        decrement(){
          this.count--;
        }
      }
    }).mount('#app')
  </script>
</body>
```

​	

## 编程范式

分为：

- 命令式编程（原生html）：当下最需要什么去声明然后直接用（获取dom由人完成）
- 声明式编程（Vue）：把需要的东西先声明后绑定进行使用（获取dom由框架完成）

![image-20230711101800314](note.assets/image-20230711101800314.png)

## MVVM & MVC

前端除了MVVM架构，也可以当成MVC架构来看

![image-20230711101949175](note.assets/image-20230711101949175.png)

但MVC这种传统开发模式在前端划分不会那么清晰，不像后端/ios

![image-20230711102358530](note.assets/image-20230711102358530.png)

vue算是MVVM框架，整个设计受到它的启发

vue作为中间层，帮助实现数据双向绑定和dom操作

![image-20230711103054736](note.assets/image-20230711103054736.png)

## template属性

绑定元素标签数据只能是在template标签里绑定数据的，template标签外的不能识别处理（例如单纯在body标签下使用 <div>{{ message }}</div> 类似这种）

![image-20230711104649481](note.assets/image-20230711104649481.png)

![image-20230711104804735](note.assets/image-20230711104804735.png)

![image-20230711104904040](note.assets/image-20230711104904040.png)

在vue中挂载或者绑定标签通常使用id进行绑定/挂载是有含义的，

![image-20230711105109078](note.assets/image-20230711105109078.png)

template标签不是vue特有的，html标签本身就有定义这个template标签，而且它里面的内容默认情况下不会被浏览器渲染，那么它有什么作用呢？

> 作用：被javascript源代码读取，在scirpt标签里去用

^00ee8c

[MDN | <template>：内容模板元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)

虽然解析器在加载页面时确实会处理 **`<template>`** 元素的内容，但这样做只是为了确保这些内容有效；但元素内容不会被渲染。——MDN

05_template写法一.html

```html
<body>
  <div id="app"></div>
  <script src="../js/vue.js"></script>
  <script type="x-template" id="counter">
    <!-- 缺点是没有高亮 -->
    <div>
      <h2>{{ message }}</h2>
      <h2>{{ count }}</h2>
      <button @click='increment'>+1</button>
      <button @click='decrement'>-1</button>  
    </div>
  </script>
  <script>
    Vue.createApp({
      template: '#counter',
      data: function(){
        return {
          message:'hello',
          count: 100
        }
      },
      methods:{
        increment(){
          this.count++;
        },
        decrement(){
          this.count--;
        }
      }
    }).mount('#app')
  </script>
</body>
```

---

![image-20230711111112616](note.assets/image-20230711111112616.png)

![image-20230711111131179](note.assets/image-20230711111131179.png)

如果用的不是template标签而是其他标签（例如div标签），那么页面会被渲染两次的（一次是原生渲染一次是经过vue处理后渲染），为什么会这样？

> 上面刚刚已经说明了原因，template标签是不会被浏览器渲染（看上面写的[[note#^00ee8c | template作用]]）

![image-20230711111937205](note.assets/image-20230711111937205.png)

06_template写法二.html

```html
  <body>
    <div id="app">写在#app的这一部分内容会被template标签的内容所替换</div>

    <!-- 只显示Vue处理后的标签内容 -->
    <template id="counter">
      <div>
        <h2>{{ message }}</h2>
        <h2>{{ count }}</h2>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
        <button @click="btnClick">看看this值</button>
      </div>
    </template>

    <!-- 显示Vue处理后的标签内容，再显示原生的标签内容 -->
    <!-- <div id="counter1">
    <div>
      <h2>{{ message }}</h2>
      <h2>{{ count }}</h2>
      <button @click='increment'>+1</button>
      <button @click='decrement'>-1</button>  
    </div>
  </div> -->

    <script src="../js/vue.js"></script>

    <script>
      Vue.createApp({
        template: "#counter",
        // template: '#counter1',
        data: function () {
          return {
            message: "hello",
            count: 100,
          };
        },
        methods: {
          increment() {
            this.count++;
          },
          decrement() {
            this.count--;
          },
          btnClick: () => {
            // 在这里使用箭头函数打印出来的this是window对象
            console.log(this);
          },
        },
      }).mount("#app");

      // 下面写的是this指向相关的知识点
      // const foo = ()=>{
      //   console.log(this);
      // }
      // const foo = function(){
      //   console.log(this);
      // }

      // foo(); // window 隐式绑定

      // const obj = {
      //   bar: foo
      // }

      // obj.bar();

      // function bar(){
      //   console.log(this);
      // }

      // // bar();

      // const info = {
      //   name:"why"
      // }

      // // 显示绑定
      // const foo = bar.bind(info); // bind 不会修改原数据,而是返回一个新的函数
      // foo();

      // function foo(func) {
      //   func();
      // }

      // var obj = {
      //   name: "why",
      //   bar: function () {
      //     console.log(this);
      //   },
      // };

      // foo(obj.bar); // window
      // obj.bar(); // why

      // function foo() {
      //   console.log(this); // obj对象
      // }

      // var obj1 = {
      //   name: "obj1",
      //   foo: foo,
      // };

      // var obj2 = {
      //   name: "obj2",
      //   obj1: obj1,
      // };

      // obj2.obj1.foo();

      function foo() {
        console.log(this);
      }

      var obj1 = {
        name: "obj1",
        foo: foo,
      };

      // 讲obj1的foo赋值给bar
      var bar = obj1.foo;
      bar();
    </script>
  </body>
```

​	

## methods属性

绑定到template标签或者template内的标签都可以

![image-20230711142459508](note.assets/image-20230711142459508.png) ^3436ef

![image-20230711142603499](note.assets/image-20230711142603499.png)


## 源码调试

vue3源码地址：https://github.com/vuejs/core

### 流程

1. git clone git@github.com:vuejs/core.git
2. 新版本的vue3源码采用pnpm管理，而非yarn，先下载pnpm
3. 安装依赖 `pnpm install`
4. 打包vue文件 `pnpm dev` 生成打包文件到 `built: packages\vue\dist\vue.global.js`，而后可直接引用
5. 在 `packages\vue\examples` 中新建你自己的调试目录，然后在调试目录里面新建html文件
5. 在根目录下的package.json中的dev值后面添加 `--sourcemap`，便于代码映射（不然调试在几万多行的vue.global.js调试，肯定是一头雾水的）

![image-20230711151858405](note.assets/image-20230711151858405.png)

sourcemap有代码映射作用，映射vue.global.js 文件的目标代码具体是源码的哪个目录位置去

![image-20230711151935500](note.assets/image-20230711151935500.png)

![image-20230711170334464](note.assets/image-20230711170334464.png)

![image-20230711171404722](note.assets/image-20230711171404722.png)

有map后缀文件说明sourcemap生效

**Coderwhy_Vue3-Typescript\src\01_Vue3初体验\core\packages\vue\examples\why\demo.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">写在#app的这一部分内容会被template标签的内容所替换</div>

  <script src="../../dist/vue.global.js"></script>

  <script>
    debugger
    Vue.createApp({
      template: '<h2>我来啦！</h2>',
    }).mount('#app')
  </script>
</body>
</html>
```

![image-20230711171639681](note.assets/image-20230711171639681.png)

​	

# 02-Vue基础-模板语法（一）

## 上节课后题

先看看[[note#^3436ef | 第一课-课后思考题]]

{ } 大括号并不全是作用域，建议看看作用域的文章

**{ } 大括号是作用域吗？**

> 是的，大括号 `{}` 在许多编程语言中用于创建作用域（Scope）。作用域定义了变量、函数和对象的可见性和访问权限。
>
> 在大多数编程语言中，例如 JavaScript、Java、C++、C# 等，大括号用于创建块级作用域。在这些语言中，当您在代码中使用大括号时，大括号将创建一个新的作用域，在其中可以定义局部变量和函数。
>
> 例如，在 JavaScript 中：
>
> ```javascript
> {
>   // 这里是一个块级作用域
>   const x = 10;
>   console.log(x); // 输出 10
> }
> 
> console.log(x); // 报错，x 在此作用域外不可见
> ```
>
> 在上面的代码中，大括号 `{}` 创建了一个块级作用域，其中定义了变量 `x`。在作用域内，可以访问和使用该变量。但是，在作用域外，尝试访问 `x` 将导致错误，因为它不在当前作用域的范围内。
>
> 请注意，**不是所有的大括号都会创建作用域**。例如，在对象字面量中的大括号 `{}` 用于定义对象的属性和方法，但它们不会创建新的作用域。
>
> 总之，大括号 `{}` 在许多编程语言中用于创建作用域，提供了变量和代码的封闭环境，控制了变量的可见性和生命周期。

![image-20230712195214298](note.assets/image-20230712195214298.png)

[coderwhy老师微信公众号推文 | 前端面试之彻底搞懂this指向](https://mp.weixin.qq.com/s/hYm0JgBI25grNG_2sCRlTA) ^5e5364

> 简单讲一下 call、bind、apply，这三个都是显式指定this指向
>
> - call和apply的区别是：call传入单参数，apply传入数组参数
>
> - call和apply 与 bind 的区别是：call和apply是一次性绑定，apply是永久绑定某对象/方法的this指向
> - bind是原型对象上的方法，当然也可以自己封装，原理是利用闭包返回apply函数进行绑定，原理看[[note#^5e5364 | 推文]]有详细介绍
> - setTimeout中会传入一个函数，这个函数中的this通常是window，为什么是window呢？因为setTimeout内部是通过apply进行绑定的this对象，并且绑定的是全局对象；

```
这样的闭包会被销毁吗？

foo3: function () {
    return function () {
      console.log(this.name)
    }
  },
```

> 在给定的代码中，`foo3` 方法返回一个闭包函数。闭包函数保留对其创建时所在的词法环境的引用，即使创建它的外部函数已经执行完毕。因此，闭包函数会继续存在并保持对其创建时的作用域和变量的访问。
>
> 当调用 `foo3` 方法时，返回的闭包函数会被赋值给一个变量或直接调用。无论哪种情况，该闭包函数都会继续存在并保持对其词法环境的引用。只有当没有任何引用指向该闭包函数时，它才会被垃圾回收器回收并销毁。
>
> 对于给定的闭包函数，它引用了 `this.name`，但是在闭包函数中的 `this` 指向取决于如何调用该函数。如果以对象方法的形式调用闭包函数，例如 `obj.foo3()`，那么 `this` 将指向 `obj`，并且能够访问 `obj` 对象的 `name` 属性。
>
> 例如：
>
> ```javascript
> var obj = {
> name: "example",
> foo3: function () {
>  return function () {
>    console.log(this.name);
>  };
> },
> };
> 
> var closure = obj.foo3();
> closure(); // 输出 "example"
> ```
>
> 在上面的示例中，`closure` 是 `foo3` 返回的闭包函数。当调用 `closure()` 时，`this` 指向 `obj`，并成功输出了 "example"。
>
> 总结起来，闭包函数只有在没有任何引用指向它时才会被销毁。在上述示例中，只有当没有任何引用指向返回的闭包函数时，它才会被垃圾回收器回收。
>
> **只有当没有任何引用指向返回的闭包函数时，它才会被垃圾回收器回收。这句话怎么理解？能不能举个例子**
>
> > 当一个函数被创建并返回后，如果其他变量或函数仍然引用该函数，那么该函数就有一个活跃的引用，垃圾回收器不会将其回收。只有当没有任何变量或函数引用该函数时，垃圾回收器才会将其标记为不再需要，并在适当的时候进行回收。
> >
> > 以下是一个示例来说明这个概念：
> >
> > ```javascript
> > function createClosure() {
> >   var name = "example";
> > 
> >   var closure = function() {
> >     console.log(name);
> >   };
> > 
> >   return closure;
> > }
> > 
> > var closureReference = createClosure();
> > closureReference(); // 输出 "example"
> > ```
> >
> > 在上面的示例中，`createClosure` 函数创建了一个闭包函数，并将其赋值给 `closureReference` 变量。即使 `createClosure` 函数已经执行完毕，闭包函数仍然存在，并且保持对 `name` 变量的引用。因此，当调用 `closureReference` 函数时，它仍然可以访问并输出 `name` 的值。
> >
> > 在这种情况下，闭包函数 `closure` 有一个活跃的引用，因为它被赋值给了 `closureReference` 变量。只有当没有任何变量引用该闭包函数时，垃圾回收器才会将其回收。例如，如果将 `closureReference` 设置为 `null` 或将其赋值为其他值，那么闭包函数就没有任何引用了，最终会被垃圾回收器回收。
> >
> > ```javascript
> > closureReference = null; // 解除对闭包函数的引用
> > ```
> >
> > 一旦没有任何引用指向闭包函数，它就可以被垃圾回收器回收，释放内存资源。
> >
> > 总结起来，只有当没有任何变量或函数引用一个闭包函数时，它才会被垃圾回收器回收。
>
> **面试题-小试牛刀(代码注释看[[note#^5e5364 | 推文]])**
>
> ```js
> var name = 'window'
> var person1 = {
>   name: 'person1',
>   foo1: function () {
>     console.log(this.name)
>   },
>   foo2: () => console.log(this.name),
>   foo3: function () {
>     return function () {
>       console.log(this.name)
>     }
>   },
>   foo4: function () {
>     return () => {
>       console.log(this.name)
>     }
>   }
> }
> 
> var person2 = { name: 'person2' }
> 
> person1.foo1();   // person1
> person1.foo1.call(person2); // person2
> 
> person1.foo2(); // window
> // foo2依然是箭头函数，不适用于显示绑定的规则
> person1.foo2.call(person2); // person2 x window
> 
> person1.foo3()(); // window
> // 但是拿到的返回函数依然是在全局下调用，所以依然是window
> person1.foo3.call(person2)(); // person2 x window
> person1.foo3().call(person2); // person2
> 
> // foo4()的函数返回的是一个箭头函数
> // 箭头函数的执行找上层作用域，是person1
> person1.foo4()(); //window x person1
> person1.foo4.call(person2)(); //person2
> // foo4返回的是箭头函数，箭头函数只看上层作用域
> person1.foo4().call(person2); // person2 x person1
> ```
>
> 做得一塌糊涂...
>
> ```js
> var name = 'window'
> function Person (name) {
>   this.name = name
>   this.foo1 = function () {
>     console.log(this.name)
>   },
>   this.foo2 = () => console.log(this.name),
>   this.foo3 = function () {
>     return function () {
>       console.log(this.name)
>     }
>   },
>   this.foo4 = function () {
>     return () => {
>       console.log(this.name)
>     }
>   }
> }
> var person1 = new Person('person1')
> var person2 = new Person('person2')
> 
> person1.foo1() // person1
> person1.foo1.call(person2) //person2
> 
> // foo是一个箭头函数，会找上层作用域中的this，那么就是person1
> person1.foo2() // window x person1
> person1.foo2.call(person2) // person1
> 
> person1.foo3()() // window
> person1.foo3.call(person2)() // window
> person1.foo3().call(person2) // person2
> 
> person1.foo4()() // person1
> // foo4调用时绑定了person2，返回的函数是箭头函数，调用时，找到了上层绑定的person2
> person1.foo4.call(person2)() // window x person2
> person1.foo4().call(person2) // person1
> ```
>
> ```js
> var name = 'window'
> function Person (name) {
>   this.name = name
>   this.obj = {
>     name: 'obj',
>     foo1: function () {
>       return function () {
>         console.log(this.name)
>       }
>     },
>     foo2: function () {
>       return () => {
>         console.log(this.name)
>       }
>     }
>   }
> }
> var person1 = new Person('person1')
> var person2 = new Person('person2')
> 
> // obj.foo1()返回一个函数
> // 这个函数在全局作用于下直接执行（默认绑定）
> person1.obj.foo1()() // obj | person1 x window
> person1.obj.foo1.call(person2)() // window
> person1.obj.foo1().call(person2) // person2
> 
> // 拿到foo2()的返回值，是一个箭头函数
> // 箭头函数在执行时找上层作用域下的this，就是obj
> person1.obj.foo2()() // obj | person1 -> obj
> // foo2()的返回值，依然是箭头函数，但是在执行foo2时绑定了person2
> // 箭头函数在执行时找上层作用域下的this，找到的是person2
> person1.obj.foo2.call(person2)() // person1 x person2
> // 箭头函数通过call调用是不会绑定this，所以找上层作用域下的this是obj
> person1.obj.foo2().call(person2) // person1 x obj
> ```

**小结**：this的四种绑定规则

1. 默认规则绑定（全局window）
2. 隐式绑定（谁调用就是绑定谁）
3. 显示绑定（call、bind、apply）
4. new绑定

以上优先级从高到低为 4-3-2-1

---

## @click="btnClick"，怎么做绑定的？（源码解析）

![image-20230713162652956](note.assets/image-20230713162652956.png)

绑定的大致思路（详情看视频第二集36min-38min有介绍）：通过循环（for...in）methods，判断是否有该方法，有的话通过bind函数绑定this存储到ctx[key]（这个是存储方法的，例如btnClick），publicThis指向的是我们组件实例的代理proxy对象（见下图（这个在后面响应式原理会讲到））

![image-20230713171542093](note.assets/image-20230713171542093.png)

![image-20230713171626313](note.assets/image-20230713171626313.png)

## template解析方法（后面详讲）

有两种，在vue源码内解析和vue-template-compiler（vue插件）解析

`instance.proxy"!"`，这是ts的语法，表示断言

proxy是es6新出的

## VSCode代码片段

![image-20230713204146055](note.assets/image-20230713204146055.png)

## 开发模式

![image-20230714201707700](note.assets/image-20230714201707700.png)

React是这么来写的

![image-20230714201839449](note.assets/image-20230714201839449.png)

把在template标签中的语法叫做模板语法，例如下图的{{}}、@click、v-bind指令这些等等

![image-20230714202000972](note.assets/image-20230714202000972.png)

## 模板语法

![image-20230714202311918](note.assets/image-20230714202311918.png)

### 文本插值

{{}} 叫 文本插值

01_Mustache语法.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <!-- 表达式太长就定义成methods方法 -->
        <h2>{{ message.split('').reverse().join('') }}</h2>
      </div>

      <!-- 错误用法 插值表达式只适合属性和表达式，不适合语句，无论什么语句，例如定义语句、判断语句-->
      <!-- <h2>{{ var name="abc" }}</h2> -->
      <!-- <h2>{{ if(isShow) { return '哈哈哈'} }}}</h2> -->
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

### v-once（不常见）

绑定的组件标签只渲染一次（包含其所有子组件，都不会重新渲染）

![image-20230716114808537](note.assets/image-20230716114808537.png)

02_基本指令_v-once.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2>{{ counter }}</h2>
        <h2 v-once>{{ counter }}</h2>
      </div>
      <button @click="increment">+1</button>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            counter: 10,
          };
        },
        methods: {
          increment() {
            this.counter++;
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

v-text

v-text等价于用{{}} 文本插值，但是文本插值还可以用表达式表示，所以一般开发里都会使用mustache语法（也就是文本插值的方式）

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <!-- 以下两种写法等价 -->
        <h2>{{ message }}</h2>
        <h2 v-text="message"></h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

### v-html（不常见）

04_基本指令_v-html.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>{{msg}}</div>
      <div v-html="msg"></div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            msg: '<span style="color:green; background-color:yellow">哈哈哈</span>',
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>

```

​	

### v-pre（不常见）

![image-20230716125646589](note.assets/image-20230716125646589.png)

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2 v-pre>{{ message }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

v-pre在vue编译阶段会自己执行

​	

### v-cloak（不常见）

![image-20230716130731948](note.assets/image-20230716130731948.png)

06_基本指令_v-cloak.html

```html
    <style>
      [v-cloak] {
        display: none;
      }
    </style>
  </head>

  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2 v-cloak>{{ message }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

options API 会逐渐被 component API 替代

因为vue3 对 vue2做了兼容，所以vue2项目升级vue3没有太多改变的地方

​	

### v-bind

![image-20230716150042599](note.assets/image-20230716150042599.png)

#### 绑定基本属性

![image-20230716151000083](note.assets/image-20230716151000083.png)

绑定的属性来自data()

01_v-bind的基本使用.html

```html
<body>
    <div id="app"></div>

    <!-- vue2 template模板中只能有一个根元素 -->
    <!-- vue3 是允许template中有多个根元素 -->
    <template id="my-app">
      <img :src="imgUrl" alt="图片" />
      <!-- 不写:语法糖，就只是普通字符串，不会解析变量属性 -->
      <img src="imgUrl" alt="图片" />
      <a v-bind:href="link">github</a>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            imgUrl: "https://avatars.githubusercontent.com/u/70643377?v=4",
            link: "https://github.com/Benn314/Coderwhy_Vue3-Typescript/blob/main/note.md",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

#### 绑定class介绍

![image-20230716165206513](note.assets/image-20230716165206513.png)

支持以下两种类型

- 对象语法
  - 多个键值对
  - 默认的class和动态的class结合
  - 将对象放到一个单独的属性中
  - 将返回的对象放到methods方法中
  - 将返回的对象放到计算属性中
- 数组语法
  - 字符串
  - data属性
  - 三元运算符
  - 对象语法

```html
<!-- 对象语法：{ 'active' : boolean} ''单引号可加可不加（套在key的那个单引号）-->
<div :class="{ 'active': isActive, title: true}">鸡毙你！</div>
```

![image-20230716162259370](note.assets/image-20230716162259370.png)

```html
<!-- 默认的class和动态的class结合 -->
<div class="abc cba" :class="{ active: isActive, title: true}">鸡毙你！</div>
```

![image-20230716162708438](note.assets/image-20230716162708438.png)

02_v-bind绑定class-对象语法.html

```html
    <style>
      .active {
        color: red;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div :class="className">哈哈哈</div>
      <!-- 对象语法：{ 'active' : boolean} ''单引号可加可不加（套在key的那个单引号）-->
      <!-- 同时 对象语法 可以有多个键值对 -->
      <div :class="{ 'active': isActive, title: true}">鸡毙你！</div>
      <button @click="toggle">切换</button>

      <!-- 默认的class和动态的class结合 -->
      <div class="abc cba" :class="{ active: isActive, title: true}">
        鸡毙你！
      </div>

      <!-- 将对象放到一个单独的属性中 -->
      <div class="abc cba" :class="classObj">鸡毙你！</div>

      <!-- 将返回的对象放到methods方法中 -->
      <div class="abc cba" :class="getClassObj()">鸡毙你！</div>

      <!-- 将返回的对象放到计算属性中 -->
      
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            className: "why",
            isActive: true,
            title: "abc",
            classObj: {
              // 注意，这里data里的属性（例如对象类型），不允许引用data的其他属性，不然响应式可能会出错
              active: true, // 像这里的话，不能引用isActive，所以我们要重新写个
              title: true,
            },
          };
        },
        methods: {
          toggle() {
            this.isActive = !this.isActive;
          },
          getClassObj() {
            return {
              active: true,
              title: true,
            };
          },
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>

```

03_v-bind绑定class-数组语法.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <!-- :class 以数组的方式存储属性，最后合并到class属性中 -->
      <div :class="['abc',title]">哈哈哈哈</div>
      <!-- :class数组中支持三元运算符和对象语法 -->
      <div :class="['abc', title, isActive ? 'active' : '', {act: isActive}]">哈哈哈哈</div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
            title: "cba",
            isActive: true,
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>

```

​	

#### 绑定style

![image-20230716165416524](note.assets/image-20230716165416524.png)

04_v-bind绑定style-对象语法.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div style="color: aquamarine">hello world!</div>
      <!-- 这里color值不加单引号单成变量来处理，如果你是想加一个确切的值，就加上单引号 -->
      <div :style="{color: 'aquamarine'}">hello world!</div>
      <div :style="{color: finalColor}">hello world!</div>

      <!-- 采用短横线分割的方式，需要用引号括起来 -->
      <div :style="{color: finalColor,'font-size': '20px'}">hello world!</div>
      <!-- 驼峰式可括可不括 效果一样 -->
      <div :style="{color: finalColor,fontSize: '20px'}">hello world!</div>
      <!-- 可拼接 -->
      <div :style="{color: finalColor,fontSize: finalFontSize+'px'}">
        hello world!
      </div>
      <!-- 直接绑定一个data对象 -->
      <div :style="finalStyleObj">hello world!</div>

      <!-- 直接绑定methods -->
      <div :style="getFinalStyleObj()">hello world!</div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
            finalColor: "aquamarine",
            finalFontSize: 50,
            finalStyleObj: {
              fontSize: "50px",
              'font-weight': 700, // 用短横线用驼峰都可以，习惯用驼峰
              backgroundColor: "red",
            },
          };
        },
        methods: {
          getFinalStyleObj(){
            return {
              fontSize: "50px",
              'font-weight': 700, // 用短横线用驼峰都可以，习惯用驼峰
              backgroundColor: "red",
            }
            // return this.finalStyleObj
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>

```

05_v-bind绑定style-数组语法.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div :style="[style1Obj, style2Obj]">
        hello
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
            style1Obj:{
              color:'red',
              fontSize:'50px'
            },
            style2Obj:{
              textDecoration:'underline',
            }
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>

```

#### 动态绑定属性

![image-20230716173412545](note.assets/image-20230716173412545.png)

06_v-bind动态绑定属性名称.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div :[name]="value">哈哈哈</div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            name: "cba",
            value: "kobe",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

![image-20230716173551199](note.assets/image-20230716173551199.png)

![image-20230716174323644](note.assets/image-20230716174323644.png)

Element Plus 饿了么团队维护

AntDesign 蚂蚁金服团队维护

AntDesign Vue 个人维护（一般不太倾向选择个人维护，因为一旦个人停止维护，很容易出bug，不过，以上三者都很优秀）

**07_v-bind属性直接绑定一个对象.html**

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div v-bind="info">哈哈哈</div>
      <!-- 只用v-bind的时候也可以只使用语法糖: 但不建议，因为这样阅读性比较差 -->
      <div :="info">哈哈哈</div>
      <!-- 等同于 -->
      <div name="why" age="18" height="1.88">哈哈哈</div>
      <!-- 这个作用很大，之后封装我们的高阶组件的时候会用来相互传递配置信息 -->
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            info: {
              name: "why",
              age: 18,
              height: 1.88,
            },
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

### v-on

![image-20230717193217815](note.assets/image-20230717193217815.png)

08_v-on的基本使用.html

```html
    <style>
      .area {
        width: 200px;
        height: 200px;
        background-color: aquamarine;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <!-- 
        语法糖：
        @click -> v-on:click 
        @mousemove -> v-on:mousemove
      -->
      <button @click="btn1Click">按钮1</button>
      <div class="area" @mousemove="mouseMove">鼠标移动</div>
      <!-- 绑定一个表达式 inline statement 如果表达式太复杂则定义成方法 -->
      <button @click="counter++">{{counter}}</button>
      <!-- 绑定一个对象 -->
      <div class="area" v-on="{click: btn1Click,mousemove: mouseMove}"></div>
      <!-- <div class="area" @="{click: btn1Click,mousemove: mouseMove}"></div> -->

    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
            counter: 100
          };
        },
        methods: {
          btn1Click(){
            console.log("按钮1发生了点击");
          },
          mouseMove(){
            console.log("鼠标移动");
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

（DOM）无论拖拽、点击还是鼠标移动事件，浏览器都会都会产生event对象

09_v-on的参数传递.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <!-- 默认传入event对象 可以在方法中去获取 -->
      <button @click="btnClick">按钮1</button>
      <!-- $event 可以获取到事件发生时的事件对象 -->
      <button @click="btn2Click($event,'coderwhy')">按钮2</button>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
        methods: {
          // 默认vue内部会帮我们绑定event事件，不用我们传参
          btnClick(event){
            console.log(event)
          },
          btn2Click(event,name){
            console.log(event,name)
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

![image-20230717193305690](note.assets/image-20230717193305690.png)

为什么是@click="method1"这么写，而不是@click="method1()"

> 因为我们是在做绑定，而不是调用它执行它，绑定完再通过click点击调用

event（DOM）可以回头看看

10_v-on的修饰符.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div @click="divClick">
        <button @click.stop="btnClick">按钮</button>
      </div>
      <input type="text" @keyup.enter="enterKeyup" />
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
        methods: {
          divClick() {
            console.log("divClick");
          },
          btnClick() {
            console.log("btnClick");
          },
          enterKeyup(event) {
            console.log("enterKeyup", event.target.value); // event.target.value 拿到输入的value值
          },
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

# 03-Vue基础-模板语法（二）

## 条件渲染

### v-if 基本使用

![image-20230718163204602](note.assets/image-20230718163204602.png)

01_条件渲染的基本使用.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2 v-if="isShow">{{ message }}</h2>
        <button @click="toggle">切换</button>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
            isShow:true
          };
        },
        methods: {
          toggle() {
            this.isShow = !this.isShow
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

![image-20230718163503584](note.assets/image-20230718163503584.png)

02_多个条件的渲染.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <input type="text" v-model="score"/>
        <h2 v-if="score>90">优秀</h2>
        <h2 v-else-if="score>60">良好</h2>
        <h2 v-else>不及格</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
            score: 90,
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

#### 结合template

v-if指令需要绑定在元素标签上，有时候我们并不想多创建一个div元素，因为他会渲染到我们的页面，这时候我们可以使用template元素标签，因为他不会渲染到页面，但同时会执行

03_template和v-if结合使用.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <!-- template标签没写指令的话，在页面根本看到里面写的内容 -->
      <template v-if="isShow1">
        <h2>111111</h2>
        <h2>111111</h2>
        <h2>111111</h2>
      </template>

      <template v-else>
        <h2>222222</h2>
        <h2>222222</h2>
        <h2>222222</h2>
      </template>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            isShow1: true,
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

### v-show

![image-20230719200617733](note.assets/image-20230719200617733.png)

05_v-if和v-show的区别.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <!-- v-if -->
      <h2 v-if="isShow">1111</h2>
      <!-- display:none -->
      <h2 v-show="isShow">2222</h2>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            isShow: false,
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

## 列表渲染

![image-20230719203042793](note.assets/image-20230719203042793.png)

### v-for基本使用

01_v-for的基本使用.html

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <h2>电影列表</h2>
      <ul>
        <!-- 遍历数组 不加括号也可以，但可读性差 -->
        <li v-for="(item,index) in movies" :key="item">
          {{index+1}}.{{ item }}
        </li>
      </ul>
      <h2>个人信息</h2>
      <ul>
        <!-- 遍历对象 不加括号也可以，但可读性差 -->
        <li v-for="(value,key,index) in info">{{key}}-{{value}}-{{index}}</li>
      </ul>
      <h2>遍历数字</h2>
      <ul>
        <!-- 从1开始 不加括号也可以，但可读性差 -->
        <li v-for="(num,index) in 10">{{num}}-{{index}}</li>
      </ul>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            movies: ["星际穿越", "盗梦空间", "西游记", "功夫瑜伽", "功夫瑜伽2"],
            info: {
              name: '凌云木',
              age: 18,
              height: 185,
            },
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```



### 结合template

ul标签下不建议加div标签，多用一个div，dom操作会多插入一个div，多少造成性能浪费，同事HTML文档标准也是不推荐这样去用的，我们可以用template标签来代替div标签，同时它不会被渲染出来；而且如果我们需要在渲染列表的同时穿插hr横线标签，我们照样可以用li标签代替，然后例如给他一个class="line"，修改样式为横线就行，优化性能（这一小段可作为面试知识点）

v-for遍历会把当前元素和其子元素按照长度一次次渲染

**02_v-for和template.html**

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <h2>v-for在template</h2>
      <ul>
        <template v-for="(value,key) in info">
          <li>{{key}}</li>
          <li>{{value}}</li>
          <li class="line"></li>
        </template>
      </ul>
      <hr />
      <h2>v-for在div</h2>
      <ul>
        <div v-for="(value,key) in info">
          <li>{{key}}</li>
          <li>{{value}}</li>
          <li class="line"></li>
        </div>
      </ul>
      <hr />
      <h2>v-for在ul</h2>
      <ul v-for="(value,key) in info">
        <li>{{key}}</li>
        <li>{{value}}</li>
        <li class="line"></li>
      </ul>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            info: {
              name: "why",
              age: 18,
              height: 185,
            },
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

### 数组更新检测

![image-20230720145408756](note.assets/image-20230720145408756.png)

**03_数组的修改方法.html**

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <h2>电影列表</h2>
      <ul>
        <li v-for="(item,index) in movies" :key="item">
          {{index+1}}.{{ item }}
        </li>
      </ul>
      <!-- 当在输入框中输入内容后按下回车键，就会触发 addMovie 方法 -->
      <input type="text" v-model="newValue" @keyup.enter="addMovie"/>
      <button @click="addMovie">点击添加</button>
      <button @click="filter1">筛选名字长度大于2的电影</button>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            newValue: "",
            movies: ["星际穿越", "盗梦空间", "西游记", "功夫瑜伽", "功夫瑜伽2",'小明','小红'],
            info: {
              name: "凌云木",
              age: 18,
              height: 185,
            },
          };
        },
        methods: {
          addMovie() {
            this.movies.push(this.newValue);
            this.newValue = ""; // 重置输入框
          },
          filter1(){
            this.movies = this.movies.filter(item=>item.length>2);
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

​	

### key

> `key` 在这里是一个通过 `v-bind` 绑定的特殊 attribute。请不要和[在 `v-for` 中使用对象](https://cn.vuejs.org/guide/essentials/list.html#v-for-with-an-object)里所提到的对象属性名相混淆。

![image-20230720162203192](note.assets/image-20230720162203192.png)

![image-20230720163257617](note.assets/image-20230720163257617.png)

![image-20230720163807677](note.assets/image-20230720163807677.png)

#### 认识VNode

![image-20230720164926148](note.assets/image-20230720164926148.png)

![image-20230720165017806](note.assets/image-20230720165017806.png)

![image-20230720165124960](note.assets/image-20230720165124960.png)

VNode是描述结点元素来的

**i标签干什么用**

> 在HTML中，`<i>`标签用于表示斜体文本。然而，值得注意的是，`<i>`标签在HTML5中被弃用，不再用于表达斜体文本的意义。
>
> 在HTML5中，`<i>`标签被视为一个不重要的、纯粹用于样式的元素，它没有语义上的意义。建议在HTML5中使用更语义化的标签来表示斜体文本，如`<em>`标签。
>
> 所以，如果你想要表达强调、重点或特别注意的文本，最好使用`<em>`标签而不是`<i>`标签。`<em>`标签表示强调的内容，浏览器默认会将其显示为斜体，并且具有语义意义，有助于更好地理解文本内容。

![image-20230720195822056](note.assets/image-20230720195822056.png)

虚拟DOM和真实DOM在正常情况下不会一一对应（考虑组件的话），组件本身也有生成VNode，但组件本身不会在虚拟DOM渲染，最后虚拟DOM才生成我们的真实DOM

##### 为什么不直接生成真实DOM？

> 为了做跨平台，有虚拟DOM的话可以做服务端渲染，也可以做weex（移动端）
>
> ==weex是什么（做diff算法性能高点）==
>
> Weex是一种跨平台的移动应用开发框架，由阿里巴巴前端团队开发。它允许开发人员使用Vue.js框架来构建原生移动应用，同时支持iOS和Android平台。
>
> Weex的核心思想是将前端开发的能力扩展到移动端，通过使用Vue.js的组件化开发模式和语法，开发人员可以轻松地构建跨平台的移动应用，无需学习新的语言或技术。
>
> Weex的工作原理是将Vue.js组件编译成原生组件，然后在移动端运行。这样，开发人员可以使用熟悉的前端开发技术，同时利用原生移动应用的性能和体验优势。
>
> Weex不仅可以用于开发移动应用，还可以用于开发小程序和桌面应用等跨平台应用。它提供了丰富的组件和模块，可以满足各种应用的需求。
>
> 总的来说，Weex是一种便捷的跨平台移动应用开发框架，为开发人员提供了更高效、更灵活的方式来构建原生移动应用。

##### VNode和虚拟DOM的区别：

- VNode：（Virtual Node），是一个节点
- VDOM：（Virtual DOM），是由多个VNode节点形成的树结构（VNode Tree）

> 这一部分是模板编译的内容，他们两个会变成AST最后变成Render函数（变成createNode函数），后面章节会详细说明

​	

三种性能模式：

1. 清空VNodes重新加载新的VNodes（性能最差）
2. 保留部分旧的VNodes，从开始发生变化的地方进行修改（数据交换或者删除重新渲染）（性能较低）
3. 运用diff算法，保留可保留的所有旧的VNodes，更新新的VNodes（vue干的事，性能较高）

![image-20230720202444621](note.assets/image-20230720202444621.png)

新的VNodes和旧的VNodes对比的过程就是diff算法实现的过程

![image-20230720202635000](note.assets/image-20230720202635000.png)

哪里需要发生变化，再去变化哪里（diff算法需要做的事情）

**04_key案例-插入元素.html**

```html
  <body>
    <div id="app"></div>

    <template id="my-app">
      <ul>
        <li v-for="item in letters">{{item}}</li>
      </ul>
      <button @click="addF">插入F</button>
      <!-- 重新插入元素，会导致ul重新遍历，也就会重新渲染VNodes，这时候就涉及到，怎么渲染的性能最高的问题了 -->
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            letters: ["a", "b", "c", "d"],
          };
        },
        methods: {
          addF() {
            this.letters.splice(2, 0, "f");
          },
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
```

![image-20230720203432751](note.assets/image-20230720203432751.png)

> 注意：<li v-for="(item,index) in letters" :key="index">{{item}}</li> 
>
> 这里:key赋值index是不会提升性能的，只是让esLint停止警告而已，需要放入唯一的东西，例如id

##### 源码阅读

![image-20230720205114552](note.assets/image-20230720205114552.png)

patch可以理解为更新

##### diff算法——patchUnkeyedChildren()和patchkeyedChildren()方法

- （v-for没有key的算法）的操作思路如下（3步）：

  - 先对比旧VNodes列表和新VNodes列表的长度，取小的长度进行遍历（取大的可能会造成越界），依次对比节点信息是否相同，相同则保留不做处理，不相同则patch更新。遍历后，如果旧的节点数大于新的节点数则移除剩余的节点，否则则创建新的节点（VNode遍历短的，对比后保留长的，因为只有长的列表才有完整的源数据，看保留的是哪个长列表（新VNodes or 旧VNodes），做新增/删除节点操作）


- （v-for有key的算法）的操作思路如下（5步）：（分有序和无序）
  - 根据key值可分辨不同的节点（key相同，内容相同），比如做插入操作，它是通过while循环（因为不确定循环次数，所以用while比用for合适），从第一个遍历到新旧VNode列表不相同时，break跳出循环，接着从最后一次便利，同样不相同时跳出循环，如果新列表是有新增节点操作，则先插入null，后面mount进行挂载，如果新列表是删除节点操作，则用umount卸载节点。（列表有序操作）
  - 列表无序的意思是说旧VNode进行增删改后，通过前后while循环，中间不同的n个节点，新旧列表中有相同的节点，但相对位置不同，简单粗暴的解法是全删了重新新增，但这样效率太低（有利于人脑理解而已，我们要求的是效率高），所以根据key值，我们要新建一个数组列表，通过其算法（后续可自行谷歌）找出相同的节点存储到新建的数组列表中，后续再进行mount/umount（pdf资料有过程介绍，可以简单看下）![image-20230802205207889](note.assets/image-20230802205207889.png)

​	

# 04-Vue基础语法（三）Vue3 Option API

补充：https://cn.vuejs.org/guide/essentials/list.html#v-for 

> 1. 对于多层嵌套的 `v-for`，作用域的工作方式和函数的作用域很类似。每个 `v-for` 作用域都可以访问到父级作用域：
>
> ```vue
> <li v-for="item in items">
>   <span v-for="childItem in item.children">
>     {{ item.message }} {{ childItem }}
>   </span>
> </li>
> ```
>
> 你也可以使用 `of` 作为分隔符来替代 `in`，这更接近 JavaScript 的迭代器语法：
>
> ```vue
> <div v-for="item of items"></div>
> ```
> 2. v-for="value, index in items" 和 v-for="(value, index) in items"，都是可以的，但是习惯用后者

## computed

模板 -->(联想) template

![image-20230821171414131](note.assets/image-20230821171414131.png)

![image-20230821172005775](note.assets/image-20230821172005775.png)

![image-20230821172017689](note.assets/image-20230821172017689.png)

01_三个案例的实现-插值语法.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2>{{ firstName + ' ' + lastName }}</h2>
        <h2>{{ score >= 60 ? '及格':'不及格' }}</h2>
        <h2>{{ message.split(' ').reverse().join(' ') }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            firstName: 'Ben',
            lastName: 'qiu',
            score: 80,
            message: "hello world!",
          };
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

![image-20230821173053595](note.assets/image-20230821173053595.png)

02_三个案例的实现-methods.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2>{{ getFullName() }}</h2>
        <h2>{{ getResult() }}</h2>
        <h2>{{ getReverseMessage() }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            firstName: 'Ben',
            lastName: 'qiu',
            score: 80,
            message: "hello world!",
          };
        },
        methods: {
          getFullName(){
            return this.firstName + ' ' + this.lastName
          },
          getResult(){
            return this.score >= 60 ? '及格':'不及格'
          },
          getReverseMessage(){
            return this.message.split(' ').reverse().join(' ')
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

![image-20230821173710043](note.assets/image-20230821173710043.png)

03_三个案例的实现-computed.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <h2>{{ fullName }}</h2>
        <h2>{{ result }}</h2>
        <h2>{{ reverseMessage }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            firstName: 'Ben',
            lastName: 'qiu',
            score: 80,
            message: "hello world!",
          };
        },
        computed: {
          //fullName()这里看起来像methods函数，实际上是对象里其中一个getter的属性
          fullName(){ // 赋值了一个函数，es6缩写了
            return this.firstName + ' ' + this.lastName
          },
          result(){
            return this.score >= 60 ? '及格':'不及格'
          },
          reverseMessage(){
            return this.message.split(' ').reverse().join(' ')
          }
        }
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

---

watch一般不监听computed，监听data和props多一点 ^5d8f9d

### 计算属性的实践原理是什么？

> （待补充）

---

04_methods-computed区别.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <button @click="change">点我改变first name</button>
        <h2>{{ fullName }}</h2>
        <h2>{{ fullName }}</h2>
        <h2>{{ fullName }}</h2>

        <h2>{{ getFullName() }}</h2>
        <h2>{{ getFullName() }}</h2>
        <h2>{{ getFullName() }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            firstName: 'Ben',
            lastName: 'qiu',
            score: 80,
            message: "hello world!",
          };
        },
        computed: {
          //fullName()这里看起来像methods函数，实际上是对象里其中一个getter的属性
          fullName(){ // 赋值了一个函数，es6缩写了
            console.log('computed');
            return this.firstName + ' ' + this.lastName
          },
        },
        methods: {
          getFullName(){
            console.log('methods');
            return this.firstName + ' ' + this.lastName
          },
          change(){
            this.firstName = "coder"
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

​	

### 计算属性的setter和getter

![image-20230821192329535](note.assets/image-20230821192329535.png)

在computed传入一个属性是对象还是函数，vue源码中只是将属性用三元运算符进行是否为函数的判断而已，computed选项和methods选项在vue源码中在同一个文件中

05_computed的setter和getter.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <button @click="change">点我改变full name</button>
        <h2>{{ fullName }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            firstName: 'Ben',
            lastName: 'qiu',
            score: 80,
            message: "hello world!",
          };
        },
        computed: {
          //fullName 的 getter方法（有return） 这种写法相当于是getter的一个语法糖，相对完整写法只是做了一个简单判断，下面展示完整写法
          // fullName() {
          //   return this.firstName + ' ' + this.lastName
          // },
          fullName:{
            get: function(){
              return this.firstName + ' ' + this.lastName
            },
            set: function(newValue){
              console.log(newValue);
              const names = newValue.split(" ")
              // 简单使用，没有做值的越界判断(判断长度)
              this.firstName = names[0]
              this.lastName = names[1]
            }
          }
        },
        methods: {
          change(){
            this.fullName = "coder why"
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

computed没写set属性是不能修改值的，写了set的话赋值是会调用执行到set方法的

一般我们对一个对象的进行setter方法的调用时,调用的这个set方法称之为setter方法

![image-20230821192218736](note.assets/image-20230821192218736.png)

​	

## watch

![image-20230821202440968](note.assets/image-20230821202440968.png)

![image-20230822190925003](note.assets/image-20230822190925003.png)

在某些情况下，我们希望在代码逻辑中监听某个数据的变化，这个时候就需要用侦听器watch来完成了

01_侦听器的基本使用.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        您的问题：
        <input type="text" v-model="question">
        <button @click="queryAnswer">搜索答案</button>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            question: "hello world!",
            answer:''
          };
        },
        watch:{
          question(newValue,oldValue){
            console.log('新值: ',newValue,'旧值',oldValue);
            this.queryAnswer();
          }
        },
        methods: {
          queryAnswer(){
            console.log(`您的问题${this.question}答案是哈哈哈哈`);
            this.answer = "";
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

[[note#^5d8f9d]]

​	

### 配置选项

![image-20230821205659706](note.assets/image-20230821205659706.png)

> 可能原因：watch监听不到引用数据类型的旧值 or 深度监听同一个引用属性，没有对旧属性值做一个拷贝备份，如果我们需要这个旧值的话，那确实算一个bug（临时解决是需要我们自己手动拷贝旧值（深拷贝））
>
> 确定原因：Vue官方文档有进行说明
>
> ![image-20230823200113571](note.assets/image-20230823200113571.png)
>
> ![image-20230823200404022](note.assets/image-20230823200404022.png)

02_侦听器的配置选项.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <h2>{{ info.name }}</h2>
      <button @click="changeInfo">changeInfo</button>
      <button @click="changeInfoName">改变Info.name</button>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: '#my-app',
        data() {
          return {
            // return 的最后变成proxy代理对象
            info: { name: 'why', age: 18 },
          }
        },
        watch: {
          // 默认情况下我们的侦听器只会针对监听的数据本身的改变（内部发生的改变是不能侦听，需要的话需要深度侦听）
          // info(newValue, oldValue) {
          //   console.log('新值: ', newValue, '旧值', oldValue)
          // },

          // 深度侦听/立即执行
          // 上面写法是下面handler写法的语法糖
          info: {
            handler: function (newInfo, oldInfo) {
              console.log('新值: ', newInfo, '旧值', oldInfo)
            },
            deep: true, // 深度侦听
            immediate: true, // 页面刷新无数据改变时也给我监听一次
          },
        },
        methods: {
          changeInfo() {
            this.info = { name: 'ben' }
          },
          changeInfoName() {
            this.info.name = 'ben' //只是改变内部属性watch侦听不到
          },
        },
      }

      Vue.createApp(App).mount('#app')
    </script>
  </body>
</html>

```

生命周期是函数，称为生命周期函数

![image-20230822194224859](note.assets/image-20230822194224859.png)

03_侦听器的其他方式.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <h2>{{ info.name }}</h2>
      <button @click="changeInfo">changeInfo</button>
      <button @click="changeInfoName">改变Info.name</button>
      <button @click="changeFriendsName">改变friends[0].name</button>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: '#my-app',
        data() {
          return {
            // return 的最后变成proxy代理对象
            info: { name: 'why', age: 18, nba: { name: 'kobe' } },
            friends: [{ name: 'xiaoming' }, { name: 'daming' }],
          }
        },
        watch: {
          // 这种写法可以直接侦听某一属性，属性要加上引号，vue内部会进行对象解析
          'info.name': function (newName, oldName) {
            console.log(newName, oldName)
          },
          'friends[0].name': function (newName, oldName) {
            // 这种语法不支持直接监听，太过复杂，需要开启deep进行深度监听才行
            console.log(newName, oldName)
          },
          // 深度侦听，对于friends这种数据结构，这么深度侦听还不是最优解 我们可以采用组件的形式 图片放到note里了
          // friends: {
          //   handler(newFriends, oldFriends) {},
          //   deep: true,
          // },
        },
        methods: {
          changeInfo() {
            this.info = { name: 'ben' }
          },
          changeInfoName() {
            this.info.name = 'ben' //只是改变内部属性watch侦听不到
          },
          changeFriendsName() {
            this.friends[0].name = 'ben' //只是改变内部属性watch侦听不到
          },
        },
        // 可以用$watch API在created生命周期函数进行监听, 并且它有unwatch返回值，执行unwatch可以取消侦听
        created() {
          const unwatch = this.$watch(
            'info',
            function (newInfo, oldInfo) {
              // 这里可以使用箭头函数，因为this会从上级找，这里的上级也就是created
              console.log(newInfo, oldInfo)
            },
            {
              deep: true,
              immediate: true,
            }
          )
          // 执行一次侦听后返回unwatch，执行可取消侦听
          unwatch()
        },
      }

      Vue.createApp(App).mount('#app')
    </script>
  </body>
</html>

```

​	

## 购物车综合案例

### splice三个参数介绍

在 JavaScript 中，`splice()` 方法用于修改数组，可以用来添加、删除和替换数组中的元素。`splice()` 方法接受三个参数：

1. **开始索引（start）：** 这是要修改数组的起始位置，也就是你想要添加、删除或替换的元素的位置。

2. **删除的数量（deleteCount）：** 这是你想要删除的元素的数量。如果你不想删除任何元素，可以将这个参数设置为 0。

3. **要插入的元素（item1, item2, ...）：** 这是你想要在开始索引位置插入的元素。你可以同时插入多个元素，它们会依次排列在数组中。

下面是一些示例，以帮助你理解 `splice()` 方法的用法：

```javascript
const fruits = ['apple', 'banana', 'cherry', 'date'];

// 删除元素：从索引 1 开始，删除 2 个元素（'banana' 和 'cherry'）
fruits.splice(1, 2); // 结果为 ['apple', 'date']

// 添加元素：从索引 1 开始，删除 0 个元素，插入 'orange'
fruits.splice(1, 0, 'orange'); // 结果为 ['apple', 'orange', 'date']

// 替换元素：从索引 1 开始，删除 1 个元素，插入 'grape'
fruits.splice(1, 1, 'grape'); // 结果为 ['apple', 'grape', 'date']
```

需要注意的是，`splice()` 方法会在原数组上进行修改，并返回一个包含被删除的元素的新数组。如果你只想删除元素而不关心返回值，可以忽略接收返回值。

​	

改变我们的价格可以使用过滤器 Filter（只适合vue2，vue3不支持过滤器了，相关API在vue3中被删掉了）

### 高阶函数是什么

高阶函数是一种在计算机编程中的概念，它指的是接受一个或多个函数作为参数，并/或返回一个函数的函数。在函数式编程中，高阶函数是一种非常有用的概念，它允许你以更抽象和灵活的方式处理函数，从而使代码更加模块化、可重用和可维护。

在 JavaScript 中，函数可以被传递给其他函数，也可以从函数中返回，因此你可以使用高阶函数来实现许多强大的功能。以下是一些常见的高阶函数的示例：

1. **map()：** `map()` 是数组的方法，它接受一个函数作为参数，然后对数组中的每个元素都应用这个函数，并返回一个新的数组。

2. **filter()：** `filter()` 是数组的方法，它接受一个函数作为参数，然后返回一个只包含符合条件的元素的新数组。

3. **reduce()：** `reduce()` 是数组的方法，它接受一个函数作为参数，用于将数组中的元素逐个累积到一个值中。

4. **forEach()：** `forEach()` 是数组的方法，它接受一个函数作为参数，用于对数组中的每个元素执行一次操作。

5. **函数柯里化（Currying）：** 这是将一个接受多个参数的函数转化为接受一个参数的函数序列的过程。这使得函数更具通用性和复用性。

6. **函数组合：** 这是将多个函数组合成一个新函数的过程。这可以通过将一个函数的输出作为另一个函数的输入来实现。

使用高阶函数可以让代码更具有表现力、模块化和可维护性。它们提供了一种灵活的方式来操作函数，使得代码更容易扩展和修改。

​	

### 解释：Object.assign({}, item)

`Object.assign()` 是 JavaScript 的一个内建函数，用于将一个或多个源对象的属性复制到目标对象中。在给定的示例中，`Object.assign({}, item)` 的作用是创建一个新的对象，并将 `item` 对象的所有属性复制到这个新对象中。

具体解释如下：

- `Object.assign(target, source1, source2, ...)` 接受一个目标对象 `target` 和一个或多个源对象 `source1`, `source2`, ...。
- 它会将源对象的属性复制到目标对象中，如果目标对象已经存在相同属性，则会进行覆盖。
- 如果目标对象是一个空对象（例如 `{}`），那么这个方法会在目标对象中创建一个与源对象相同的副本。

在你的示例中，`Object.assign({}, item)` 创建了一个新的空对象 `{}`，然后将 `item` 对象的所有属性复制到这个新对象中。这样做的结果是获得了 `item` 对象的一个副本，而不是直接修改原始的 `item` 对象。这种方法常用于避免直接修改源对象，从而确保数据不会被意外修改。

​	

mustache语法是可以调用methods的

​	

**购物车案例代码：**

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <template v-if="books.length>0">
        <table>
          <thead>
            <th>序号</th>
            <th>书籍名称</th>
            <th>出版日期</th>
            <th>价格</th>
            <th>购买数量</th>
            <th>操作</th>
          </thead>
          <tbody>
            <tr v-for="(book,index) in books">
              <td>{{index+1}}</td>
              <td>{{book.name}}</td>
              <td>{{book.date}}</td>
              <td>{{formatPrice(book.price)}}</td>
              <td>
                <button :disabled="book.count<=1" @click="decrement(index)">
                  -
                </button>
                <span class="counter">{{book.count}}</span>
                <!-- <button @click="increment($event)">+</button> 事件对象要加上$ 进行获取-->
                <button @click="increment(index)">+</button>
              </td>
              <td>
                <button @click="removeBook(index)">移除</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h2>总价格：{{formatPrice(totalPrice)}}</h2>
      </template>
      <template v-else>
        <h2>购物车为空~</h2>
      </template>
    </template>

    <script src="../js/vue.js"></script>
    <script src="./index.js"></script>
  </body>
</html>

```

index.js

```js
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

```

style.css

```css
table {
  border: 1px solid #e9e9e9;
  border-collapse: collapse; /*这个属性用于控制表格边框的折叠方式。collapse 表示相邻的边框会合并为一个单一的边框，使表格看起来更整洁。*/
  border-spacing: 0; /* 这个属性设置相邻单元格之间的间隔。在这里，间隔被设置为 0，意味着单元格之间没有间隔，边框直接相连。 */
}

th, td {
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
}

.counter {
  margin: 0 5px;
}

```



​	

# 05-Vue3组件化开发（一）

## Vue3的表单和开发模式

表单v-model

用组件做watch，我们监听的话就是监听props里的friend，一般很少直接监听数组

![用组件做watch](note.assets/image-20230823200940216.png)

v-for和v-if不推荐一起用

### 知识点补充：浅拷贝深拷贝

> 引用赋值图就不画了~

#### 浅拷贝图例

![浅拷贝图例](note.assets/image-20230823202328620.png)

![image-20230823202412324](note.assets/image-20230823202412324.png)

如果对象里面有对象，那么里面的对象还有开辟一个新的内存空间，而他的值是新开辟空间的地址，因为对象都是引用类型

01_对象的引用-浅拷贝-深拷贝.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>

    <!-- 1.对象的引用赋值 -->
    <script>
      const info1 = { name: 'ben', age: 18 }
      const obj1 = info1
      info1.name = 'cammile'
      console.log(obj1.name) //cammile
    </script>

    <!-- 2.对象的浅拷贝 -->
    <script>
      const info2 = { name: 'ben', age: 18, friend: { name: 'xiaop' } }
      // const obj2 = Object.assign({}, info2) // 浅拷贝的实现有多种，这里只是用了assign这种方法
      // 采用lodash做浅拷贝
      const obj2 = _.clone(info2)

      info2.name = 'kobe'
      console.log(obj2.name) // ben

      info2.friend.name = 'xiaoz'
      console.log(obj2.friend.name) // xiaoz

    </script>

    <!-- 3.对象的深拷贝 -->
    <script>
      const info3 = { name: 'ben', age: 18, friend: { name: 'xiaop' } }
      // const obj3 = JSON.parse(JSON.stringify(info3)) // 采用原生的方式进行深拷贝 也可以用lodash的_.cloneDeep
      const obj3 = _.cloneDeep(info3)
      info3.friend.name = 'xiaoz'
      console.log(obj3.friend.name) // xiaop
    </script>
  </body>
</html>

```

​	

### v-model

![image-20230824193321176](note.assets/image-20230824193321176.png)

语法糖就是缩写形式

![image-20230824194250809](note.assets/image-20230824194250809.png)

01_v-model的基本使用.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <div>
        <!-- <input type="text" v-model="message"> -->
        <!-- 效果跟上面等同, 操作如下：1. v-bind的绑定 2.监听input事件，更新message的值-->
        <input type="text" :value="message" @input="inputChange">
        <h2>{{ message }}</h2>
      </div>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: "#my-app",
        data() {
          return {
            message: "hello world!",
          };
        },
        methods: {
          inputChange(event){
            this.message = event.target.value;
          }
        },
      };

      Vue.createApp(App).mount("#app");
    </script>
  </body>
</html>
```

02_v-model绑定其他表单.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <template id="my-app">
      <!-- 1. 绑定textarea -->
      <label for="intro">
        自我介绍
        <textarea
          name="intro"
          id="intro"
          cols="30"
          rows="10"
          v-model="intro"
        ></textarea>
      </label>
      <h2>intro: {{intro}}</h2>

      <!-- 2.1 checkbox 单选框 -->
      <label for="agree"
        ><input id="agree" type="checkbox" v-model="isAgree" />同意协议</label
      >
      <h2>isAgree：{{isAgree}}</h2>
      <!-- 
        <label> 元素：<label> 是一个 HTML 元素，用于创建标签或标签组，通常与表单元素关联，以提高用户体验和可访问性。在这里，<label> 包裹了复选框元素，以便用户点击标签文本时也能选中复选框。
        for 属性：for 属性用于将 <label> 与一个特定的表单元素关联起来。它的值应该是要关联的表单元素的 id 属性值。这样，当用户点击标签文本时，关联的表单元素会获得焦点或被选中。
      -->

      <!-- 2.2 复选框 input标签要加上value-->
      <label for="basketball"
        ><input id="basketball" type="checkbox" v-model="hobbies" value="basketball"/>篮球</label
      >
      <label for="football"
        ><input id="football" type="checkbox" v-model="hobbies" value="football"/>足球</label
      >
      <label for="tennis"
        ><input id="tennis" type="checkbox" v-model="hobbies" value="tennis"/>网球</label
      >
      <h2>hobbies:{{hobbies}}</h2>

      <!-- 3.radio -->
      <label for="male"
        ><input id="male" type="radio" v-model="gender" value="male"/>男</label
      >
      <label for="female"
        ><input id="female" type="radio" v-model="gender" value="female"/>女</label
      >
      <label for="notHuman"
        ><input id="notHuman" type="radio" v-model="gender" value="notHuman"/>非人类</label
      >
      <h2>gender:{{gender}}</h2>

      <!-- 4.select -->
      <span>喜欢的水果:</span>
      <!-- 加了multiple后可以多选 size决定select的高度-->
      <select v-model="fruit" multiple size="2">
        <option value="apple">苹果</option>
        <option value="banana">香蕉</option>
        <option value="pear">梨</option>
      </select>
      <h2>fruit:{{fruit}}</h2>
    </template>

    <script src="../js/vue.js"></script>
    <script>
      const App = {
        template: '#my-app',
        data() {
          return {
            intro: 'hello world!',
            isAgree: false,
            hobbies:[],
            gender: '',
            fruit:''
          }
        },
      }

      Vue.createApp(App).mount('#app')
    </script>
  </body>
</html>

```

![image-20230824203632057](note.assets/image-20230824203632057.png)

​	

### v-lazy

![image-20230824204020159](note.assets/image-20230824204020159.png)

**v-model赋值会把双向绑定的值转变（传递）为string类型，除了属性值最开始初始化是他本身的类型值，后面一旦通过v-model重新赋值，就会变成string，而且这跟input标签的type类型值无关，type=”number“只是让键盘上输入英文字母失效，只能输入数字，但打印输出v-model重新赋值的值类型还是string**

视频进度01:38:13