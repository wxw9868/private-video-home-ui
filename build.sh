npm run build

docker build -t my-video-ui:v1.0.0 .

docker run -d -p 80:80 --name my-video-ui my-video-ui:v1.0.0