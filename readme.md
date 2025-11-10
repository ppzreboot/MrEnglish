# MyEnglish

+ [单词变形](https://chatgpt.com/s/t_690085469b0881919f3c396b2d724eaf)
+ 词根词缀
+ 让 llm 给出词汇联想
+ 纠正过去式、过去分词、复数

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
