console.log('starting app');

setTimeout(() => {
  console.log('inside cb');
}, 2000);

setTimeout(() => {
  console.log('0 millis');
}, 0);

console.log('finishing up');
