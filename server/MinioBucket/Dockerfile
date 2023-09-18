FROM minio/minio:latest

RUN mkdir /app

WORKDIR /app

COPY . .

EXPOSE 9000

RUN ["chmod", "+x", "/app/entrypoint.sh"]

ENTRYPOINT ["/app/entrypoint.sh"]
