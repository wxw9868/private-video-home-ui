docker build -t my-video-ui:v1 .

# Docker容器在后台运行
docker run --rm -t -i -d -d -p 80:80 --name my-video-ui my-video-ui:v1

docker run -d -d -p 80:80 --name my-video-ui my-video-ui:v1