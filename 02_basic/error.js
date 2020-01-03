function callThreeTrimes(callback){
    for(let i=0; i<3; i++){
        callback();
    }
}

//정상
callThreeTrimes(function(){
    console.log("Hello")
});

/* //예외
callTenTimes(); */