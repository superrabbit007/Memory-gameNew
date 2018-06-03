
const memory = document.body.getElementsByClassName('card');
// const memory =document.getElementsByClassName('card');

//将nodeList转化为列表
let array = Array.from(memory);

let event =[];
let count = 0;
let count1 = 0;
let co = 0;
let matchSum = 0;

let arrayOpen = [];

let star = document.getElementsByClassName('fa-star');
let move = document.getElementsByClassName('moves');
let divCard = document.getElementsByClassName('container');
let popBox = document.getElementById('pop-box');




//说明：给定的shuffle 函数通过伪随机数的方式，对array中存储的card进行洗牌（打乱顺序）
//但是更新到界面上的效果是：每运行一次，array中相同索引存储的是不同的card值，看似洗牌成功
//可是每次运行shuffle之后，测试memory的值，card顺序没有变化，因此需要将array中的顺序
//重新写入memory中
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
    co = 0;
    count=0;
    count1=0;
    matchSum=0;
    let move = document.getElementsByClassName('moves');
    //restart后，将moves置零
    move[0].textContent = 0;
    //将星星显示重置
    let star1 = document.getElementsByClassName('fa');
    for (let i=0; i<3; i++) {
      star1[i].classList.value = "fa fa-star";
    }

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
    count = count +1;

    //设置点击次数计数，用于判断是否调用judgeCard函数
    co =co +1;

    //由于点击之后count的最小值为1，数组index需要从0开始，所以此处count-1
    arrayOpen[count-1] = event.target;
  }

}

//每当界面有两张卡片为open show 状态时，执行判断函数
function judgeCard(event) {
//通过co的条件限制，每次调用judgeCard函数时，count的值为2的整数倍

//使用count，确保比较的是每次最新的点击（不能只考虑索引0和1处的值）
  if (arrayOpen[count-2].firstElementChild.classList.value === arrayOpen[count-1].firstElementChild.classList.value) {
    //console.log("match");
    //console.log(arrayOpen[count-2],arrayOpen[count-1]);
    //两张卡片图形相同，调用matchCard更改卡片的样式
    matchCard(event);
  }else {
    notMatch(event);
  }
  //每次比较完成，co置零，重新当前open状态的card数目
  co =0;
  //记录尝试配对的卡片的对数,即moves数
  count1+=1;
  //更新页面moves和star的数目
  moveCard(event);
  starScore(event);

}


function moveCard(event) {
  // let move = document.getElementsByClassName('moves');
  //console.log(move);
  move[0].textContent = count1;
}


function matchCard(event) {
//给匹配的卡片增加过渡动画
  for (let i=count-2; i<count; i++) {
    arrayOpen[i].classList.value = "card match ani";
  }
//动画完成后显示正常匹配样式
  document.addEventListener('transitionend', function(event){
    console.log("Great Match!");
    for (i=count-2; i<count; i++) {
      arrayOpen[i].classList.value = "card match";
    }
  });

  matchSum+=1;
  //console.log("matchSum:"+ matchSum);
  //8组匹配成功，则弹出成绩框
  if (matchSum === 8) {
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

    // let popBox = document.getElementById('pop-box');
    // popBox.style.cssText = "top:300px; left:500px; width:600px; height:300px;
    popBox.style.cssText = "visibility: visible";
    //更改弹框中的提示信息
    let popMessage1 = document.getElementsByClassName('pop-message1');
    popMessage1[0].style.cssText = " width:100%; font-size:1em; text-align:center";
    popMessage1[0].textContent="With "+ matchSum + " Moves and "+ stCount+" Stars.";

}


function notMatch(event) {

  for (let i=count-2; i<count; i++) {
      arrayOpen[i].classList.value = "card open show ani";
  }

  document.addEventListener('transitionend', function(event){
    console.log("Great!");
    for (i=count-2; i<count; i++) {
      arrayOpen[i].classList.value = "card";
    }
  });
}

//星级评分
function starScore(event) {
  console.log('startest');
  // let star = document.getElementsByClassName('fa-star');
  //指定moves时，通过更改class的值，将星星变为空心
  switch (count1) {
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



//play again 按钮，刷新游戏界面（并不是刷新整个web）
function playAgain(array) {
  shuffle(array);
  // let popBox = document.getElementById('pop-box');
  popBox.style.cssText = "visibility: hidden";
  divCard[0].style.cssText = "visibility: visible";
  //console.log("pophiden test");
  document.addEventListener('click', ll);
}

function closeGame(array) {
  //console.log("test close");
  popBox.style.cssText = "visibility: hidden";
  divCard[0].style.cssText = "visibility: visible";
  document.addEventListener('click', ll);

}


function ll(event) {
  // console.log(event.target.classList.value);
  // console.log(event.target.nodeName);
  // console.log(memory);
  // console.log(array);

  //加入判断语句，仅当点击卡片时，页面响应
  if (event.target.nodeName === "LI" || event.target.classList.value === "card") {
    showCard(event);
    openArray(event);
    //console.log(count);
    //console.log(co);
    // 仅当有两次点击时，判断卡片的状态；否则继续等待点击
    if (co === 2) {
      judgeCard(event);
      event.preventDefault();
    }else {
      document.addEventListener('click', ll);
    }
  }else if (event.target.classList.value === "fa fa-repeat") {
    //console.log("test restart");
    // console.log(array);
    shuffle(array);
    //console.log("test!!!!");
  }

}



document.addEventListener('click', ll);
