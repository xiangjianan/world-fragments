# 世界碎片 · 每日碰撞

[English](README.md) | **简体中文**

收集现实，从现实中发现尚未意识到的连接。

[阅读每日灵感](https://xiangjianan.github.io/world-fragments/)

每天北京时间 21:00，由本机 Codex 读取 Apple 提醒事项「世界碎片」的全部未完成记录，不按日期筛选。理解现象、问题、机制、情绪、技术、商业与行为，从相似、矛盾、跨领域迁移、反常识、重复问题中提炼三个探索方向。消息在原聊天交付，提炼后的公开内容在这里归档。没有未完成事项时，当天静默跳过，不生成内容、不更新网页、不推送消息。

## 文件

- `entries/YYYY-MM-DD.json`：每日公开灵感；不保存原始提醒事项、标识符或私人快照。
- `docs/`：GitHub Pages。日期选择、前后期、键盘左右键、移动端和深色模式。
- `scripts/read-unfinished.swift`：只读 EventKit CLI。直接使用未完成事项 predicate，无日期边界，无保存/删除 API。
- `scripts/build.py`：校验每日内容并生成网页数据。
- `DAILY.md`：每日运行规范。

## 本机运行

```sh
mkdir -p bin
swiftc scripts/read-unfinished.swift -o bin/read-unfinished
./bin/read-unfinished
python3 scripts/build.py
```

提醒事项授权属于实际运行环境。本机已验证从 Codex 读取成功；更换环境需重新验证。电脑和 Codex 必须能在运行时执行本地任务。21:00 是开始时间，分析及发布完成后发送消息。GitHub Pages 公开可访问，仅发布整理后的方向与泛化的连接描述，不上传原始列表。
