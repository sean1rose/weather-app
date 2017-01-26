var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number'){
        resolve(a + b);
      }
      else if (typeof a === 'string' && typeof b === 'string'){
        resolve(a + b);
      }
      else {
        reject('This func requires 2 integers or 2 strings as argumentsin order to add up');
      }
    }, 1500);
  });
};

asyncAdd(7, 14).then((res) => {
  console.log(`1st result is ${res}`);
  return asyncAdd(res, 14);
}).then((res) => {
  // ^ this is the then resolving the 2nd asyncAdd call
  console.log('Should be 35 - ', res);
}).catch((err) => {
  console.log(err);
})

// var somePromise = new Promise((resolve, reject) => {
//   // resolve arg -> data that is passed back to user
//   setTimeout(() => {
//     resolve('hey foo it worked!');
//     // reject(`Error unable to fulfill promise`);
//   }, 2500);
// });

// // 'then' is called only if promise works as expected and is fulfilled.
// // when it does -> it's called w/ the value passed to 'resolve'
// // 2nd callback func is for error handling...
// somePromise.then((msg) => {
//   console.log('Success: - ', msg);
// }, (errMsg) => {
//   console.log(`Error: ${errMsg}`)
// })