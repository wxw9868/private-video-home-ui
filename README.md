# Video UI

## 目录
- [启动项目](#启动项目)
- [项目打包](#项目打包)
- [docker部署](#docker部署)
- [参考资料](#参考资料)

## 启动项目
```sh
npm run dev
```

## 项目打包
```sh
npm run build
```

## docker部署
* 制作docker镜像
```sh
docker build -t my-video-ui:v1.0.1 .
```
* 启动docker镜像
```sh
docker run -d -p 80:80 --name my-video-ui-v1.0.1 my-video-ui:v1.0.1
```

## 参考资料
* [手把手教你用 Docker 部署 Vue3 项目](https://blog.csdn.net/weixin_57849570/article/details/132101497)
* [VUE 项目用 Docker+Nginx进行打包部署](https://blog.csdn.net/weixin_44834981/article/details/139775714)