## 1. 模板引擎
1. 使用步骤
    1. 引入到页面中
    1. 准备一个模板，写在script标签中
    1. 准备一个数据
    1. 通过模板引擎的JS提供的一个函数将模板和数据整合得到渲染结果HTML
    1. 将渲染结果的HTML 设置到 默认元素的 innerHTML 中
1. 前端代码：  
    ``` html
    <!-- 原html结构中只有一个空的table标签 -->
    <body>
        <table id="table" style="border:1px solid #ccc"></table>
    </body>
    <!-- 引入模板引擎js -->
    <script src="template-web.js"></script>
    <!-- 定义html模板，注意是script标签，注意type -->
    <script id="myTemplate" type="text/x-art-template">
        {{each arrData}}
            <tr>
                <td>{{$value.id}}</td>
                <td>{{$value.name}}</td>
                <td>{{$value.gender}}</td>
            </tr>
        {{/each}}
    </script>
    <!-- Ajax请求数据 -->
    <script>
        var xhr = new XMLHttpRequest();
        xhr.open("get","http://localhost:8089/fontEnd/queryData");
        xhr.send();
        xhr.responseType="json";
        xhr.onload = function(){
            // 定义模板引擎渲染的数据
            var respData = {arrData:this.response};
            // 根据数据与模板，生成html代码
            var htmlCode = template("myTemplate",respData);
            console.log(htmlCode);
            // 将生成的html代码添加到页面上
            document.getElementById("table").innerHTML=htmlCode;
        };
    </script>
    ```
1. 后端代码：  
    ``` java
    @RequestMapping("queryData")    
    public  List<Student> queryData(){
        List<Student> stuList = new ArrayList<>();
        Student stu;
        for (int i = 0; i < 5; i++) {
            stu = new Student(i,"张三"+i,"男");
            stuList.add(stu);
        }
        return stuList;
    }
    ```
1. 效果： 
    ![image text](images/模板引擎01.png)

## 2. 封装Ajax方法
1. 最基础的封装
    1. 思路：按照常规的思维，封装样板代码，暴露请求方法、请求路径、请求参数，返回请求结果；
    1. 代码：  
        ``` js
        // 封装ajax请求方法-1：最基础的
        function myAjax(method,url,fn){
            var respData ;
            var xhr = new XMLHttpRequest();
            xhr.open(method,url);
            xhr.send();
            xhr.onload = function(){
                respData = xhr.response;
            }
            return respData;
        }
        console.log(myAjax("get","http://localhost:8089/frontEnd/queryData"));
        ```
    1. 效果：  
        ![image text](images/ajax封装01.png)
    1. 问题：并未按照预期返回需要的数值
    1. 原因：js的ajax请求默认是异步的，也就是刚发起请求，不管时候请求完成，将结果返回了，这样导致返回的结果是undefined
    1. 解决方式：暴露结果处理函数（回调函数），让ajax自己获取接口数据后，自己调用回调函数处理
1. 正经的封装
    1. 注意get、post方式请求时，传参上的区别；
    1. 代码：  
        ``` js
        // 封装ajax请求方法-3：封装get、post参数，传入回调函数
        function myAjax(method,url,params,fn){
            var xhr = new XMLHttpRequest();
            // get方式请求的参数直接设置到url中
            if(method.toUpperCase() == 'GET' && null != params){
                url += params;
            }
            xhr.open(method,url);
            // post方式请求的参数设置到send方法中
            if(method.toUpperCase() == 'POST' && null != params){
                // 设置Content-Type为表单方式，否则后端将无法接收到参数
                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")
                // 如果是obj，则遍历每条属性并拼接
                if(params instanceof Object){
                    var arr = [];
                    for (var key in params) {
                        var ele = params[key];
                        arr.push(key+"="+ele);
                    }
                    var postData = arr.join("&");
                }
            }   
            // 只有post请求，才会在send方法中传参
            xhr.send(postData);
            xhr.onload = function(){
                var respData = xhr.response;
                fn(respData);
            }
        }

        // 调用封装的函数
        myAjax("post","http://localhost:8089/frontEnd/queryById",{"id":100},function(data){
            console.log(data)
        })
        myAjax("get","http://localhost:8089/frontEnd/queryData",null,function(data){
            console.log(data)
        })
        ```
    1. 效果：  
        ![image text](images/ajax封装02.png) 

## 3. jQuery中Ajax方法的使用
1. 使用jQuery底层的ajax方法
    1. 代码：  
        ``` js
        $.ajax({
            url:'http://localhost:8089/frontEnd/queryData',
            type:'get',
            // dataType:"application/json",
            success:function(res){
                console.log("succ",res);
            },
            error:function(res){
                console.log("fail",res);
            },
            complete:function(){
                console.log("done");
            }
        });
        ```
    1. 效果：  
        ![image text](images/jQuery的ajax使用01.png);
1. 使用jQuery快捷的ajax方法
    1. 代码：  
        ``` js
        $.get("http://localhost:8089/frontEnd/queryData",function(res){
            console.log("get-succ",res);
        })
        $.post("http://localhost:8089/frontEnd/queryData",function(res){
            console.log("post-succ",res);
        })
        $.getJSON("http://localhost:8089/frontEnd/queryData",function(res){
            console.log("getJson-succ",res);
        })
        ```
    1. 效果：  
        ![image text](images/jQuery的ajax使用02.png);
1. jQuery中load方法使用
    1. load方法的作用：load()方法通过 AJAX 请求从服务器加载数据，并把返回的数据放置到指定的元素中。
    1. 用法：```父元素.load(url,data,function(response,status,xhr))```
    1. 注意data参数，如果该字符串中包含一个或多个空格，紧接第一个空格的字符串则是决定所加载内容的 jQuery 选择器。这样就可以有选择地将请求到的html内容添加到父元素中
    1. 案例：无刷新的页面切换
        1. 代码：  
            ``` js
            $(function ($) {
                // 这里用到了NProgress.js的进度条
                // 注册全局ajax请求前动作
                $(document).ajaxStart(function(){
                    NProgress.start();
                })
                // 注册全局ajax请求完成后动作
                .ajaxStop(function(){
                    NProgress.done();
                })

                $("a").click(function(){
                    var url = $(this).attr("href");
                    // 将请求到页面中#main的子元素给到当前页面的#main中
                    $("#main").load(url+" #main>*")
                    return false;
                })
            })
            ```
        1. 效果： 
            ![image text](images/页面切换02.gif)

## 4. 跨域问题以及JsonP
1. 什么是跨域？
    1. 本质上讲，就是浏览器默认不允许ajax请求不同源的接口，至于什么是同源，什么是不同源，看下图  
        ![image text](images/跨域01.png)
1. 使用script标签发送跨域请求
    1. 为什么是script标签：script标签中的src属性可以从任何地址获取到js文件，并且由于js是脚本语言，获取到之后就能立即执行
    1. 思路（最终版）：
        1. 在前端的定义好回调函数
        1. 代码创建script标签，设置其src路径为后端接口地址+"?"+"参数拼接"+"&回调函数名";
        1. 【异步】后端返回一个函数调用的js代码块，前端自动执行（效果上看，很像ajax）；
        1. 【异步】前端将创建的script标签append到document.body中
    1. 前端代码： 
        ``` html
        <script>
            function myFunc(data){
                console.log(data);
            }
        </script>
        <script>
            var scriptObj = document.createElement("script");
            var funcName = "myFunc";
            scriptObj.src="http://localhost:8089/frontEnd/getJs?funcName="+funcName;
            document.body.appendChild(scriptObj);
            // delete funcName;
            // document.body.removeChild();
        </script>
        ```
    1. 后端代码： 
        ``` java
        @RequestMapping("getJs")
        public String getJavaScript(String funcName){
            return funcName+"(1111)";
        }
        ```
    1. 效果：
        ![image text](image/script发送跨域01.png)
1. JsonP的封装
    1. 前端代码： 
        ``` js
        function myJosnP(url,params,fn){
            // 随机生成一个函数名
            var tempFuncName = "jsonp_"+111111;
            var scriptObj = document.createElement("script");
            scriptObj.src = url+"?params="+params+"&callback="+tempFuncName;
            document.body.appendChild(scriptObj);
            window[tempFuncName] = function(data){
                fn(data);
                // 删除临时方法
                delete window[tempFuncName];    
                // 删除从后端请求过来并拼接到前端页面的js代码块
                document.body.removeChild(scriptObj);
            }
        };
        myJosnP("http://localhost:8089/frontEnd/getJs",222,function(haha){
            console.log(haha);
        });
        ```
    1. 后端代码： 
        ``` java
        @RequestMapping("getJs")
        public String getJavaScript(String callback,String params){
            return callback+"('1111--"+params+"')";
        }
        ```
    1. 效果： 
        ![image text](images/封装jsonP.png)
1. jQuery中jsonp的使用
    1. 代码：
        ``` js
        $.ajax({
            url:"http://localhost:8089/frontEnd/getJs",
            dataType: 'jsonp',
            success: function (res) {
                console.log(res)
            },
            error:function(){
                console.log('ERR');
            }
        })
        ```

## 零散知识点
1. reponse与responseText的区别