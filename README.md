# Build
```
docker build -t collabro-frontend .
```

# Run
```
export $col-front-version=$(git rev-parse --short HEAD) 
docker run -p 127.0.0.1:3081:3000 -d collabro-frontend -e NUXT_PUBLIC_VERSION=$col-front-version
```