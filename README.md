### What
- A minimal example [`jest.config.ts`](./jest.config.ts) 
- Tested works with edge ESM-only packages. Here is `node-fetch` as example.

### Tested Package Manager
[x] pnpm

[x] npm

[x] yarn

[x] yarn@berry

### I want less maintain
- If you accept `--experimental-vm-modules` flag, you can get full ESM jest. 

```sh
$ export NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules"
$ jest
```

```sh
$ env NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" jest
```

- external ESM-only packages -> jest `vm` modules

Pro: No hardcode.

Con: Both Node.js and jest official document still state that as experimental. 

### I want stable
- If you don't accept `--experimental-vm-modules` flag, you can also get jest compact with ESM-only packages. But should enough for many cases.

- external ESM-only packages -> transformer(ts-jest) -> CJS -> jest `vm`

Pro: Stable

Con: You need to know all ESM-only package name under recursive dependency tree.

### Test
```sh
$ git clone <repo> .
...

$ bash ./test.sh
...
ALL PASS! 🎉 
```

### Last
Good luck, bro!

