let now = new Date();

/* console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getHours());
console.log(now.getMinutes());
 */
let currentHour = now.getHours();

if(currentHour >= 12){
    console.log('오후 ' + (currentHour-12)+'시');
}
else{
    console.log(`오전 ` + currentHour+ `시`);
}

if (currentHour >=12){
    console.log(`오후 ${currentHour-12}시`);
}
else{
    console.log(`오전 ${currentHour}시`);
}

let apm ='오전';
if (currentHour >= 12){
    apm = '오후';
    currentHour -= 12;

}

console.log(`${apm} ${currentHour}시`);

apm = currentHour >= 12 ? `오후` : `오전` ;  //3항연산자
currentHour = currentHour >= 13 ? currentHour-12 : currentHour ;
console.log(`${apm} ${currentHour}시`);