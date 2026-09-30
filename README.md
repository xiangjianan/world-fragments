# World Fragments

**English** | [简体中文](README.zh-CN.md)

Collect reality. Discover connections you haven't noticed yet.

[Live preview](https://xiangjianan.github.io/world-fragments/) · [About the project](https://xiangjianan.github.io/world-fragments/about.html)

World Fragments turns everyday observations into three directions worth exploring. At **21:00 Asia/Shanghai**, a local Codex task reads every **unfinished** item in the Apple Reminders list named `世界碎片`, without a date filter or any changes to your reminders.

It interprets observations, questions, mechanisms, emotions, technology, business, and behavior; then looks for similarities, contradictions, cross-domain transfers, counterintuitive patterns, and recurring problems. The result is not a retelling of your notes: each direction explains a new connection, a possible opportunity, what remains uncertain, and a small experiment.

Results arrive in the original chat and are archived on GitHub Pages. **When there are no unfinished reminders, the task silently skips the day: no generated edition, website update, or message.**

## Reading experience

Choose a date, browse previous and next editions, or use the left and right arrow keys. The journal adapts to mobile screens and your system's light or dark appearance. Only scheduled editions appear in the archive.

## Repository layout

- `entries/YYYY-MM-DD.json`: published daily insights, without raw reminders or private identifiers.
- `docs/`: the GitHub Pages website and generated archive data.
- `scripts/read-unfinished.swift`: read-only EventKit CLI that queries unfinished reminders directly, with no date bounds.
- `scripts/build.py`: validates editions and builds the website data.
- `DAILY.md`: operating instructions for the daily task.

## Run locally on macOS

```sh
mkdir -p bin
swiftc scripts/read-unfinished.swift -o bin/read-unfinished
./bin/read-unfinished
python3 scripts/build.py
```

Reminders access must be granted in the actual execution environment. The Mac and Codex must be available when the local task runs. 21:00 is the start time; delivery follows analysis and publication.

The Pages site is public. Only distilled insights and generalized connections are published. Raw reminder snapshots stay local. Daily insights are currently written in Chinese; this README is available in English and Chinese.

## Install on your phone

Open the [journal](https://xiangjianan.github.io/world-fragments/) in Safari on iPhone, then choose **Share → Add to Home Screen**. On supported Android browsers, use **Install app** or the browser menu. The app opens in a standalone window and can read previously cached editions offline. New editions still require a connection. Chat notifications remain in Codex; this PWA does not add web push.
