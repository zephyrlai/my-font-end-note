## 1. 3个meta标签
1. meta:charset  
    设置全局字符集  
    ```<meta charset="UTF-8">```
1. meta:viewport的作用： 
    让一个pc端的网页可以在移动端的浏览器正常访问，通常的写法是  
    ```<meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=no">```  
    表示自动调整为设备宽度，缩放比例为1:1，不允许用户自行缩放。  
    有如下属性:  
        width:视口的宽度  
        initial-scale：初始化缩放  
        user-scalable:是否允许用户自行缩放（值：yes/no; 1/0）  
        minimum-scale:最小缩放，一般设置了用户不允许缩放，就没必要设置最小和最大缩放  
        maximum-scale:最大缩放  
1. meta:edge    
    设置浏览器的兼容版本模式（让ie使用最新的渲染引擎工作）  
    ```<meta http-equiv="X-UA-Compatible" content="ie=edge">```

## 2. 汉堡菜单的使用
1. 将如下代码拷入.nav-header内
    ``` html
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".my-navbar" aria-expanded="false">
        <span class="sr-only">切换菜单</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
    </button>
    ```
1. data-toggle指以什么事件触发，常用的如collapse,modal,popover,tooltips等；
1. data-target指事件的目标，一起使用就是代表data-target所指的元素以data-toggle指定的形式显示。
1. 注意在菜单ul外层的div上加个class：.my-navbar
1. 效果：  
    ![image text](images/bargerMenu01.gif)

## 3. 轮播图的基本使用
1. 找到轮播图组件代码并[复制](https://v3.bootcss.com/javascript/#carousel)
    ``` html
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
    <!--指示器（图上的圆点） -->
    <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
    </ol>

    <!-- 轮播图 -->
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img src="..." alt="...">
            <!-- 图片标题（将显示在图片中下侧） -->
            <div class="carousel-caption">
                ...
            </div>
        </div>
        <div class="item">
            <img src="..." alt="...">
            <div class="carousel-caption">
                ...
            </div>
        </div>
        ...
    </div>

    <!-- 左右的箭头 -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
    </div>
    ```
1. 2种形式实现大图的居中
    1. 作为背景图片居中对齐
        ``` css
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        ```
    1. 一张图讲清楚background-size：  
        ![image text](images/bgSize01.png)
    1. 使用定位:```left:50%; margin-left:-XXpx;```

## 4. 自适应的轮播图：根据不同大小的屏幕切换大、小图
1. 这里用到了一个新的属性：data属性。在标签中任何以“data-”开头的属性，都是用于存放数据的，(例如：data-abc)在jQuery中可以通过$("标签").data("abc")的方式获取到其中的值
1. 大小图切换的逻辑：利用js监听屏幕大小变化（resize），如果宽度小于规定宽度就用切换为小图，否则切换为大图
1. js初始化时，使用$(..).trigger("resize")来手动触发resize事件
1. 代码： 
    ``` js
    function imgResize(){
        var windowWidth = $(window).width();
        var minWidth=680;
        $("#main_ad .carousel-inner > .item").each(function(index,item){
            var $item = $(item);
            var imageUrl = $item.data(minWidth>windowWidth?"image-sm":"image-lg")
            $item.css("backgroundImage","url('"+imageUrl+"')");
        })
    }
    $(window).on("resize",imgResize);
    $(window).trigger("resize");
    ```
1. 效果： 
    ![image text](images/autoPic01.gif)

## 5. 切换到小图后，轮播图等比例缩放
1. 大图时不变，小图时新增img标签，利用img实现等比例缩放
1. 代码：
    ``` js
    function imgResize(){
        var windowWidth = $(window).width();
        var minWidth=680;
        $("#main_ad .carousel-inner > .item").each(function(index,item){
            var $item = $(item);
            if(minWidth>windowWidth){
                $item.css("backgroundImage","none");
                $item.html("<img src='"+$item.data("image-sm")+"' alt=''/>");
                
            }else{
                $item.html("");
                $item.css("backgroundImage","url('"+$item.data("image-lg")+"')");
            }
        })
    }
    ```
    ``` css
    @media (min-width:680px){
        #main_ad .item{
        height: 410px;
        }
    }
    #main_ad .item img{
        width: 100%;
        height: auto;
    }
    ```
1. 效果：
    ![image text](images/xiaotu01.gif)



## 99. 零散知识点
1. 条件注释：条件满足时，会执行注释中的HTML代码，如果条件不满足，则作为注释忽略  
    ``` html
    <!--[if lt IE 9]>
        <script src="lib/html5shiv/html5shiv.min.js"></script>
        <script src="lib/respond/respond.min.js"></script>
    <![endif]-->
    ```
1. 写css时的注意事项(防止相互协作之间，样式覆盖的问题)
    1. 样式都通过ID去限定
    1. 尽可能多使用直接子代选择器
1. css中相邻选择器（+与~）的使用
    1. +：相邻兄弟选择器，选中后面第一个（注意：不能与下一个兄弟元素之间不能间隔其他类型的元素，否则不能选中）
    1. ~：通用兄弟选择器，选中后续所有
    1. 代码： 
        ``` html
        <style>
            ul.ul01>.haha ~ li{
                color: #F40;
            }
            ul.ul02>.haha + li{
                color: #F40;
            }
        </style>
        <body>
            <ul class="ul01">
                <li></li>
                <li class="haha">通用兄弟选择器，选中后续所有</li>
                <li></li>
                <li></li>
                <span>span</span>
                <li></li>
            </ul>
            <ul class="ul02">
                <li></li>
                <li class="haha">相邻兄弟选择器，选中后面第一个</li>
                <li></li>
                <li></li>
                <li class="haha">不能与下一个兄弟元素之间不能间隔其他类型的元素，否则不能选中</li>
                <span>span</span>
                <li></li>
                <li></li>
            </ul>
        </body>
        ```
    1. ![image text](images/css01.png)
1. css中字体图标的使用（之前都是直接拷的代码，现在稍微讲解一下）
    1. 声明@font-face： 
        1. font-family：声明一下字体图标名（自己定义）
        2. url：引入字体图标的文件（各浏览器兼容状况不同，最好4种文件都引入）
    1. 目标元素声明一下font-family
    1. 添加字体图标
        通常采用如下形式：  
        ``` css
            目标元素::before{
                content: "XXX";
                font-size: XXXpx;
            }
        ```
    1. 代码： 
        ``` html
        <style>
            @font-face{
                font-family: "haha";
                src:    url('../weijinsuo/font/MiFie-Web-Font.eot') format('embedded-opentype'), 
                        url('../weijinsuo/font/MiFie-Web-Font.svg') format('svg'), 
                        url('../weijinsuo/font/MiFie-Web-Font.ttf') format('truetype'), 
                        url('../weijinsuo/font/MiFie-Web-Font.woff') format('woff');
            }
            span::before {
                content: "\e909";
                font-size: 15px;
            }
            .icon-font{
                font-family: "haha";
            }
        </style>
        <body>
            <span class="icon-font"></span>
        </body>
        ```
    1. 效果： 
        ![image text](images/icon-font.png)
1. css的属性选择器
    1. [attr=xx]是css的属性选择器
    1. [attr^=abc]是css的属性选择器,表示对以abc __开头__ 的属性所在元素有效
    1. [attr*=def]是css的属性选择器，表示对 __包含__ def的属性所在的元素有效
1. 自动生成bootstrap按钮样式  
    http://blog.koalite.com/bbg/
1. 文字与图片基线对齐的css属性：```vertical-align:middle;```
1. 背景色透明的css属性：```background-color:transparent;```
1. 自定义bootstrap样式（结合浏览器进行细节调整，以导航栏样式 .nav-default为例）
    1. 在bootstrap.js中找到所有含有“.nav-default”的css代码并拷贝到自己的css文件（例如：my-navbar.css）中
    1. 将my-navbar.css中所有的“nav-default”改为自定义样式的名字（例如：nav-zephyr）
    1. 在浏览器中微调样式，然后在source栏中定位css源码，会写到css文件中
    ![image text](images/customizeBootstrapCss01.gif)
1. TODO:媒体查询