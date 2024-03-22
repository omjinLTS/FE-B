function calcSum(n) {
  var sum = 0;
  for (var i = 1; i < n + 1; i++) {
    sum += i;
    //<=== 변수 i의 적용범위
  }
  console.log(sum);
  // <===변수 sum의 적용범위
}

calcSum(10);
