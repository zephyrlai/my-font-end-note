## 1. 索引选择器
1. 三种索引选择器
    1. ``` eq(num); ``` 表示索引值等于num的所有元素
    1. ``` lt(num); ``` 表示索引值小于num的所有元素
    1. ``` gt(num); ``` 表示索引值大于num的所有元素
1. 索引选择器可以一起使用，例如```:lt(num1):gt(num2)```表示索引值大于num2且小于num1的所有元素
1. 代码：  
    ```html
    <script>
        $(function(){
            $("input").click(function(){
                // $("ul>li:eq(1)").css("background-color","#ccc");
                $("ul>li:lt(3)").css("background-color","#ccc");
                $("ul>li:gt(6)").css("background-color","#666");
                $("ul>li:lt(7):gt(2)").css("background-color","#999");
            });
        })
    </script>
    <body>
        <input type="button" value="显示效果" id="btn"/>
        <ul>
            <li>0任贤齐</li>
            <li>1张震岳</li>
            <li>2罗大佑</li>
            <li>3刘德华</li>
            <li>4郭富城</li>
            <li>5张学友</li>
            <li>6黎明</li>
            <li>7周星驰</li>
            <li>8吴孟达</li>
            <li>9周润发</li>
        </ul>
    </body>
    ```
1. 效果：  
    ![image text]("images/索引选择器01.gif")
## 2.筛选器(选择器中的一种)

筛选器的案例

元素的样式操作

链式编程

动画操作

相关的案例

元素的创建