document.addEventListener('DOMContentLoaded', () => {
    const yesOption = document.getElementById('yes-option');
    const noOption = document.getElementById('no-option');
    const nextButton = document.querySelector('.next-button');
  
    yesOption.addEventListener('change', () => {
      if (yesOption.checked) {
        nextButton.disabled = false;
      }
    });
  
    noOption.addEventListener('change', () => {
      if (noOption.checked) {
        nextButton.disabled = true;
      }
    });
  
    nextButton.addEventListener('click', () => {
      if (yesOption.checked) {
        location.href = 'demographics.html'; // 'はい'が選択された場合に進むページ
      }
    });
  });
  