docker build -t my-video-ui:v1 .

# Docker容器在后台运行
docker run -d -p 80:80 --name my-video-ui my-video-ui:v1