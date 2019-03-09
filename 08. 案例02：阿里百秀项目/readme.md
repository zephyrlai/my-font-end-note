## 1. 用到的thymeleaf知识点
1. 替换标签中的文本内容：
    1. 代码：
        ``` html
        <h3 class="name" th:text="${userInfo.nickname}">用户名</h3>
        ```
    1. 效果：
        ![image text](images/thymeleaf01.png)
1. 替换各种标签中的属性
    1. 代码： 
        ``` html
        <img class="avatar" th:attr="src=${userInfo.avatar}">
        ```
    1. 效果： 
        ![image text](images/thymeleaf02.png)
1. 循环：
    1. 代码：
        ``` html
        <tbody>
              <tr th:each="item : ${data}">
                <td class="text-center"><input type="checkbox"></td>
                <td th:text="${item.name}">未分类</td>
                <td th:text="${item.slug}">uncategorized</td>
                <td class="text-center">
                  <a href="javascript:;" class="btn btn-info btn-xs">编辑</a>
                  <a href="javascript:;" class="btn btn-danger btn-xs">删除</a>
                </td>
              </tr>
            </tbody>
        ```
    1. 效果：
        ![image text](images/thymeleaf03.png)


## 2. 用到jQuery知识点：
1. load方法