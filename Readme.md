## 简介
本平台是相应国家政策，利用区块链去中心化和不可篡改特性及相关密码学技术保护用户隐私的数字化社区治理平台

## 依赖
+ python3.7+
+ FISCO BCOS 2.x
+ @vue/cli 5.0.6 & yarn version v1.22.18

## 使用方法
1.按照[FISCO](https://fisco-bcos-documentation.readthedocs.io/zh_CN/latest/index.html)的教程搭建一个区块链网络并下载fisco的python-sdk。

2.`cd avecvoting && pip install -r requirements.txt`安装python依赖。

3.`python app.py`启动后端。

4.`cd vue-web &&  yarn install && yarn serve`启动前端。

5.127.0.0.1:8080端口可进入区块链社区治理平台。

## 其他
1.可使用gunicorn封装flask后端。
2.若需要用nginx，请将vue-web中的dist文件夹移动至nginx默认html文件夹(/var/www/html)。
3.如有问题联系dl191@mail.ustc.edu.cn。"# community" 
