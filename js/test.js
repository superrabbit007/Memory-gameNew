
const memory = document.body.getElementsByClassName('card');
// const memory =document.getElementsByClassName('card');

//将nodeList转化为列表
let array = Array.from(memory);
//
// for(let i=0; i<array.length; i++) {
//   array[i].
// }
let event =[];
let count = 0;
let count1 = 0;
let co = 0;
//如果在openArray()函数中声明该数组的话,不断调用该函数时，在该函数中"console.log(arrayOpen[2]);"的值
//只能输出一次，为什么？  ！！！不能再openArray()函数中才声明array Open数组，否则每次只能存储最后（最新）
//一次点击时的值

let arrayOpen = [];



function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

shuffle(array);



// 点击之后，显示卡片
function showCard(event) {
  //将所点击的卡片的class值赋值给tags
  let tags = event.target.classList.value;
  //增加判断，避免多次点击同一卡片时，多次更新tags的值（即只在第一次点击时添加show）
  if (tags === 'card') {
    //给tags添加show类
    tags = tags + ' show';
    //连接到html中，更新html中该卡片的li-class值
    event.target.classList.value = tags;
    // //test代码
    // console.log(event.target.classList.value);
    // console.log(tags);
    //测试更新class值是否成功（为什么此时输出时open类已经添加成功？）
    // console.log(event.target);
  };


}

//
function openArray(event) {
  if (event.target.className === 'card show') {
    let tags = event.target.classList.value;
    tags = 'card open show';
    event.target.classList.value = tags;
    //增加计数，便于向数组中存入更新后的event.target
    count = count +1;
    // console.log(count);
    //设置点击次数计数，用于判断是否调用matchCard函数
    co =co +1;

    //设置数组的长度和页面卡片数组的长度相同（此时arrayOpen数组为空数组，但长度已经设置）
    arrayOpen.length = array.length;
    //由于点击之后count的最小值为1，数组index需要从0开始，所以此处count-1
    arrayOpen[count-1] = event.target;
    // console.log(arrayOpen);

  };

}



function judgeCard(event) {

  //console.log(arrayOpen);
//使用count，确保比较的是每次最新的点击（不能只考虑索引0和1处的值）
  if (arrayOpen[count-2].firstElementChild.classList.value === arrayOpen[count-1].firstElementChild.classList.value) {
    console.log("match");
//为什么此刻，arrayOpen中所点击的两个卡片class显示为match?（还没有调用更改class的match函数呀？）它是怎么写入的？
    console.log(arrayOpen);
    matchCard2(event);
    // matchCard1(event);
    // matchCard(event);
  }else {
    notMatch(event);
    console.log("yyyyy");
    // arrayOpen[0].classList.value = arrayOpen[1].classList.value= "card";
  }
  co =0;

}


function matchCard(event) {
  console.log("test");
  let cardName=arrayOpen[count-2].firstElementChild.classList.value;
  console.log(arrayOpen[0]);
  //因为数组arrayOpen也可以和Html文档连接，所以搜索array数组中（该数组实时存储web中card的状态信息）
  //和open状态下匹配的卡片图形相同的卡片，在array中修改card的状态
  for (let i =1; i<array.length; i++) {
    if (array[i].firstElementChild.classList.value === cardName) {
      array[i].classList.value = "card match";
      console.log(array[i]);
    }
  }
  console.log(array);
  //array中的card的值更新后，对arrayOpen数组的值有什么影响吗？（因为上述for循环更新
  //array后，测试arrayOpen中的值也更新了）
  console.log(arrayOpen);
}

function matchCard1(event) {
  for (let i=0; i<count; i++) {
    //console.log("test match");
    //console.log(arrayOpen[i].classList.value);
    if (arrayOpen[i].classList.value === "card open show") {
      arrayOpen[i].classList.value = "card match";
    }
  }
  // console.log(array);
}

function matchCard2(event) {
  arrayOpen[count-2].classList.value = arrayOpen[count-1].classList.value = "card match";

}


function notMatch(event) {
  for (let i=0; i<count; i++) {
    if (arrayOpen[i].classList.value !== "card match") {
      console.log(arrayOpen[i].firstElementChild.classList.value);
      arrayOpen[i].classList.value = "card";
    }
  }
}










function ll(event) {
  // console.log(event.target.nodeName);
  showCard(event);
  openArray(event);
  console.log(count);
  console.log(co);
  // console.log(arrayOpen[2]);
  if (co === 2) {
    judgeCard(event);
  }else {
    document.addEventListener('click', ll);
  }


  // console.log(memory);
}





document.addEventListener('click', ll);
