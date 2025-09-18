// ボタンを追加する関数
function addCopyButton() {
  // PRページかどうかチェック
  if (!window.location.pathname.includes('/pull/')) {
    return;
  }

  // すでにボタンが存在する場合は何もしない
  if (document.querySelector('#pr-copy-btn')) {
    return;
  }

  // PRタイトル要素を探す
  const prTitle = document.querySelector('.js-issue-title');
  if (!prTitle || !prTitle.parentElement) {
    return;
  }

  // コピーボタンを作成
  const copyBtn = document.createElement('button');
  copyBtn.id = 'pr-copy-btn';
  copyBtn.className = 'pr-copy-btn';
  copyBtn.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
  `;
  copyBtn.title = 'Copy PR title with URL';

  // クリックイベントを追加
  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const title = prTitle.textContent.trim();
    const url = window.location.href;
    const htmlContent = `<a href="${url}">${title}</a>`;
    const plainText = title;

    try {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' })
      });
      
      await navigator.clipboard.write([clipboardItem]);
      
      // 成功フィードバック
      copyBtn.classList.add('copied');
      const originalHTML = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
        </svg>
      `;
      
      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });

  // ボタンを挿入
  prTitle.parentElement.insertBefore(copyBtn, prTitle);
}

// DOM変更を監視
const observer = new MutationObserver(() => {
  addCopyButton();
});

// 監視を開始
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初回実行
addCopyButton();