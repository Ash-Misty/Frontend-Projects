const plusButtons = document.querySelectorAll('.plus');

plusButtons.forEach(plus => {
  plus.addEventListener('click', (e) => {
    const clickedQues = e.currentTarget;
    const clickId = clickedQues.id;
    const img = clickedQues.querySelector('img');
    let ans;

    switch (clickId) {
      case "plus-1":
        ans = document.querySelector('.a1');
        break;
      case "plus-2":
        ans = document.querySelector('.a2');
        break;
      case "plus-3":
        ans = document.querySelector('.a3');
        break;
      case "plus-4":
        ans = document.querySelector('.a4');
        break;
      default:
        return;
    }

    const isOpen = img.src.includes('icon-minus');

    if (isOpen) {
     
      img.src = './assets/images/icon-plus.svg';
      ans.classList.remove('display');
    } else {
      
      img.src = './assets/images/icon-minus.svg';
      ans.classList.add('display');
    }
  });
});
