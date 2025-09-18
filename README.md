# JIRAチケットコピーくん

JIRAチケットのタイトルをリンク付きでコピーできるChrome拡張機能です。

# 機能

- JIRAチケットページでタイトルをリンク付きでコピー
- JIRAのリスト表示（すべての作業など）で各チケットをコピー
- コピー形式: `[TICKET-123] タイトル`（リンク付き）
- Slack、Discord、Google Docsなどにペーストすると自動的にリンク付きテキストとして表示

# 対応ブラウザ

- Google Chrome
- Arc
- Edge
- その他Chromium系ブラウザ

# インストール方法

## 1. ファイルをダウンロードする

### 方法1: ZIPファイルをダウンロードする場合

1. このリポジトリの「Code」ボタンから「Download ZIP」を選択
2. ダウンロードしたZIPファイルを任意の場所に解凍

### 方法2: Gitでクローンする場合

```bash
git clone https://github.com/YOUR_USERNAME/jira-ticket-copy-extension.git
```

## 2. ブラウザへの導入

1. ブラウザで拡張機能管理ページを開く
   - **Google Chrome**: `chrome://extensions/`
   - **Arc**: `arc://extensions/`
   - **Edge**: `edge://extensions/`

2. 右上の「デベロッパーモード」または「開発者モード」をONにする

3. 「パッケージ化されていない拡張機能を読み込む」をクリック

4. 解凍した `jira-ticket-copy-extension` フォルダを選択

5. 拡張機能一覧に「JIRAチケットコピーくん」が表示されれば導入完了

# 使い方

## 個別のチケットページ

1. JIRAチケットページを開く
2. アクションボタンエリアに表示されるコピーボタンをクリック
3. チケット番号とタイトルがリンク付きでクリップボードにコピーされます

## リスト表示

1. JIRAの「すべての作業」などのリスト表示を開く
2. 各チケットの左側に表示されるコピーボタンをクリック
3. そのチケットの情報がコピーされます

# ライセンス

MIT

# 開発

この拡張機能は[Claude Code](https://claude.ai/code)を使用して作成されました。

# 貢献

Issue報告やPull Requestは大歓迎です！