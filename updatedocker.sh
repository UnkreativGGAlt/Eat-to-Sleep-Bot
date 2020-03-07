docker build -t dustin/com-bot .
docker rm --force Com-Bot
docker run -d --restart always --name Com-Bot -p 6677:6677 dustin/com-bot
