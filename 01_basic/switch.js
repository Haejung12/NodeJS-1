let grade = 'A';

//string 타입에 대해서도 switch - case
switch(grade){
    case 'A' :
        console.log(`100-90점`);
        break;
    case 'B' :
        console.log(`89-80점`);
        break;
    case 'C' :
        console.log(`79-70점`);
        break;
    case 'D' :
        console.log(`79-60점`);
        break;
    default:
        console.log(`60점미만`);
}