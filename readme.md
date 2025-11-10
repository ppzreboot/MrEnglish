# MyEnglish

## Build & Deploy

Build Client:
``` bash
./build/client.sh
```

Start DEV Server:
``` bash
cd server
deno run --watch -A main/main.ts
```

Deploy to `Deno Deply(EA)`:
``` bash
cd server
deno deploy
```
