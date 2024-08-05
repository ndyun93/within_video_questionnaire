

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('video-questions-form');
    // 現在のページのURLからファイル名を抽出（例: 'video-page1.html'）
    var currentPage = window.location.pathname.split("/").pop();
    var videoPageId = currentPage.split(".")[0]; // 拡張子を除外（例: 'video-page1'）

    form.addEventListener('submit', function(event) {
      event.preventDefault(); // フォームのデフォルトの送信を防ぐ
  
      // 各質問の回答を取得する
      var question1 = document.querySelector('input[name="question1"]:checked').value;
      var question2 = document.querySelector('input[name="question2"]:checked').value;
      var question3 = document.querySelector('input[name="question3"]:checked').value;
      var question4 = document.querySelector('input[name="question4"]:checked').value;
      var question5 = document.querySelector('input[name="question5"]:checked').value;
      var question6 = document.querySelector('input[name="question6"]:checked').value;

  
      // 既存の回答を取得（存在しない場合は空のオブジェクトを使用）
      var answers = JSON.parse(sessionStorage.getItem('answers')) || {};

      // 回答を更新（ページIDをキーとして）
      answers[videoPageId] = {
          question1: question1,
          question2: question2,
          question3: question3,
          question4: question4,
          question5: question5,
          question6: question6,
      };
      console.log(answers[videoPageId])
      // 更新した回答をセッションストレージに保存
      sessionStorage.setItem('answers', JSON.stringify(answers));
      // シャッフルされた動画ページの配列を取得
      var videoPages = JSON.parse(sessionStorage.getItem('videoPages'));

      // 現在のページのインデックスを取得
      var url = new URL(window.location.href);
      var currentPage = url.pathname.split("/").pop();
      var currentPageIndex = videoPages.indexOf(currentPage);

      if (currentPageIndex >= 0 && currentPageIndex < videoPages.length - 1) {
        // 次の動画ページにリダイレクト
        window.location.href = videoPages[currentPageIndex + 1];
      } else {
        // 最後の動画ページの場合、サンクスページなどにリダイレクト
        // sessionStorageに含まれているすべてのデータをコンソールに出力
        // 4桁の乱数を生成
        var randomNumber = Math.floor(1000 + Math.random() * 9000);
        // 乱数をsessionStorageに保存
        sessionStorage.setItem('randomNumber', randomNumber);
        // データをCSV形式で保存
        var csv = 'key,value\n';
        for (var i = 0; i < sessionStorage.length; i++) {
          var key = sessionStorage.key(i);
          var value = sessionStorage.getItem(key);
          csv += key + ',' + value + '\n';
        }
        // XMLHttpRequestを使用してサーバーにPOSTリクエストを送信
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://136.187.116.133:28080/upload-csv", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log('送信成功: ', xhr.responseText);
                } else {
                    console.error('送信失敗: ', xhr.status);
                }
            }
        };
        xhr.send(JSON.stringify({ data: csv }));

        // サーバー側の処理が完了した後の処理（例えば、サンキューページへのリダイレクト）
        xhr.onload = function() {
            if (xhr.status === 200) {
                window.location.href = 'thank-you.html';
            } else {
                console.error('エラーが発生しました');
            }
        };
      }
    });
});
