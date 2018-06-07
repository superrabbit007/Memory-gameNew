
const memory = document.body.getElementsByClassName('card');
// const memory =document.getElementsByClassName('card');

//将nodeList转化为列表
let array = Array.from(memory);

let event =[];
let countOpen = 0;
let countMoves = 0;
let countClick = 0;
let matchSum = 0;

let arrayOpen = [];

let star = document.getElementsByClassName('fa-star');
let move = document.getElementsByClassName('moves');
let divCard = document.getElementsByClassName('container');
let popBox = document.getElementById('pop-box');

let time = document.getElementsByClassName('time-count');
let timeSecond = 0;
let timeShow = 0;
let timer;
let totalCount = 0;


//说明：给定的shuffle 函数通过伪随机数的方式，对array中存储的card进行洗牌（打乱顺序）
//但是更新到界面上的效果是：每运行一次，array中相同索引存储的是不同的card值，看似洗牌成功
//可是每次运行shuffle之后，测试memory的值，card顺序没有变化，因此需要将array中的顺序
//重新写入memory中
/***
*@description 点击restart之后，重新打乱卡片顺序，重置计时，计数和星星等级
*@constructor
*/
function shuffle(array) {
  console.log("arrayOpen:"+arrayOpen);
  // console.log(memory);
  console.log(event);
  let currentIndex = array.length;
  let temporaryValue = 0
  let randomIndex = 0;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

  }

  for (let i=0; i<array.length; i++) {
    memory[i].outerHTML = array[i].outerHTML;
      //针对当用户只点击一张卡片后，就点击restart的情况
    memory[i].classList.value = "card";
  }
    arrayOpen=[];
    countClick = 0;
    countOpen=0;
    countMoves=0;
    matchSum=0;
    let move = document.getElementsByClassName('moves');
    //restart后，将moves置零
    move[0].textContent = 0;
    //将星星显示重置
    let star1 = document.getElementsByClassName('fa');
    for (let i=0; i<3; i++) {
      star1[i].classList.value = "fa fa-star";
    }
    totalCount = 0;
    clearInterval(timer);
    //setInterval中的秒数计时置零，以便从零开始重新计时
    timeSecond = 0;
    time[0].textContent = "Timer 0";
    return memory;
}


// 用户点击之后，显示卡片
function showCard(event) {
  //将所点击的卡片的class值赋值给tags
  let tags = event.target.classList.value;
  //增加判断，避免多次点击同一卡片时，多次更新tags的值（即只在第一次点击时添加show）
  if (tags === 'card') {
    //给tags添加show类
    tags = tags + ' show';
    //连接到html中，更新html中该卡片的li-class值
    event.target.classList.value = tags;
  }

}

//卡片open状态
function openArray(event) {
  if (event.target.className === 'card show') {
    let tags = event.target.classList.value;
    tags = 'card open show';
    event.target.classList.value = tags;
    //增加计数，便于向数组中存入更新后的event.target
    countOpen = countOpen +1;

    //设置点击次数计数，用于判断是否调用judgeCard函数
    countClick =countClick +1;

    //由于点击之后count的最小值为1，数组index需要从0开始，所以此处count-1
    arrayOpen[countOpen-1] = event.target;
  }

}


/***
*@description 每当界面有两张卡片为open show 状态时，执行判断函数
*@constructor
*/
function judgeCard(event) {
//通过countClick的条件限制，每次调用judgeCard函数时，count的值为2的整数倍

//使用count，确保比较的是每次最新的点击（不能只考虑索引0和1处的值）
  if (arrayOpen[countOpen-2].firstElementChild.classList.value === arrayOpen[countOpen-1].firstElementChild.classList.value) {
    //console.log("match");
    //console.log(arrayOpen[countOpen-2],arrayOpen[countOpen-1]);
    //两张卡片图形相同，调用matchCard更改卡片的样式
    matchCard(event);
  }else {
    notMatch(event);
  }
  // 每次比较完成，countClick置零，重新当前open状态的card数目
  countClick =0;
  //记录尝试配对的卡片的对数,即moves数
  countMoves+=1;
  //更新页面moves和star的数目
  moveCard(event);
  starScore(event);

}

/**
*@description 向页面写入当前的移动步数countMoves
*/

function moveCard(event) {

  move[0].textContent = countMoves;
}


/***
*@description 卡片匹配时，设置动画和卡片状态，当所有卡片匹配完成后，停止计时并且调用弹框
*@constructor
*@param {number} matchSum 匹配的卡片数
*@param {number} timer 计时器返回的id
*/

function matchCard(event) {
//给匹配的卡片增加过渡动画
  for (let i=countOpen-2; i<countOpen; i++) {
    arrayOpen[i].classList.value = "card match ani";
  }
//动画完成后显示正常匹配样式
  document.addEventListener('transitionend', function(event){
    console.log("Great Match!");
    for (let i=countOpen-2; i<countOpen; i++) {
      arrayOpen[i].classList.value = "card match";
    }
  });

  matchSum+=1;
  //console.log("matchSum:"+ matchSum);
  //8组匹配成功，则弹出成绩框
  if (matchSum === 8) {
    //停止计时
    clearInterval(timer);
    //延时弹框
    setTimeout(pop,500);
  }

}

//弹框
function pop() {
    //console.log("You've finished the game!");
    // let divCard = document.getElementsByClassName('container');
    console.log(divCard);
    divCard[0].style.cssText = "visibility: hidden";
    //获取当前实心星星数
    let starCount = document.getElementsByClassName('fa-star');
    let stCount = starCount.length;
    popBox.style.cssText = "visibility: visible";
    //更改弹框中的提示信息
    let popMessage1 = document.getElementsByClassName('pop-message1');
    popMessage1[0].style.cssText = " width:100%; font-size:1em; text-align:center";
    popMessage1[0].textContent="With "+ countMoves + " Moves and "+ stCount+" Stars.";
    //输出页面计时
    popMessage1[1].textContent="Use  " + time[0].textContent;
    // console.log(time[0]);
}


/***
*@description 两张卡片不匹配时，显示的过渡动画，之后将卡片图片信息设置为隐藏
*@constructor
*/

function notMatch(event) {

  for (let i=countOpen-2; i<countOpen; i++) {
      arrayOpen[i].classList.value = "card open show ani";
  }

  document.addEventListener('transitionend', function(event){
    console.log("Great!");
    for (let i=countOpen-2; i<countOpen; i++) {
      arrayOpen[i].classList.value = "card";
    }
  });
}

//星级评分
function starScore(event) {
  console.log('startest');
  // let star = document.getElementsByClassName('fa-star');
  //指定moves时，通过更改class的值，将星星变为空心
  switch (countMoves) {
    case 12:{
      star[2].classList.value = "fa fa-star1";
      break;
    }
    case 16:{
      star[1].classList.value = "fa fa-star1";
      break;
    }
    case 24:{
      star[0].classList.value = "fa fa-star1";
      break;
    }
    default:;
  }
}


/***
*@description play again 按钮，刷新游戏界面（并不是刷新整个web）
*@constructor
*@param {Array} array 当前页面的卡片数组
*/

function playAgain(array) {
  shuffle(array);
  // let popBox = document.getElementById('pop-box');
  popBox.style.cssText = "visibility: hidden";
  divCard[0].style.cssText = "visibility: visible";
  //console.log("pophiden test");
  document.addEventListener('click', gameClickListen);
}



/***
*@description 关闭弹框
*@constructor
*/
function closeGame(array) {
  //console.log("test close");
  popBox.style.cssText = "visibility: hidden";
  divCard[0].style.cssText = "visibility: visible";
  document.addEventListener('click', gameClickListen);

}



/***
*@description 调用计时器函数，每1000毫秒（1s）计时一次，并写入页面
*@constructor
*/

function timeCount(event) {
  timer = setInterval(function(){
    timeSecond+=1;
    timeShow = timeFormat(timeSecond);
    time[0].textContent= " Timer " +timeShow;
  },1000);
}



/***
*@description 将页面计时的秒数转化为hh:mm:ss形式
*@constructor
*@param {number} seconds 秒数
*/

function timeFormat(seconds) {
  let hour=0
  let min=0;
  let timeShow1=0;
  let sec = timeSecond%60;
  let minutes = Math.floor(timeSecond/60);
  if (minutes>=60) {
    hour = Math.floor(minutes/60);
    min = minutes%60;
  }else if (minutes<10) {
    min = "0" + minutes;
  }else {
    min = minutes;
  }
  if (sec<10) {
    sec = "0" + sec;
  }
  timeShow1 = hour ? (hour +" h" + ": " + min + " min" + ": " + sec + " sec") : (min + " min" + ": " + sec + " sec");

  return timeShow1;

}





/***
*@description 监听函数
*@constructor
*@param {MouseEvent} event 所监听的事件类型
*/

function gameClickListen(event) {
  console.log(event);
  showCard(event);
  openArray(event);
  console.log(totalCount);
  //加入判断语句，仅当点击卡片时，页面响应
  if (event.target.nodeName === "LI" || event.target.classList.value === "card") {
    //仅当第一次点击的是卡片时，页面开始计时
    totalCount += 1;
    //仅当第一次点击时，页面开始计时
    console.log(countOpen, totalCount);
    if (countClick=== 1 && totalCount ===1) {
      console.log("test time!!!!");
      timeCount(event);
    }
    // 仅当有两次点击时，判断卡片的状态；否则继续等待点击
    if (countClick === 2) {
      judgeCard(event);
      event.preventDefault();
    }else {
      document.addEventListener('click', gameClickListen);
    }
  }else if (event.target.classList.value === "fa fa-repeat") {
    shuffle(array);
    document.addEventListener('click', gameClickListen);
  }

}



document.addEventListener('click', gameClickListen);
