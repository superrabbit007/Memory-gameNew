
const memory = document.body.getElementsByClassName('card');
// const memory =document.getElementsByClassName('card');

//将nodeList转化为列表
let array = Array.from(memory);

let count = 0;
let evetn = [];


function ll(event) {
  // console.log(event.target.nodeName);
  // showCard(event);
  // openArray(event);
  test(event);
  console.log(count);
  // console.log(arrayOpen[2]);
  if (count === 2) {
    judgeCard(event);
  }else {
    document.addEventListener('click', ll);
  }

  // console.log(memory);
}

function judgeCard(event) {
  console.log("Call success!");
};

function test(event) {
  if (event.target.className === 'card show') {
    let tags = event.target.classList.value;
    tags = 'card open show';
    event.target.classList.value = tags;
  }
  count+=1;
  console.log(count);
}



document.addEventListener('click', ll);


//matchCard备用写法

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
  console.log(array);
}
