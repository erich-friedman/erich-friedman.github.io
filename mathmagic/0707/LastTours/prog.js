//////////////////////// Some adjustable variables

offTop=100   // offset from the top

offLeft=100  // offset from the left

delaySmall=2 // when traveling between squares

delayBig=250 // when finished changing square



/********************************* DO NOT CHANGE HERE DOWN ******************************/

var whereP=new Array(0,2), Piece=window.opener.Piece, moves=window.opener.path

var images=new Array()
images[1]=new Image(); images[1].src="rook.gif"
images[2]=new Image(); images[2].src="king.gif"
images[3]=new Image(); images[3].src="queen.gif"


var who=new Array(),       // address of the pieces,
    exist=new Array(),     // existence of the pieces;
    numP,                  // how many pieces do exist.
                           // Only for existing pieces we define:
    whereTop=new Array(),  // the y-coordinate 
    whereLeft=new Array()  // the x-coordinate


var counter,   // for the inner-loop
    Counter,   // for the outer-loop
    first=true // true if not yet started

// Movements are described in terms of increments of the coordinates;
// in terms of the numeric keypad we have:

//                0=fake  1  2   3   4  5=fake   6   7  8  9
var incL=new Array(   0 ,-1, 0 , 1 ,-1 ,   0   , 1 ,-1, 0, 1 )
var incT=new Array(   0 , 1, 1 , 1 , 0 ,   0   , 0 ,-1,-1,-1 )

var piece=new Image(); piece.src=Piece+'.gif'

var squareSize=piece.width-1, len=moves.length

function put(obj,whT,whL){ obj.style.top=whT; obj.style.left=whL }

function moveObj(){var y, del, c
 for(x=0;x<numP;x++){
  y=whereP[x]
  if(y>=len) y-=len
  c=moves.charAt(y)
  whereTop[x]+=incT[c];whereLeft[x]+=incL[c];
  put(who[x],whereTop[x],whereLeft[x])
 }
 counter+=1;del=delaySmall;if(counter==squareSize){
  counter=0;del=delayBig; for(x=0;x<numP;x++){
   whereP[x]++;if(whereP[x]>=len)whereP[x]-=len
 }}
 Counter+=1; if(Counter!=len*squareSize)window.setTimeout(moveObj,del)
} 

function prepareObj(){var x, u=offTop, v=offLeft, c=0
 whereP=null; whereP=new Array()
 for(x=0;x<len;x++){ put(who[x],-100,-100) }
 numP=0;for(x=0;x<len;x++){
  if(exist[x]){put(who[numP],u,v); whereTop[numP]=u;whereLeft[numP]=v;whereP[numP++]=x}
  c=moves.charAt(x);u+=incT[c]*squareSize;v+=incL[c]*squareSize
}}

function change(x){
 if(first){
  exist[x]=!exist[x];prepareObj()
 } else {
  if(confirm('During and after running, this button resets !')) location=window.location
}}

function go(){
 if(first){
  first=false; counter=0; Counter=0; moveObj();
 } else {
  if(confirm('Tour ended; do I reset ?')) location=window.location
}}

function preObj(){
 for(var x=0;x<len;x++)who[x]=document.images['p'+x.toString()]
 prepareObj()
}

function scrivi(){
   var x, from_to=new Array(), pre=moves.charAt(len-1), wx=offTop, wy=offLeft, result
 for(x=1;x<100;x++){ from_to[x]=new Image(); from_to[x].src=eval("'"+x.toString()+".gif'")}
 document.write('<form>Click on squares to create/destroy pieces; when ready, click ')
 document.write('<button type=button onclick="go()">START</button>  If needed, you can also '+
 'click <button type=button onclick="javscript:location=window.location"> RESET</button></form>')
 for(x=0;x<len;x++){
  post=moves.charAt(x); result=pre+post
  document.write('<a href="javascript:change('+x+')"><img src='+from_to[result].src+' style="position:absolute; z-index:90; top:'+wx+'; left:'+wy+'"></a>')
  wx+=squareSize*incT[post];wy+=squareSize*incL[post];pre=post
 }
 numP=0;for(x=0;x<len;x++){
  if(whereP[numP]==x){exist[x]=true;numP++} else exist[x]=false
  document.write('<img src='+piece.src+' id=p'+x.toString()+
   ' style="position:absolute; left:-100; z-index: 10;">')
}}

scrivi()

