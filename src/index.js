import 'dotenv/config';

console.log('Hello ever running Node.js project.');
console.log(process.env.MY_SECRET);

export function sum(a, b) {
  return a + b;
}

export function callMyFunction(callback) {
  callback();
}

console.log(sum(1,2));

callMyFunction(function() {
  console.log('Hello world');
});