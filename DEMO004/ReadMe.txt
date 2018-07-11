前端样式规范说明：
1、mui系列为基础样式
2、全局重写覆盖mui（包括插件）同名样式，需成块注释标明；基础样式避免在原mui css中进行修改，插件可根据设计统一修改
3、自定义样式需添加个人前缀（如.ju-xxx，避免无前缀情况下的覆盖冲突)，开发模式下文件拆分为custom-个人标识.css
*eg:custom-july.css
*内容规范另议

插件说明：
1、mui-dtpicker进行样式修改(by julyyu)
2、扩展公共库 dw-wheel.js(by davidwen)

数据绑定渲染：
1、采用artTemplate，具体请参见https://github.com/aui/art-template

图标及图片适配问题：
1、图标采用iconfont方案，具体请参见http://www.iconfont.cn/；其中，单色icon使用fontclass，多色icon使用symbols，分开打包资源，统一放在fonts下

部分5+环境代码混合说明：
1、plus相关均为5+环境下生效
2、5+环境使用的页面需添加对应注释

文件命名规则说明：
1、html文件夹下，小写字母开头为嵌入内容页（即一定有父页面框架），大写字母开头为框架页/单独页，驼峰式命名