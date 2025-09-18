// リスト表示の各アイテムにコピーボタンを追加する関数
function addJiraListCopyButtons() {
  // JIRAのリスト表示かどうかチェック
  if (!window.location.pathname.includes('/issues') && !window.location.search.includes('jql=')) {
    return;
  }

  // リストアイテムを探す（テーブルの行）
  const listItems = document.querySelectorAll('[data-testid="native-issue-table.ui.issue-row"]');

  listItems.forEach(item => {
    // すでにボタンがある場合はスキップ
    if (item.querySelector('.jira-list-copy-btn')) {
      return;
    }

    // チケット番号を取得（2番目のtd内のリンクから）
    let ticketNumber = null;
    const mergedCell = item.querySelector('[data-vc="merged-cell"]');

    if (mergedCell) {
      // merged-cell内のリンクから直接チケット番号を取得
      const keyLink = mergedCell.querySelector('a[href*="/browse/"]');
      if (keyLink) {
        const match = keyLink.href.match(/\/browse\/([A-Z]+-\d+)/);
        if (match) {
          ticketNumber = match[1];
        }
      }
    }

    if (!ticketNumber) {
      return;
    }

    // タイトルを取得
    const titleElement = item.querySelector('[data-testid="native-issue-table.common.ui.issue-cells.issue-summary.issue-summary-cell"]');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // コピーボタンを作成
    const copyBtn = document.createElement('button');
    copyBtn.className = 'jira-list-copy-btn';
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
      </svg>
    `;
    copyBtn.title = `Copy ${ticketNumber}`;

    // クリックイベント
    copyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const formattedTitle = `[${ticketNumber}] ${title}`;
      const simpleUrl = `${window.location.origin}/browse/${ticketNumber}`;
      const htmlContent = `<a href="${simpleUrl}">${formattedTitle}</a>`;
      const plainText = formattedTitle;

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

    // merged-cellにボタンを挿入
    if (mergedCell) {
      // 既存のレイアウトを保持しつつボタンを追加
      mergedCell.style.display = 'flex';
      mergedCell.style.alignItems = 'center';
      mergedCell.style.gap = '4px';

      // パディングの調整
      const currentPaddingLeft = window.getComputedStyle(mergedCell).paddingLeft;
      if (currentPaddingLeft === '0px') {
        mergedCell.style.paddingLeft = '8px';
      }

      // ボタンを一番最初（左端）に挿入
      mergedCell.insertBefore(copyBtn, mergedCell.firstChild);
    }
  });
}

// JIRA詳細ページ用のコピーボタンを追加する関数
function addJiraDetailCopyButton() {
  // JIRAチケットページかどうかチェック（複数のURLパターンに対応）
  const pathMatch = window.location.pathname.match(/\/browse\/([A-Z]+-\d+)/);
  const paramMatch = window.location.search.match(/selectedIssue=([A-Z]+-\d+)/);

  let ticketNumber = null;
  if (pathMatch) {
    ticketNumber = pathMatch[1];
  } else if (paramMatch) {
    ticketNumber = paramMatch[1];
  }

  if (!ticketNumber) {
    return;
  }

  // すでにボタンが存在する場合は何もしない
  if (document.querySelector('#jira-copy-btn')) {
    return;
  }

  // チケットタイトル要素を探す（JIRAの新UI対応）
  const titleElement = document.querySelector('h1[data-testid="issue.views.issue-base.foundation.summary.heading"]') ||
                       document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]') ||
                       document.querySelector('h1');

  if (!titleElement) {
    return;
  }

  // アクションボタンのツールバーを探す
  const addButton = document.querySelector('[data-testid*="quick-add"][data-testid*="add-button"]') ||
                   document.querySelector('[data-testid*="quick-add-items-compact"]');

  // ツールバーコンテナを探す
  const actionToolbar = addButton?.closest('.css-m1gh8r') ||
                       addButton?.closest('.css-rf2cmq') ||
                       document.querySelector('.css-m1gh8r') ||
                       document.querySelector('.css-rf2cmq');

  // コピーボタンを作成
  const copyBtn = document.createElement('button');
  copyBtn.id = 'jira-copy-btn';
  copyBtn.title = 'Copy ticket title with URL';

  // アクションツールバーがある場合は、そのスタイルに合わせる
  if (actionToolbar) {
    // JIRAのネイティブボタンと同じクラスとスタイルを複製
    const existingButton = actionToolbar.querySelector('button');
    if (existingButton) {
      // 既存のボタンのクラスをコピー
      copyBtn.className = existingButton.className;
      copyBtn.setAttribute('type', 'button');
      copyBtn.setAttribute('aria-label', 'Copy ticket title with URL');

      // ボタンの中身を構成
      const buttonHTML = existingButton.innerHTML;
      const spanWrapper = buttonHTML.match(/<span[^>]*class="[^"]*_v564[^"]*"[^>]*>/);
      const iconWrapper = buttonHTML.match(/<span[^>]*class="[^"]*_1e0c1o8l[^"]*"[^>]*>/);

      if (spanWrapper && iconWrapper) {
        copyBtn.innerHTML = `
          ${spanWrapper[0]}
            ${iconWrapper[0]}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" role="presentation" class="_1reo15vq _18m915vq _syaz1r31 _lcxvglyw _s7n4yfq0 _vc881r31 _1bsbpxbi _4t3ipxbi">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
              </svg>
            </span>
            <span class="_ca0qidpf _u5f3idpf _n3tdidpf _19bvidpf _19itidpf _1reo15vq _18m915vq _1bsbt94y _4t3it94y _kqswstnw _ogto7mnp _uiztglyw _o5721q9c">チケットをコピー</span>
          </span>
        `;
      } else {
        // シンプルなバージョン
        copyBtn.innerHTML = `
          <span style="display: inline-flex; align-items: center;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" role="presentation">
              <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
              <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
          </span>
        `;
      }
    } else {
      // 既存のボタンが見つからない場合
      copyBtn.className = 'jira-copy-btn-toolbar';
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
      `;
    }
  } else {
    // フォールバック：独自のスタイルを使用
    copyBtn.className = 'jira-copy-btn-standalone';
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
        <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
      </svg>
    `;
  }

  // クリックイベントを追加
  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // チケットタイトルを取得
    const title = titleElement.textContent.trim();
    // フォーマット: [チケット番号] タイトル
    const formattedTitle = `[${ticketNumber}] ${title}`;
    // シンプルなURLを生成（クエリパラメータなし）
    const simpleUrl = `${window.location.origin}/browse/${ticketNumber}`;
    const htmlContent = `<a href="${simpleUrl}">${formattedTitle}</a>`;
    const plainText = formattedTitle;

    try {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' })
      });

      await navigator.clipboard.write([clipboardItem]);

      // 成功フィードバック
      copyBtn.classList.add('copied');
      const originalHTML = copyBtn.innerHTML;
      const originalTitle = copyBtn.title;

      // チェックマークアイコンを表示
      if (actionToolbar) {
        copyBtn.innerHTML = `
          <span class="css-1wits42">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="presentation">
              <path d="M9.707 14.293l-3-3a1 1 0 0 0-1.414 1.414l3.707 3.707a1 1 0 0 0 1.414 0l7.293-7.293a1 1 0 0 0-1.414-1.414L9.707 14.293z"></path>
            </svg>
          </span>
        `;
      } else {
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
          </svg>
        `;
      }
      copyBtn.title = 'Copied!';

      setTimeout(() => {
        copyBtn.innerHTML = originalHTML;
        copyBtn.classList.remove('copied');
        copyBtn.title = originalTitle;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  });

  // ボタンを挿入
  if (actionToolbar) {
    // 新しいdiv要素でラップ
    const buttonWrapper = document.createElement('div');
    buttonWrapper.setAttribute('role', 'presentation');
    buttonWrapper.appendChild(copyBtn);

    // 最初の子要素の前に挿入
    const firstChild = actionToolbar.firstElementChild;
    if (firstChild) {
      actionToolbar.insertBefore(buttonWrapper, firstChild);
    } else {
      actionToolbar.appendChild(buttonWrapper);
    }
  } else if (titleElement.parentElement) {
    // フォールバック：タイトルの隣に配置
    titleElement.parentElement.style.position = 'relative';
    titleElement.parentElement.appendChild(copyBtn);
  }
}

// DOM変更を監視
const observer = new MutationObserver(() => {
  addJiraDetailCopyButton();
  addJiraListCopyButtons();
});

// 監視を開始
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 初回実行（ページロード時とURL変更時の両方に対応）
setTimeout(() => {
  addJiraDetailCopyButton();
  addJiraListCopyButtons();
}, 1000);
addJiraDetailCopyButton();
addJiraListCopyButtons();

// URLの変更を検知（SPAのページ遷移対応）
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    setTimeout(() => {
      addJiraDetailCopyButton();
      addJiraListCopyButtons();
    }, 500);
  }
}).observe(document, {subtree: true, childList: true});