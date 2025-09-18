# GitHubPRコピーくん
<img width="832" height="147" alt="img" src="https://github.com/user-attachments/assets/ea42e5c3-0afb-46a5-949e-09ec8684b605" />

GitHub PR（Pull Request）のタイトルをリンク付きでコピーするChrome拡張機能です。

# 機能

- GitHub PRページでタイトルの横にコピーボタンを表示
- クリックするとPRタイトルがリンク付きでクリップボードにコピー
- Slack、Discord、Google Docsなどにペーストすると自動的にリンク付きテキストとして表示

# 対応ブラウザ

- Google Chrome
- Arc
- その他Chromium系ブラウザ

# インストール方法

## 1. ファイルをダウンロードする

### 方法1: ZIPファイルをダウンロードする場合

1. このリポジトリの「Code」ボタンから「Download ZIP」を選択
2. ダウンロードしたZIPファイルを任意の場所に解凍
<img width="338" height="302" alt="img" src="https://github.com/user-attachments/assets/9ae0c11d-35e2-4e94-a5e8-6db6c42fe6e3" />

### 方法2: Gitでクローンする場合

```bash
git clone https://github.com/YOUR_USERNAME/github-pr-copy-extension.git
```

## 2. ブラウザへの導入

1. ブラウザで拡張機能管理ページを開く
   - **Google Chrome**: `chrome://extensions/`
   - **Arc**: `arc://extensions/`

2. 右上の「デベロッパーモード」または「開発者モード」をONにする

3. 「パッケージ化されていない拡張機能を読み込む」をクリック

4. 解凍した `github-pr-copy-extension` フォルダを選択

5. 拡張機能一覧に「GitHubPRコピーくん」が表示されれば導入完了

<img width="1070" height="659" alt="img" src="https://github.com/user-attachments/assets/8852d069-8132-4498-972e-600180cccfa5" />

# 使い方

1. GitHubのPRページを開く
2. PRタイトルの左横に表示されるコピーボタンをクリック
3. お好きな場所にペースト

# ライセンス

The Unlicense（パブリックドメイン）

# 開発

この拡張機能は[Claude Code](https://claude.ai/code)を使用して作成されました。

# 貢献

Issue報告やPull Requestは大歓迎です！
