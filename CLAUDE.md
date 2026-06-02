# xyz-pi — Pi coding agent fork

Fork of [badlogic/pi-mono](https://github.com/badlogic/pi-mono).

## Version Convention

版本号保持与上游 `pi-mono` 的 coding-agent 包版本对齐，加上 `-xyz-N` 后缀：

```
<upstream-version>-xyz-<fork-patch>
```

| 上游版本 | Fork 版本 | 说明 |
|---------|-----------|------|
| v0.78.0 | v0.78.0-xyz-0.1 | 首次适配 0.78.0 |
| v0.79.0 | v0.79.0-xyz-0.1 | 跟随上游升到 0.79.0，fork patch 重置 |
| v0.79.0 | v0.79.0-xyz-0.2 | 同一上游版本下的 fork 内修复 |

规则：
- **主版本号**（`0.78`）跟着上游 coding-agent 包走
- **fork patch**（`xyz-N`）从 0.1 开始，每发布一次 fork 内修复 +1
- **上游升级后**（如 0.78 → 0.79），fork patch 重置为 0.1
- 版本号在 `packages/coding-agent/package.json` 和 `npm-shrinkwrap.json` 中同步更新

## 发版

```bash
# 1. 更新版本
#    编辑 packages/coding-agent/package.json 和 npm-shrinkwrap.json

# 2. 构建
cd packages/coding-agent && npm run build

# 3. 发布
cd packages/coding-agent && npm publish
```

## Upstream Merge

```bash
# 拉取上游并 merge
git fetch upstream main
git merge upstream/main --no-ff
# 解决冲突后保留 xyz-pi 包名和版本号
```
