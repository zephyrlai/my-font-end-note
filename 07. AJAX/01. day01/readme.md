## 1. Ajax
1. 发送Ajax请求
    1. 5个步骤（状态）
        1. 创建XMLHttpRequest对象，此时其readyState为0
        1. 使用XMLHttpRequest对象打开链接，发送请求，此时其readyState由0变为1
        1. 响应数据自动触发readystatechange事件，readyState为2时，表示接收到响应头，可用```xhr.getAllResponseHeaders()```获取响应头的全部内容，也可以通过```xhr.getResponseHeader(属性名)```获取响应头中某个属性的内容
        1. readyState为3时，表示正在接收响应体数据（正在接收，未接收完全）
        1. readyState为4时，表示接受完响应体数据，可用```xhr.responseText```获取响应体内容
    1. 代码：  
        ``` js
        var xhr = new XMLHttpRequest();
        console.log("新建xhr对象，readyState=",xhr.readyState);
        // 整个source文件夹放在tomcat下，通过tomcat访问
        xhr.open("get","/demo.txt");
        xhr.send();
        console.log("发送请求，readyState=",xhr.readyState);
        xhr.addEventListener("readystatechange",function(){
            switch(this.readyState){
                case 2:
                    console.log("接收到响应头，readyState=",this.readyState);
                    console.log("响应头:",this.getAllResponseHeaders());
                    console.log("文本类型:",this.getResponseHeader("content-type"));
                    break;
                case 3:
                    console.log("正在接收响应体，readyState=",this.readyState);
                    break;
                case 4:
                    console.log("接收到响应体，readyState=",this.readyState);
                    console.log("响应体是",this.responseText);
            }
        })  
        ```
    1. 效果：  
        ![image text](image/发送ajax请求01.png)
1. ajax遵循http规范
    1. 使用ajax发送表单请求时，需要设置请求头为表单形式，否则后端将无法正常接收数据
    1. 代码：
        ``` js
        var xhr = new XMLHttpRequest();
        xhr.open("post","http://127.0.0.1:8088/getData");
        // 设置请求体的content-type为表单类型
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

        xhr.send("name=haha&age=12");
        ```
    1. 效果：
        1. 未设置请求头的content-type时，默认是常规的text/plain
        ![image text](image/发送ajax请求01.png)
        ![image text](image/发送ajax请求01-1.png)

        1. 设置content-type为表单类型时，后端接收数据成功
        ![image text](image/发送ajax请求02.png)
        ![image text](image/发送ajax请求02-1.png)




## 零散知识点
1. addEventListener("eventName",function(){...})