# Build
```
docker build -t collabro-frontend .
```

# Run
```
export NUXT_PUBLIC_VERSION=$(git rev-parse --short HEAD) 
docker run -p 127.0.0.1:3081:3000 -d -e NUXT_PUBLIC_VERSION collabro-frontend
```