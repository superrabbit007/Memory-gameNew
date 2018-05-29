
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
    console.log(event.target);
  }


}

function openArray(event) {
  if (event.target.className === 'card show') {
    let tags = event.target.classList.value;
    tags = 'card open show';
    event.target.classList.value = tags;
    //增加计数，便于向数组中存入更新后的event.target
    count = count +1;
    console.log(count);

    //设置数组的长度和页面卡片数组的长度相同（此时arrayOpen数组为空数组，但长度已经设置）
    arrayOpen.length = array.length;
    //由于点击之后count的最小值为1，数组index需要从0开始，所以此处count-1
    arrayOpen[count-1] = event.target;
    console.log(arrayOpen);

  }
//   for(let i=0; i<array.length; i++) {
//
//     let arrayNew = [];
//     arrayNew[i]= event.target;
//   }
}

function matchCard(event) {
  //查找被点击的事件li-i 中的标签<i>
  let cardName = event.querySelect('i');
  //如果两个卡片的<i>中的class值相等，那么两种卡片相同，设置它们的值为card match
  if (cardName.classList[1] === arrayNew.classList[1] ) {
    event.classList.value = "card match";
  }else {
    //查询所给定事件的索引
    const index=array.indexOf(event);
    // 移除index处的元素
    array= array.splice(index,1);
  };

}



function ll(event) {
  // console.log(event.target.nodeName);
  showCard(event);
  openArray(event);
  console.log(count);
  // console.log(arrayOpen[2]);
  matchCard();


  // openArray();
  // if (arrayNew.length>0) {
  //   matchCard();
  // }
}




document.addEventListener('click', ll);
