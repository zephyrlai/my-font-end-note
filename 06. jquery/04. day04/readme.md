## 1. 元素的事件绑定
1. 使用delegate方法为父元素的子元素绑定事件
    1. 为什么会有这种操作？  
        有些时候，我们需要为父元素中新生成的元素绑定事件，而常规的绑定形式只能用于已存在的元素，如果是在事件绑定之后生成的元素，则需要通过delegate方法绑定事件。
    1. 怎么理解delegate？  
        用法如下：```父元素.delegate("子元素","动作名(例如click、mouseenter等)",function(){...});```,从用法上可以看出，delegate表示动态地（代理地）为父类元素中所有的（包括现有的、以及在delegate方法执行后新生成的子元素）绑定事件
    1. 代码：  
        ``` js  
        $("#btn1").click(function(){
            $("<p>这是文本文本。。。。。</p>").appendTo($("div"));
            // 通过delegate方法，为父元素中的子元素绑定方法
            $("div").delegate("p","click",function(){
                console.log("我是第"+$(this).index()+"个p")
            });
        });
        $("#btn2").click(function(){
            $("<p>这是文本文本。。。。。</p>").appendTo($("div"));
        });
        ```
    1. 效果：  
        ![image text](images/代理绑定事件01.gif)  
    1. 唠叨两句： 
        1. 通过查看源码发现，```delegate```内部是通过```this.on```实现的，所以我们也可以通过直接调用```this.on```的方式实现动态地（代理地）为父类元素的子元素绑定事件;
        1. 更多的时候推荐使用```on```方法而不是``delegate````
        1. 代码：  
            ``` js
            $("div").on("click","p",function(){
                console.log("我是第"+$(this).index()+"个p")
            });
            ```
        1. on方法的形参说明： 
            ![image text](images/on方法01.png)
1. 案例： 动态为表格添加行与删除行
    1. 代码：  
        ``` js
        // 方法
        function closeFrame(){
            $("#j_mask").hide();
            $("#j_formAdd").hide();
        };
        function openFrame(){
            $("#j_mask").show();
            $("#j_formAdd").show();
        };

        // 事件
        $("#j_btnAddData").click(function(){
            openFrame();
            $("#j_txtLesson").val("");
            $("#j_txtBelSch").val("传智播客-前端与移动开发学院");
        });
        $("#j_hideFormAdd").click(function(){
            closeFrame();
        });
        $("table").on("click","a",function(){
        $(this).parent().parent().remove();
        });
        $("#j_btnAdd").click(function(){
        var nameObj = $("#j_txtLesson");
        var academyObj = $("#j_txtBelSch");
        $("<tr>"+"<td>"+nameObj.val()+"</td>"+"<td>"+academyObj.val()+"</td>"+"<td><a href='javascrip:;'class='get'>GET</a></td>"+"</tr>").appendTo($("tbody"));
        closeFrame();
        })
        ```  
    1. 效果：  
        ![image text](images/案例01.gif)

## 1. 元素的事件解绑
1. 用什么方式绑定的事件，最好就用对应的什么方法解绑事件
1. bind方式的解绑
    1. ```对象.unbind("事件名01 事件名02 ...")```
    1. 代码：  
        ``` html
        <script>
            $(function(){
                $("input:first").click(function(){
                    $("div").bind("mouseenter",function(){
                        console.log("div鼠标移入01");
                    }).bind("mouseleave",function(){
                        console.log("div鼠标移出02");
                    });
                });
                $("input:last").click(function(){
                    // $("div").unbind("mouseenter");
                    $("div").unbind("mouseenter mouseleave");
                });
            });
        </script>
        <body>
            <input type="button" value="绑定">
            <input type="button" value="解绑">
            <div></div>
        </body>
        ```
    1. 效果：  
        ![image text](images/bind解绑01.gif)
1. delegate方式的解绑
    1. delegate用于解绑动态地为父级元素的子元素解绑事件;
    1. 用法：```父类元素.undelegate("子类元素","事件01 事件02 ...");```
    1. ```父类元素.undelegate()```表示解绑所有事件
    1. 代码：  
        ``` html
         <script>
            $(function(){
                // 创建子元素并绑定事件
                $("input:first").click(function(){
                    $("<p>这是文本<?p>").appendTo($("div"));
                    $("div").delegate("p","mouseenter",function(){
                        console.log("鼠标移入");
                    }).delegate("p","mouseleave",function(){
                        console.log("鼠标移出");
                    });
                });
                // 解绑事件
                $("input:last").click(function(){
                    $("div").undelegate("p","mouseenter mouseleave");
                })
            })
        </script>
        <body>
            <input type="button" value="绑定">
            <input type="button" value="解绑">
            <div></div>
        </body>
        ```
    1. 效果： 
        ![image text](images/undeletegate解绑01.gif)
1. 
    * 按键改变元素的背景颜色
    * 事件的参数
    * 事件的触发

    * 链式编程的原理

    * each方法的使用

    * 包装集

    * 多库共存
    * 插件的使用
    * 自己做插件
    * UI的使用