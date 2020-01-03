function callThreeTimes(callback){
    if(callback)
    {
        for(let i=0; i<3; i++){
            callback();
        }
    }
    else{
        console.log('No callback!!!');
    }
}

//정상
callThreeTimes(function(){
    console.log("Hello");
});

//예외

callThreeTimes();