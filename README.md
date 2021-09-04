### What
- A minimal example [`jest.config.ts`](./jest.config.ts) 
- Tested works with edge ESM-only packages. Here is `node-fetch` as example.

### Usage
Adapt below files to your project folder
- `jest.config.ts`
- `config/tsconfig*json`

---

If you accept `--experimental-vm-modules` flag, you can get full ESM jest, or I say hardcore ESM.


<details>
  <summary></summary>
  <p>
 
- external ESM-only packages -> jest `vm` modules

Pro: No hardcode.

Con: Both Node.js and jest official document still state that as experimental. 
  </p>
</details>

```sh
$ export NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules"
$ jest
```

```sh
$ env NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" jest
```

---
If you don't accept `--experimental-vm-modules` flag, you get `ESM->CJS`, or I say faking ESM. Hardcore ESM feature within `test/config/ESMOnlyHard.spec.ts` not work.


<details>
  <summary></summary>
  <p>
 
- external ESM-only packages -> transformer(ts-jest) -> CJS -> jest `vm`

Pro: Stable

Con: 
- You need to know all ESM-only package name under recursive dependency tree.
- Hard core ESM feature will fatal, or silent fail
  </p>
</details>

```
# modify `HARDCODE_ESMONLY` pattern jest.config.ts
$ jest
```



### Tested Package Manager
[x] pnpm

[x] npm

[x] yarn

[x] yarn@berry

### Test
```sh
$ git clone <repo> .
...

$ bash ./test.sh
...
ALL PASS! 🎉 
```

### Known not work EDGE case 

Alarm, although I don't think there is real world use case,  exclude I'm testing config.
Lazy to extract and reproduce, brief.

If you have
- jest config `.projects` length >= 2
- jest config `.projects` include `jsdom`
- using `import(XXX)` instead of `import XXX`

### Last
Good luck, bro!

