/****************人机大战之五子棋手机端 JavaScript Document  Wrote By XuYin,last edit: 20 August, 2016*****************/
/***棋盘大小变量***/
var gridSize=15;
var totalSize=document.getElementById("chess").height;
var gridWidth=totalSize/gridSize;

/***计时框变量***/
var countTime=$("#countTime");
var steps=$("#steps");
var timeMin=$("#min");
var timeSec=$("#sec");
var numOfStep=0;
var timeUsed=0;
var t;
function timeCount(){
	timeUsed++;
	timeSec.html(timeUsed%60);
	timeMin.html(Math.floor(timeUsed/60));
	t=setTimeout("timeCount()",1000);
	}	
/****游戏动态框变量****/
var tipBox=$("#tip"),
	tip=$("#tip p"),
	tipStepNum=1,
	isStarted=0;
	
/*****定义棋盘*****/
var chess=document.getElementById("chess");
var context=chess.getContext("2d");
context.strokeStyle="#bfbfbf";
var chessDiv=document.getElementById("chessDiv");

var gameOver=false;//游戏结束标志
var me=true;//轮流标志

//棋盘每个点--是否已经落子，未落为0
var chessBoard=[];
for(var i=0;i<gridSize;i++){
	chessBoard[i]=[];
	for(var j=0;j<gridSize;j++){
		chessBoard[i][j]=0;
		}
}
	
/****创建棋盘(格线)****/
var drawChessBoard=function(){
	for(var i=1;i<gridSize-1;i++){		
	context.moveTo(i*gridWidth+gridWidth/2,gridWidth/2);
	context.lineTo(i*gridWidth+gridWidth/2,totalSize-gridWidth/2);
	context.stroke();
	context.moveTo(gridWidth/2,i*gridWidth+gridWidth/2);
	context.lineTo(totalSize-gridWidth/2,i*gridWidth+gridWidth/2);
	context.stroke();
	context.strokeStyle="#010101";
	}
	/*oneStep(0,0,true);*/
}

//棋盘水印	
var logo=new Image();
logo.src="image/chessboard.jpg";

/****资源加载完成，画棋盘，检查登录，加载个人信息****/
logo.onload=function(){
	context.drawImage(logo,0,0);
	//chooseSize();
	drawChessBoard();
	alert("移动端人机大战暂未提供登陆及个人中心功能，点击开始对局立即体验游戏吧！");
	$("#startBtn input").click(function(){
		isStarted=1;
		$("#startBtn").hide();
		countTime.show();
		tip.append("<br/>提示：玩家执黑棋，电脑执白棋，请您先落子；")
		timeCount();
		})
}
	
//棋子（落子）
var oneStep=function(i,j,me){
	context.beginPath();
	context.arc(i*gridWidth+gridWidth/2,j*gridWidth+gridWidth/2,gridWidth/2-2,0,2*Math.PI,true);
	context.closePath();
	var grd=context.createRadialGradient(i*gridWidth+gridWidth/2+2,j*gridWidth+gridWidth/2-2,gridWidth/2-5,i*gridWidth+gridWidth/2+2,j*gridWidth+gridWidth/2-2,0);
	if(me){
		grd.addColorStop(0,"#0a0a0a");
		grd.addColorStop(1,"#6e6e6e");
		
		}else{
			grd.addColorStop(0,"#d1d1d1");
			grd.addColorStop(1,"#f9f9f9");
			}
	context.fillStyle=grd;
	context.fill();	
	soundEffect.load();
	soundEffect.play();
	/***落子标识：1为黑子，2为白子，0为默认（空）****/
	if(me){
		chessBoard[i][j]=1;
		}else if(!me){
			chessBoard[i][j]=2;
			}
	/***落子标识，红色三角***/
	$(".triangle").hide();
	lastStep(i*gridWidth+gridWidth/2-7,j*gridWidth+gridWidth/2-9);
}

//上一步落子标志
/*var lastStep=function(i,j,me){
	context.moveTo(i*gridWidth+gridWidth/2,j*gridWidth+gridWidth/2-4);
	context.lineTo(i*gridWidth+gridWidth/2+4,j*gridWidth+gridWidth/2+4);
	context.lineTo(i*gridWidth+gridWidth/2-4,j*gridWidth+gridWidth/2+4);
	context.lineTo(i*gridWidth+gridWidth/2,j*gridWidth+gridWidth/2-4);
	context.lineJoin;
	
	}*/
var index=0;
var lastStep=function(i,j){
	var triangle = document.createElement("canvas");
	triangle.className="triangle";
	triangle.id="triangle"+index++;
	triangle.width = 14;
	triangle.height = 14;
	triangle.style.position = 'absolute';
	triangle.style.left = i + 'px';
	triangle.style.top = j + 'px';
	triangle.style.WebkitTransform = 'translateZ(0)';
	triangle.style.MozTransform = 'translateZ(0)';
	triangle.style.OTransform = 'translateZ(0)';
	triangle.style.msTransform = 'translateZ(0)';
	triangle.style.transform = 'translateZ(0)';
	
	var cxt = triangle.getContext("2d");
		cxt.fillStyle = "fe0000";
		cxt.beginPath();
		cxt.moveTo(7,0);
		cxt.lineTo(14,14);
		cxt.lineTo(0,14);
		cxt.fillStyle="#fe0000";
		cxt.fill();		
	chessDiv.appendChild(triangle);
	}


/************定义一个三维数组用于记录可能达到五子连线的情况，称为赢法数组；******************/
/************每一种赢法上棋子越多则这种赢法越有可能实现，一种赢法上有5颗棋则获胜；************/
/************如果某一种赢法上对方落了一子，则这种方法已不能实现，放弃该种赢法；***************/
/************计算机分为进攻和防守两种策略，给棋盘上所有格点设置权值，每次落于权值最高处********/
/************每个格点在某种赢法上的积分越多，则其权值越大********************************/
//赢法数组（三维数组）
var wins=[];
for(var i=0;i<gridSize;i++){
	wins[i]=[];
	for(var j=0;j<gridSize;j++){
		wins[i][j]=[];
	}
	}
	
var count=0;//赢法数
/*所有的赢法包括：垂直方向，水平方向，45°方向以及135°方向连成一线*/
for(var i=0;i<gridSize;i++){
	for(var j=0;j<gridSize-4;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
			}
	count++;
	}
}
for(var i=0;i<gridSize;i++){
	for(var j=0;j<gridSize-4;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
			}
	count++;
	}
}
for(var i=0;i<gridSize-4;i++){
	for(var j=0;j<gridSize-4;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
			}
	count++;
	}
}
for(var i=0;i<gridSize-4;i++){
	for(var j=gridSize-1;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i+k][j-k][count]=true;
			}
	count++;
	}
}

//某一种赢法的统计数组
var myWin=[];
var computerWin=[];
for(var i=0;i<count;i++){
	myWin[i]=0;
	computerWin[i]=0;
	}

	
//玩家点击落子(黑棋)，此时me应为true
chess.onclick=function(e){
	if(!isStarted){
		return;
		}
	if(gameOver){
		return;
		}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/gridWidth);
	var j=Math.floor(y/gridWidth);
	if(chessBoard[i][j]===0){//检查(i,j)处是否为空
	if(me){
		oneStep(i,j,true);//黑棋（手动）落一子
/*		lastStep(i,j,true);*/
		tip.append("<br/>"+tipStepNum+++"&nbsp;&nbsp;&nbsp;&nbsp;●&nbsp;黑棋落一子："+"("+i+","+j+")；");
		/**chessBoard[i][j]=1;//黑棋落子标识为1**/
		}else{
			return;
			}
		numOfStep++;
		steps.html(numOfStep);
		
	for(var k=0;k<count;k++){
		if(wins[i][j][k]){
			myWin[k]++;//针对第k种赢法，因为玩家已经在(i,j)处落1子，所以该种赢法对于玩家来说胜算增加一点
			computerWin[k]=6;//针对第k种赢法，因为玩家已经在(i,j)处落子，所以该种赢法对于计算机来说已经不可能了，计算机放弃该种赢法
			if(myWin[k]==5){//针对第k种赢法，若玩家胜率已经达到5，则玩家获胜
				tellWin();
				break;
				}
			}
	}				
	if(!gameOver){
		me=!me;//将turn转移到计算机，实施计算机自动落白棋
		computeAI();
		}

	}
}

	
//计算机AI：计算当前棋盘上每个空闲点的权值
var computeAI=function(){
	//权值
var max=0;
var u=0,v=0;
	
	/**分别定义二维数组来标示玩家在该点的胜率和计算机在该点的胜率，对每种赢法累加**/
	var myScore=[];
	var computerScore=[];
	for(var i=0;i<gridSize;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<gridSize;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
			}
		}
		
	/**遍历整个棋盘，对空闲的点逐个计算权值**/	
	for(var i=0;i<gridSize;i++){
		for(var j=0;j<gridSize;j++){
			if(chessBoard[i][j]==0){//判断是否为空闲点
				for(var k=0;k<count;k++){//遍历每一种赢法
					if(wins[i][j][k]){
						if(myWin[k]==1){myScore[i][j]+=200;
							}else if(myWin[k]==2){myScore[i][j]+=400;
								}else if(myWin[k]==3){myScore[i][j]+=2000;
									}else if(myWin[k]==4){myScore[i][j]+=10000;}
						if(computerWin[k]==1){computerScore[i][j]+=220;
							}else if(computerWin[k]==2){computerScore[i][j]+=420;
								}else if(computerWin[k]==3){computerScore[i][j]+=2100;
									}else if(computerWin[k]==4){computerScore[i][j]+=20000;}//如果某种赢法胜率已达到4，那么第五颗必下于此
						}
					}
				if(myScore[i][j]>max){max=myScore[i][j];u=i;v=j;
					}else if(myScore[i][j]==max){
						if(computerScore[i][j]>computerScore[u][v]){u=i;v=j;}
				}
				if(computerScore[i][j]>max){max=computerScore[i][j];u=i;v=j;
					}else if(computerScore[i][j]==max){
						if(myScore[i][j]>myScore[u][v]){u=i;v=j;}
				}
		}
		
	}
	}
		console.log(max+" "+chessBoard[u][v]);
		oneStep(u,v,false);//计算机在所计算出来的(u,v)处落白子
/*		lastStep(u,v,false);*/
		/**chessBoard[u][v]=2;//计算机在(u,v)处落子，标识为2**/
		
		tip.append("<br/>"+tipStepNum+++"&nbsp;&nbsp;&nbsp;&nbsp;○&nbsp;白棋落一子："+"("+u+","+v+")；");
		tipBox.scrollTop(tipBox[0].scrollHeight);
/*		console.log(chessBoard[u][v]+"("+u+","+v+")");*/
		
	
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k]=6;
				if(computerWin[k]==5){
					tellLose();
					}
				}
	}
		if(!gameOver){
		me=!me;
		}		
}

/*********用户赢了**********/
function tellWin(){
	clearTimeout(t);
	isWin=1;//输赢标志置1，表示赢1
	/*times();//发送Ajax请求更新数据库*/
	var r=confirm("哇偶!你赢了耶!耗时"+Math.floor(timeUsed/60)+"分"+timeUsed%60+"秒.\n再来一盘？");
	if (r==true){
		window.location.reload(true);
 	}
	gameOver=true;//结束标志
}

/*********用户输了**********/
function tellLose(){
	clearTimeout(t);
	isWin=-1;//输赢标志置-1，表示输1
	/*times();//发送Ajax请求更新数据库*/
	var r=confirm("啊欧!你输了呀!耗时"+Math.floor(timeUsed/60)+"分"+timeUsed%60+"秒.\n再来一盘？");
	if (r==true){
		window.location.reload(true);
 	}
	gameOver=true;
	return;
}
