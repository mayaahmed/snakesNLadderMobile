  var canvas = document.getElementById('canvas');
var context=canvas.getContext('2d');  
var snakes = new Image();
snakes.src="./images/snakes.jpg";


var face0=new Image(); face0.src="./images/d1.png";
var face1=new Image(); face1.src="./images/d2.png";
var face2=new Image(); face2.src="./images/d3.png";
var face3=new Image(); face3.src="./images/d4.png";
var face4=new Image(); face4.src="./images/d5.png";
var face5=new Image(); face5.src="./images/d6.png";

function throw_dice(){
  var random_dice=Math.round(Math.random()*5); // 0..5
  document.images["mydice"].src = eval("face"+random_dice+".src")
}
  
    var offsetX= canvas.offsetLeft;
    var offsetY= canvas.offsetTop;
    var startX;
    var startY;
    var isDown=false;


    var pi2=Math.PI*2;
    var resizerRadius=8;
    var rr=resizerRadius*resizerRadius;
    var draggingResizer={x:0,y:0};
   
    var draggingImage=false;
   
var kandis = new Array();


 var selectedImage=-1;
    
  
var snapshotYes=0;

function takeSnapshot() {

    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
    snapshotYes = 1;
   
}


function restoreSnapshot() {
    if(snapshotYes==1)
	context.putImageData(snapshot, 0, 0);
}

 


function initial()
{takeSnapshot();
  snakes.onload = function () {
        context.drawImage(snakes, 0, 0,300,330); }; 
  
}	 
 
function newGame(){  
restoreSnapshot()
 context.drawImage(snakes, 0, 0,300,330);
drawKandis();
}

function drawKandis(){
 // takeSnapshot();
var	img0 = new Image();
    img0.src= "./images/blue.png";
    kandis[0]={img: img0, imageX: 20, imageY: 350, imageWidth: 40, imageHeight: 40, imageRight: 0, imageBottom: 0};
    kandis[0].imageRight=kandis[0].imageX+kandis[0].imageWidth;
	kandis[0].imageBottom=kandis[0].imageY+kandis[0].imageHeight;
    kandis[0].img.onload = function () {
	draw(false,false,   kandis[0]); 
	};

    var	img1 = new Image();
    img1.src= "./images/green.png";
    kandis[1]={img: img1, imageX: 70, imageY: 350, imageWidth: 40, imageHeight: 40, imageRight: 0, imageBottom: 0};
    kandis[1].imageRight=kandis[0].imageX+kandis[0].imageWidth;
	kandis[1].imageBottom=kandis[0].imageY+kandis[0].imageHeight;
    kandis[1].img.onload = function () {
	draw(false,false,   kandis[1]); 
	};

    var	img2 = new Image();
    img2.src= "./images/red.png";
    kandis[2]={img: img2, imageX: 120, imageY: 350, imageWidth: 40, imageHeight: 40, imageRight: 0, imageBottom: 0};
    kandis[2].imageRight=kandis[0].imageX+kandis[0].imageWidth;
	kandis[2].imageBottom=kandis[0].imageY+kandis[0].imageHeight;
    kandis[2].img.onload = function () {
	draw(false,false,   kandis[2]); 
	};

    var	img3 = new Image();
    img3.src= "./images/yellow.png";
    kandis[3]={img: img3, imageX: 170, imageY: 350, imageWidth: 40, imageHeight: 40, imageRight: 0, imageBottom: 0};
    kandis[3].imageRight=kandis[0].imageX+kandis[0].imageWidth;
    kandis[3].imageBottom=kandis[0].imageY+kandis[0].imageHeight;
    kandis[3].img.onload = function () {
	draw(false,false,   kandis[3]); 
	};

}
        

initial();

 function imageDrawAll(){
 context.drawImage(snakes, 0, 0,300,330);

        for(var i=0;i<kandis.length;i++)
           draw(false,false,kandis[i] );



    }
   
    function draw(withAnchors,withBorders,pic ){
	

        // draw the image
        context.drawImage(pic.img,0,0,pic.img.width,pic.img.height,pic.imageX,pic.imageY,pic.imageWidth,pic.imageHeight);

        // optionally draw the draggable anchors
        if(withAnchors){
            drawDragAnchor(pic.imageX,pic.imageY);
            drawDragAnchor(pic.imageRight,pic.imageY);
            drawDragAnchor(pic.imageRight,pic.imageBottom);
            drawDragAnchor(pic.imageX,pic.imageBottom);
        }

        // optionally draw the connecting anchor lines
        if(withBorders){
            context.beginPath();
            context.moveTo(pic.imageX,pic.imageY);
            context.lineTo(pic.imageRight,pic.imageY);
            context.lineTo(pic.imageRight,pic.imageBottom);
            context.lineTo(pic.imageX,pic.imageBottom);
            context.closePath();
            context.stroke();
        }

    }

    function drawDragAnchor(x,y){
        context.beginPath();
        context.arc(x,y,resizerRadius,0,pi2,false);
        context.closePath();
        context.fill();
    }

    function anchorHitTest(x,y,pic){

        var dx,dy;

        // top-left
        dx=x-pic.imageX;
        dy=y-pic.imageY;
        if(dx*dx+dy*dy<=rr){ return(0); }
        // top-right
        dx=x-pic.imageRight;
        dy=y-pic.imageY;
        if(dx*dx+dy*dy<=rr){ return(1); }
        // bottom-right
        dx=x-pic.imageRight;
        dy=y-pic.imageBottom;
        if(dx*dx+dy*dy<=rr){ return(2); }
        // bottom-left
        dx=x-pic.imageX;
        dy=y-pic.imageBottom;
        if(dx*dx+dy*dy<=rr){ return(3); }
        return(-1);

    }


    function hitImage(x,y,pic){
        return(x>pic.imageX && x<pic.imageX+pic.imageWidth && y>pic.imageY && y<pic.imageY+pic.imageHeight);
    }


    function imageMouseDown(e){
 
      startX=parseInt(e.clientX-offsetX);
      startY=parseInt(e.clientY-offsetY);

	for(var i=0;i<kandis.length;i++){
          if(hitImage(startX,startY,kandis[i]))
              selectedImage=i;
          }
      
      draggingResizer=anchorHitTest(startX,startY,kandis[selectedImage]);
      draggingImage= draggingResizer<0 && hitImage(startX,startY, kandis[selectedImage]);
    }

    function imageMouseUp(e){
      draggingResizer=-1;
      draggingImage=false;  
	restoreSnapshot();
	imageDrawAll();
     // draw(false,false,kandis[selectedImage]);
	selectedImage=-1;
    }

    function imageMouseOut(e){
      imageMouseUp(e);
    }

    function imageMouseMove(e){

    
	if(draggingImage){

          imageClick=false;

          mouseX=parseInt(e.clientX-offsetX);
          mouseY=parseInt(e.clientY-offsetY);

          // move the image by the amount of the latest drag
          var dx=mouseX-startX;
          var dy=mouseY-startY;
          kandis[selectedImage].imageX+=dx;
          kandis[selectedImage].imageY+=dy;
          kandis[selectedImage].imageRight+=dx;
          kandis[selectedImage].imageBottom+=dy;
          // reset the startXY for next time
          startX=mouseX;
          startY=mouseY;

          // redraw the image with border 
	 restoreSnapshot();
        // draw(true,true, kandis[selectedImage]);
	  imageDrawAll();
      }
}


