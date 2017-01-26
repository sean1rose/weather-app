var somePromise = new Promise((resolve, reject) => {
  // resolve arg -> data that is passed back to user
  setTimeout(() => {
    resolve('hey foo it worked!');
    // reject(`Error unable to fulfill promise`);
  }, 2500);
});

// 'then' is called only if promise works as expected and is fulfilled.
// when it does -> it's called w/ the value passed to 'resolve'
// 2nd callback func is for error handling...
somePromise.then((msg) => {
  console.log('Success: - ', msg);
}, (errMsg) => {
  console.log(`Error: ${errMsg}`)
})