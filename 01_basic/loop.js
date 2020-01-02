/* for(let i =0; i<6 ; i++){
    process.stdout.write(` `);
    for(let k=1; k<i; k++){
        process.stdout.write(`*`);
    }
    console.log()
}
 */

/*                              //역삼각형
 for(let i=0; i<5; i++){
     for(j=0; j<i; j++){
        process.stdout.write(` `);
     }
     for(k=5; k>i; k--){
        process.stdout.write(`*`);
     }
     console.log()
 }*/


/* for(let i=0; i<7; i++){
    for(let j=)
}
 */
for(let i=0; i<4; i++){
    for(let k =0; k<3-i; k++){
        process.stdout.write(` `);
    }
    for(let j=0; j<(i*2+1);j++){
        process.stdout.write(`*`);
    }
    console.log()
}



for(let i =0;i<3;i++){
    for(let k =0; k<i+1; k++){
        process.stdout.write(` `);
    }
    for(let j=1; j<=((3-i)*2-1); j++){
        process.stdout.write(`*`);
    }
    console.log()
}