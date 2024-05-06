### Build
```bash
docker build --file docker/Dockerfile --tag test_task .
```

### Run
```bash
docker run \
--publish 3000:3000 \
--env MONGO_DB="MONGO_DB" \
test_task
```
