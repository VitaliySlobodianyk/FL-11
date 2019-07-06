const sizeOfPoints=3;
let points =[];
const asciiRange=65;
for(let i=0; i<sizeOfPoints;i++) {
      let x= prompt(`Enter ${String.fromCharCode(i+asciiRange)}x:`);
      let y= prompt(`Enter ${String.fromCharCode(i+asciiRange)}y:`);
      if(isNaN(x) || isNaN(y) ||!x || !y){
          alert('Wrong Data! \n Renter the data!');
          points=null;
          break;
      }else{
        points[i]={
            x: Number(x),
            y: Number(y)
        };
      }
}
    if(points[0].x === points[1].x && points[0].y === points[1].y){
       console.log('Entered points don\'t make a line');
    }else if(points){
    let checkPoint={};
    const two = 2;
    checkPoint.x = (points[0].x + points[1].x) / two;
    checkPoint.y = (points[0].y + points[1].y) / two;
    console.log(checkPoint.x === points[two].x && checkPoint.y === points[two].y);
}




