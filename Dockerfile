
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY dist/ /usr/share/nginx/vue/
 
# 暴露80端口
EXPOSE 80
 
# 启动Nginx，并且Nginx将持续运行
CMD ["nginx", "-g", "daemon off;"]