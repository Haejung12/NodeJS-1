let now = new Date();

now.setDate(now.getDate() + 100);
console.log(now.toString());
console.log(now.toLocaleString());
console.log(now.toLocaleDateString());
console.log(now.toLocaleTimeString());


now = new Date();
//let dDay = new Date('November 15, 2020');

let dDay = new Date('2020-11-15');
let interval = dDay.getTime() - now.getTime();
interval = Math.floor(interval / (1000*60*60*24));
console.log(`수능 D-${interval}`);

