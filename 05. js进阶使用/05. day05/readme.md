## 1. 深拷贝、浅拷贝、遍历DOM树

## 2. 正则表达式

## 3. 数组与伪数组

## PS：零散知识点：
1. 文本内容超出内容以省略号显示的2种情况
    1. 单行文本
        ``` html
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        ```
    1. 多行文本
        ``` css
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
        ```
    1. 完整代码：  
        ``` html
        <style>
            .one-line{
                background-color: #EEE;
                width: 100px;
                height: 30px;

                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .more-line{
                background-color: #EEE;
                width: 100px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
            /* 悬浮全部显示 */
            div:hover{
                overflow:visible;
                width:350px;
                display:block;
            }
        </style>
        ```
    1. 结果：  
        ![image text](images/ps01.gif)