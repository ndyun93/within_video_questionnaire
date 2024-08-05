function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('demographics-form');
    var ageInput = document.getElementById('age');
    var genderInputs = document.querySelectorAll('input[name="gender"]');
    var nextButton = document.querySelector('.next-button');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // フォームのデフォルトの送信を防ぐ
  
      var age = ageInput.value;
      var gender = [...genderInputs].find(input => input.checked)?.value;
  
      if (age && gender) {
        sessionStorage.setItem('age', age);
        sessionStorage.setItem('gender', gender);
        // 動画ページの配列をシャッフル
        let videoPages = [
          'video-page1.html',
          
          'video-page2.html',
          'video-page3.html',
          'video-page4.html',
          'video-page5.html',
          'video-page6.html',
          'video-page7.html',
          'video-page8.html',
          'video-page9.html',
          'video-page10.html'
          
          
        ];
        shuffleArray(videoPages);
        // シャッフルされた順番をセッションストレージに保存
        sessionStorage.setItem('videoPages', JSON.stringify(videoPages));
    
        // 最初の動画ページにリダイレクト
        window.location.href = videoPages[0];
    
      } else {
        // 必要な回答がされていない場合は、ユーザーに警告する
        alert('すべての質問に回答してください。');
      }
    });
  
    // 年齢と性別の入力を監視して、両方が入力されたら「次へ」ボタンを有効にする
    function updateButtonState() {
      var age = ageInput.value;
      var gender = [...genderInputs].find(input => input.checked)?.value;
      nextButton.disabled = !(age && gender);
    }
  
    ageInput.addEventListener('input', updateButtonState);
    genderInputs.forEach(input => input.addEventListener('change', updateButtonState));
  });

