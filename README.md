# Test repo to reproduce CONNECT_TIMEOUT issue

### To install dependencies:

rename `.env-example` to `.env` and update DB Url. (I found this error postgres db hosted in vps, not localhost)

```bash
bun install
bun run db:generate
bun run db:push

```

### To run:

```bash
bun run dev
```

### To reproduce:
1. Open 'http://localhost:3500/swagger'
2. Send a few get requests `/user/add-random-user`
3. Wait for 20 - 30 Mins
4. Send another get request `/user/all`.

### Screenshot:
![image](https://github.com/amjed-ali-k/bun-elysia-drizzle-postgres-test/assets/86785660/e1bc3ea4-5ea9-4efe-8531-0bada4cc9558)
