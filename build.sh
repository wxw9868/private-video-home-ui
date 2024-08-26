npm run build

docker build -t my-video-ui:v1.0.1 .

# Docker容器在后台运行
docker run --rm -t -i -d -p 80:80 --name my-video-ui my-video-ui:v1

docker run -d -p 80:80 --name my-video-ui my-video-ui:v1

docker run -d -p 80:80 --name my-video-ui-v1.0.1 my-video-ui:v1.0.1