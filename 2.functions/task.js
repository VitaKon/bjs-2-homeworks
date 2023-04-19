// Задание 1
function getArrayParams(arr) {
  let min = arr[0];
  let max = arr[0];
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    if (min > arr[i]) {
      min = arr[i];
    }
    if (max < arr[i]) {
      max = arr[i];
    }

    sum = sum + arr[i];
  }

  let avg = sum / arr.length;
  avg = Number(avg.toFixed(2));

  return { min: min, max: max, avg: avg };
}

// Задание 2
function worker(arr) {
  let sum = 0;

  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}

function makeWork(arrOfArr, func) {

  let sum = 0;
  let max = func(arrOfArr[0]);
  for (let i = 0; i < arrOfArr.length; i++) {

    let sum = func(arrOfArr[i]);
    if (max < sum) {
      max = sum;
    }

  } return max;
}

// Задание 3
function worker2(arr) {
  let arrayParams = getArrayParams(arr);
  return Math.abs(arrayParams.max - arrayParams.min);

}
