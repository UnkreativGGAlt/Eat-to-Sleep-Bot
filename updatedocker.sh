git fetch
git pull
docker build -t dustin/com-bot .
docker rm --force Com-Bot
docker run -d --restart always --cap-add=SYS_ADMIN --name Com-Bot -p 6677:6677 dustin/com-bot
