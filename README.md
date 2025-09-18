# JIRAチケットコピーくん

JIRAチケットのタイトルをリンク付きでコピーできるChrome拡張機能です。
<img width="770" height="126" alt="image" src="https://github.com/user-attachments/assets/ae9ccf4f-8bda-405f-b495-c782f61a7c6e" />
<img width="688" height="395" alt="image" src="https://github.com/user-attachments/assets/333313de-9161-4b38-9d59-a903066f5a7d" />

# 機能

- JIRAチケットページでタイトルをリンク付きでコピー
- JIRAのリスト表示（すべての作業など）で各チケットをコピー
- クリックするとPRタイトルがリンク付きでクリップボードにコピー
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
<img width="353" height="325" alt="image" src="https://github.com/user-attachments/assets/13ecb5e2-0ad8-414c-b112-4899306346ad" />

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
<img width="1072" height="414" alt="image" src="https://github.com/user-attachments/assets/c68c723e-be03-4115-8ae3-3d8367679061" />

# 使い方

1. JIRAチケットが表示されているページを開く
2. 各エリアに表示されるコピーボタンをクリック
3. お好きな場所にペースト

# ライセンス

The Unlicense（パブリックドメイン）

# 開発

この拡張機能は[Claude Code](https://claude.ai/code)を使用して作成されました。

# 貢献

Issue報告やPull Requestは大歓迎です！
