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
    ![image text](images/索引选择器01.gif)
1. 案例：面板切换
    1. 思路：首先隐藏所有的子菜单，然后鼠标移入时，隐藏所有菜单（目的是清除之前可能的鼠标移入显示的菜单），然后将鼠标所在面板的菜单显示出来，注意在show()、hide()前加上stop()（目的：清除未完成的动画效果）
    1. 代码：  
        ```html
        <script>
            $(function(){
                $("#u1>li>ul").hide();
                $("#u1>li").mouseenter(function(){
                    //隐藏当前被点击的li的兄弟元素的li中的ul（2种不同写法）
                    $("#u1>li>ul").stop().hide(300);
                    //$(this).siblings("li").find("ul").hide(500);
                    $(this).children("ul").stop().show(300);
                });
            })
        </script>
        ```
    1. 效果：  
        ![image text](images/面板切换01.gif)

## 2. 元素的样式操作
1. 三种操作样式的方式
    1. 简单粗暴：  
        ```$("#dv").css("width","300px");```  
    1. 链式编程：  
        ```$("#dv").css("width","300px").css("height","200px").css("border","2px solid red");```  
    1. 键值对写法：  
        ```var json={"width":"200px","height":"100px","backgroundColor":"pink","border":"2px solid green"};```  
        ```$("#dv").css(json);```   

## 3. 链式编程
1. 定义: 对象不停的调用方法。对象调用方法,如果返回值还是当前这个对象，那么就可以继续的调用方法
1. 形式：对象.方法().方法.方法().方法();
1. 唠叨两句：在jQuery中,一般情况,对象调用的方法,这个方法的意思是设置的意思,那么返回来的几乎都是当前的对象,就可以继续的链式编程了
1. 代码：  
    ``` js 
    $(function(){
        $("input").click(function(){
            // 取值
            console.log($(this).val());
            // 设置值
            console.log($(this).val("哈哈哈"));
            // 链式编程
            console.log($(this).val("哈哈哈哈").html("<p>112233</p>"));
        })
    })
    ```
1. 效果：  
    ![image text](images/链式编程01.png)

## 4. 筛选器
1. 常用筛选器：  
    ![image text](images/筛选器01.png)  
1. 代码：  
    ``` html  
    <script>
      $(function () {
        $("#three").click(function () {
          //获取某个li的下一个兄弟元素
          //$(this).next("li").css("backgroundColor","yellowgreen");
          //获取某个li的前一个兄弟元素
          //$(this).prev("li").css("backgroundColor","greenyellow");
          //获取某个li的后面的所有的兄弟元素
          //$(this).nextAll("li").css("backgroundColor","red");
          //获取某个li的前面的所有的兄弟元素
          //$(this).prevAll("li").css("backgroundColor","red");
          //获取当前的li的所有的兄弟元素
          //$(this).siblings("li").css("backgroundColor","gray");
        });
      });
    </script>
    ```
1. 案例01：操作当前元素的其他元素样式
    1. 思路：  
        鼠标移入时，给当前li设置背景颜色；  
        鼠标移出时，将所有li的背景颜色清空；    
        鼠标点击时，分别给当前li前、后的所有元素设置背景颜色  
    1. 代码：  
        ``` js
        $(function(){
            $("li").mouseenter(function(){
                $(this).css("background-color","#999");
            }).mouseleave(function(){
                $(this).parent().children("li").css("background-color","");
            }).click(function(){
                // 方式一：逐一设置样式
                // $(this).prevAll().css("background-color","#555");
                // $(this).nextAll().css("background-color","#ddd");
                // 方式二：链式设置样式(使用end()方法处理断链的问题)
                console.log("this对象：",$(this)); // 当前点击的li
                console.log("css()方法返回的对象：",$(this).prevAll().css("background-color","#555")); // 当前li前面的若干个li
                $(this).prevAll().css("background-color","#555").end().nextAll().css("background-color","#ddd");
            });
        })
        ```
    1. 效果： 
        ![image text](images/筛选器案例01.gif)
1. 案例02：产品tab切换
    1. 思路： 
    1. 代码：  
        ``` js
        $(function(){
            $(".tab>li").mouseenter(function(){
                $(this).siblings().removeClass("active");
                $(this).addClass("active");
                var index = $(this).index();
                $(".products>div:eq("+index+")").addClass("selected").siblings().removeClass("selected");
            });
        })
        ```
    1. 效果：  
        ![image text](images/筛选器案例02.gif)

## 5. 动画操作
1. 基础演示  
    1. 代码：  
        ``` js
        /* 回调函数在show、hide、slideUp、slideDown、slideToggle、fadeIn、fadeOut、fadeToggle中都有*/
        $("#show").click(function(){
            $("div").show(1000,function(){
                console.log("显示");
            });
        });
        $("#hide").click(function(){
            $("div").hide(1000,function(){
                console.log("隐藏");
            });
        });
        // slideUp、slideDown、slideToggle
        $("#slideShow").click(function(){
            $("div").slideDown(1000);
        });
        $("#slideHide").click(function(){
            $("div").slideUp(1000);
        });
        $("#slideChange").click(function(){
            $("div").slideToggle(1000);
        });
        /*  fadeIn、fadeOut、fadeToggle*/
        $("#fadeShow").click(function(){
            $("div").fadeIn(1000);
        });
        $("#fadeHide").click(function(){
            $("div").fadeOut(1000);
        });
        $("#fadeChange").click(function(){
            $("div").fadeToggle(1000);
        });
        ```
    1. 效果：  
        ![image text](images/动画01.gif)  
1. animate函数
    1. 3个参数：    
        1. 键值对：存放css样式
        1. 时间：单位ms
        1. 回调函数
    1. 代码：  
        ``` js
        $("div").animate({"width":"200px","height":"200"},2000)
        .animate({"width":"100px","height":"100px","margin-left":"100px","margin-top":"100px"},2000,function(){
            console.log("完事");
        })
        ```
    1. 效果：  
        ![image text](images/动画03.gif)  
1. 案例：图片递归显示与隐藏
    1. 思路：
        1. 隐藏：从最后一个元素开始隐藏，每次隐藏完成之后，再利用回调函数，隐藏当前元素的前一个元素  
        1. 显示：从第一个元素开始显示，每次显示完成之后，再利用回调函数，显示当前元素的后一个元素  
    1. 代码：  
        ``` js
        $("#btn1").click(function(){
            $("div>img:last").hide(200,function(){
                // arguments.callee 表示匿名函数本身，但了解即可，不推荐使用
                $(this).prev().hide(200,arguments.callee);
            })
        });
        $("#btn2").click(function(){
            $("div>img:first").show(200,function f1(){
                $(this).next().show(200,f1);
            })
        });
        ```  
    1. 效果：  
        ![image text](images/动画02.gif)  

## 6. 元素的创建
1. append()、appendTo()
    1. append()：用法```父元素.append(新元素)```，有点类似于父类元素主动添加了新元素（新元素被添加到了父元素中）
    1. appendTo()：用法```新元素.appendTo(父元素)```，有点类似于新元素主动添加到了父元素上
    1. 代码： 
        ``` js
        $("input:first").click(function(){
            $("div").append($("<a href='https://baidu.com'>百度1</a>"));
        });
        $("input:last").click(function(){
            ($("<a href='https://baidu.com'>百度2</a>")).appendTo($("div"));
        });
        ```
    1. 效果：  
        ![image text](images/添加元素01.gif)
1. 注意的问题：
    1. append、appendTo相当于是剪切元素，如果希望复制元素，则需要在append、appendTo前面链式调用一下clone方法
    1. 代码：  
        ``` js
        <script>
            $(function(){
                $("input:first").click(function(){
                    $("#dv1>p").appendTo($("#dv2"));
                })
                $("input:last").click(function(){
                    $("#dv3>p").clone().appendTo($("#dv4"));
                })
                
            })
        </script>
        <body>
            <input type="button" value="点击剪切">
            <input type="button" value="点击复制">
            <div class="container">
                <div id="dv1"><p>11</p></div>
                <div id="dv2"></div>
                <div id="dv3"><p>22</p></div>
                <div id="dv4"></div>
            </div>
        </body>
        ```  
    1. 效果：  
        ![image text](images/添加元素02.gif)  



## 零散知识点
1. 类样式：
    1. 唠叨：
        1. 添加类样式：addClass("clazz");
        1. 移除类样式：removeClass("clazz");
        1. 判断是否有类样式：hasClass("clazz");
        1. 切换类样式（没有就加上，有就去掉）：toggleClass("clazz");
    1. 代码：  
        ``` js
        <script>
            $(function(){
                $("#btn01").click(function(){
                    if($("body").hasClass("cls")){
                        $("body").removeClass("cls");
                    }else{
                        $("body").addClass("cls");
                    }
                });

                $("#btn02").click(function(){
                    $("body").toggleClass("cls");
                });
            })
        </script>
        <body>
            <input id="btn01" type="button" value="点击01">
            <input id="btn02" type="button" value="点击02">
        </body>
        ```  
    1. 效果：  
        ![image text](images/类样式01.gif)
1. 几个容易混淆的对象：  
    1. __内置对象__:js中系统自带的,Array,Object,Date,Math,RegExp
    1. __浏览器对象__: window
    1. __自定义对象__: 自己定义的构造函数创建的对象
    1. __DOM对象__: 通过DOM方式获取的对象
    1. __jQuery对象__: 通过jQuery方式获取的对象

## 今日总结：
1. 选择器:
    1. id选择器  $("#id属性的值")
    1. 标签选择器 $("标签名字")
    1. 类选择器   $(".类样式的名字")
    1. 交集选择器  $("标签.类样式的名字")---->标签+类选择器
    1. 并集选择器  $("选择器,选择器,选择器,...")---->多条件选择器
    1. 都可以看成是筛选器
    1. 索引选择器  $("选择器:eq(索引的值)")
    1. 奇数筛选器  $("选择器:odd")
    1. 偶数筛选器  $("选择器:even")
    1. 筛选器   
        $("选择器:lt(索引)")--->获取小于这个索引的元素
        $("选择器:gt(索引)")--->获取大于这个索引的元素
1. 其他选择器
    1. $("选择器:last")---->最后一个
    1. $("选择器:first")---->第一个
    1. 获取当前元素的其他的方法
    1. 当前元素.next()---->下一个兄弟元素
    1. 当前元素.nextAll()--->后面所有的兄弟元素
    1. 当前元素.prev()---->前一个兄弟元素
    1. 当前元素.prevAll()-->前面所有的兄弟元素
    1. 当前元素.siblings()-->所有的兄弟元素(没有自己)
    1. 当前元素.parent()--->父级元素
    1. 当前元素.children()--->当前元素中所有的子元素(直接的子元素)
    1. 当前元素.find("选择器")--->从当前元素中找某个或者是某些元素
1. 方法:
    1. .val()---->操作表单元素的value属性,可以获取也可以设置
    1. .text()---->操作元素中间的文本内容的,相当于innerText
    1. .html()---->操作元素中的html代码及内容,相当于innerHTML
    1. .css()----->操作元素的样式
    1. .addClass()--->添加类样式
    1. .removeClass()-->移除类样式
    1. .hasClass()---判断元素是否应用了类样式
    1. .index()---->元素的索引
1. 下面的这些动画的方法,一般都可以使用两个参数,参数1:时间,参数2:回调函数
    1. 参数---时间:1000毫秒---1秒
    1. 参数---时间:slow---慢,normal---正常,fast---快
    1. .show()--->显示
    1. .hide()--->隐藏
    1. .stop()---->停止动画
    1. animate()--->动画的方法
    1. slideUp()---->滑入
    1. slideDown()--->滑出
    1. slideToggle()--->切换滑入和滑出
    1. fadeIn()---->淡入
    1. fadeOut()--->淡出
    1. fadeToggle()--->切换淡入淡出
    1. fadeTo(时间,透明度的值)
1. 元素创建:
    1. $("html的代码")
1. 元素的添加
    1. 父级元素.append(子级元素);
    1. 子级元素.appendTo(父级元素);
1. clone()克隆元素
    1. 父级元素2.append($("父级元素1>子级元素"));,相当于剪切过去的


