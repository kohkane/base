# base
Holds the various Serverless function required by the main app

## Getting Started
1. Create a .env from the sample.env file
2. Run the command below to allow the dynamodb client to connect to the docker container. [More Info](https://stackoverflow.com/questions/33801460/dynamo-db-local-connection-refused)

```
sudo ifconfig lo0 alias 172.16.123.1
```

3. Run `docker-compose up --build`
4. Profit
