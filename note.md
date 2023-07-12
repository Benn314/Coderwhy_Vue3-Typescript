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

## 计数器案例（原生 & Vue 实现）

![image-20230711093536207](note.assets/image-20230711093536207.png)

> 挂载元素后面可以配置代码片段来快速生成

![image-20230711094357614](note.assets/image-20230711094357614.png)

在template中，vue3最外层给不给div标签都可以，vue2是要的

> 暂时不清楚上图说的另一方式编写有提示指的是什么（答：在template标签进行）

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

---

![image-20230711111112616](note.assets/image-20230711111112616.png)

![image-20230711111131179](note.assets/image-20230711111131179.png)

如果用的不是template标签而是其他标签（例如div标签），那么页面会被渲染两次的（一次是原生渲染一次是经过vue处理后渲染），为什么会这样？

> 上面刚刚已经说明了原因，template标签是不会被浏览器渲染（看上面写的[[note#^00ee8c | template作用]]）

![image-20230711111937205](note.assets/image-20230711111937205.png)

## methods属性

绑定到template标签或者template内的标签都可以

![image-20230711142459508](note.assets/image-20230711142459508.png)

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

# Vue3模板语法

