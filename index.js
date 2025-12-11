const colors = document.querySelectorAll(".inner");
let score = document.querySelector(".score");
//localStorage.setItem('high', 0);
let track = [];
let countClick = 0;
let numberOfClicks = 0;

let highScore = document.querySelector(".hi-score");
//highScore.innerHTML = "Highest score: "+ localStorage.getItem('high');
let aux = localStorage.getItem('high');

if (aux == null || aux == 0){
    localStorage.setItem('high', 0);
    highScore.innerHTML = "Highest score: "+ localStorage.getItem('high');
}else{
  highScore.innerHTML = "Highest score: "+ localStorage.getItem('high');
}


function genareteRandomColor(){
    const random = Math.floor(Math.random() * colors.length);
    track.push(random);
    showColors();
}

function setColors(element){
  const time = 1000;
  return new Promise(resolve => {
    setTimeout(() => {
      element.style.transition = 'opacity 2000ms linear';
      element.style.opacity = 1;

      setTimeout(() => {
        element.style.opacity = 0.2;
        setTimeout(resolve, 2000); 
      }, time + 500);
    }, time);
  });
}

const showColors = async () => {
  score.innerHTML = 'Wait the colors and pay attention!';
  score.style.visibility = 'visible';
  for (let i = 0; i <  track.length; i++){
    await setColors(colors[track[i]]);
  }

    countClick = track.length;
    playGame(track, countClick);
};

async function playGame(array, countClick){

  let count = countClick;
  score.innerHTML = 'Now you can click!';
  for (let i = 0; i < count; i++){
    const clickedIndex = await waitForClick();
    const awnser = clickedIndex; 
    if (awnser == array[i]){
          numberOfClicks++;
          console.log("acertou");
        }else{
          console.log("errou!")
          gameEnd();
          return false;        
    }
  }

   genareteRandomColor();

}

function gameEnd(){
  alert("acabou!")
  updateHighScore(track.length - 1);
  score.style.visibility = 'visible'
  score.innerHTML = `Final Score: ${track.length - 1}`;
  numberOfClicks = 0;
}

//button to start the game

const buttonStartGame = document.querySelector("button");

buttonStartGame.addEventListener('click', () =>{
  let score = document.querySelector(".score");
  score.style.visibility = 'hidden';
  genareteRandomColor();
})

function waitForClick() {
  return new Promise(resolve => {
    // adiciona listener a cada square; remove todos depois do primeiro clique
    colors.forEach((el, i) => {
      const handler = () => {
        // remove todos os handlers
        colors.forEach((e) => e.removeEventListener('click', handler));
        resolve(i);
      };
      el.addEventListener('click', handler);
    });
  });
}

function updateHighScore(value){

  if (value > parseInt(localStorage.getItem('high'))){
    localStorage.setItem('high', value);
    highScore.innerHTML = "Highest score: "+ localStorage.getItem('high');
  }

  
}

