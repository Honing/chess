// JavaScript Document
//人机大战之五子棋
var chess=document.getElementById("chess");
var context=chess.getContext("2d");
context.strokeStyle="#bfbfbf";
//游戏结束标志
var gameOver=false;
//轮流标志
var me=true;

//棋盘每个点--是否已经落子
var chessBoard=[];
for(var i=0;i<15;i++){
	chessBoard[i]=[];
	for(var j=0;j<15;j++){
		chessBoard[i][j]=0;
		}
}
//权值
var max=0;
var u=0,v=0;
	
//创建棋盘
var drawChessBoard=function(){
	for(var i=0;i<15;i++){
	context.moveTo(i*30+15,15);
	context.lineTo(i*30+15,435);
	context.stroke();
	context.moveTo(15,i*30+15);
	context.lineTo(435,i*30+15);
	context.stroke();
	}
	/*oneStep(0,0,true);*/
	
}
	
//棋盘水印	
var logo=new Image();
logo.src="image/logo.png";
logo.onload=function(){
	context.drawImage(logo,0,0);
	drawChessBoard();	
}
	
//棋子（落子）
var oneStep=function(i,j,me){
	context.beginPath();
	context.arc(i*30+15,j*30+15,13,0,2*Math.PI,true);
	context.closePath();
	var grd=context.createRadialGradient(i*30+15+2,j*30+15-2,10,i*30+15+2,j*30+15-2,0);
	if(me){
		grd.addColorStop(0,"#0a0a0a");
		grd.addColorStop(1,"#6e6e6e");
		
		}else{
			grd.addColorStop(0,"#d1d1d1");
			grd.addColorStop(1,"#f9f9f9");
			}
	context.fillStyle=grd;
	context.fill();	
}

//赢法数组
var wins=[];
for(var i=0;i<15;i++){
	wins[i]=[];
	for(var j=0;j<15;j++){
		wins[i][j]=[];
	}
	}
	
var count=0;//赢法数
/*所有的赢法包括：垂直方向，水平方向，45°方向以及135°方向连成一线*/
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i][j+k][count]=true;
			}
	count++;
	}
}
for(var i=0;i<15;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[j+k][i][count]=true;
			}
	count++;
	}
}
for(var i=0;i<11;i++){
	for(var j=0;j<11;j++){
		for(var k=0;k<5;k++){
			wins[i+k][j+k][count]=true;
			}
	count++;
	}
}
for(var i=0;i<11;i++){
	for(var j=14;j>3;j--){
		for(var k=0;k<5;k++){
			wins[i][j-k][count]=true;
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
	if(gameOver){
		return;
		}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);
	var j=Math.floor(y/30);
	if(chessBoard[i][j]==0){//检查(i,j)处是否为空
	oneStep(i,j,me);
	/*if(me){*/
		chessBoard[i][j]=1;//黑棋落子标识为1
		/*}else{
			chessBoard[i][j]=2;//白棋落子标识为2
			}*/
	for(var k=0;k<count;k++){
		if(wins[i][j][k]){
			myWin[k]++;//针对第k种赢法，因为玩家已经在(i,j)处落1子，所以该种赢法对于玩家来说胜算增加一点
			computerWin[k]=-1;//针对第k种赢法，因为玩家已经在(i,j)处落子，所以该种赢法对于计算机来说已经不可能了，计算机放弃该种赢法
			if(myWin[k]==5){//针对第k种赢法，若玩家胜率已经达到5，则玩家获胜
				window.alert("Congragutions!You win!");
				gameOver=true;
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
	var myScore=[];//分别定义二维数组来标示玩家在改点的胜利因数和计算机在改点的胜利因数，因数针对每种赢法累加
	var computerScore=[];
	for(var i=0;i<15;i++){
		myScore[i]=[];
		computerScore[i]=[];
		for(var j=0;j<15;j++){
			myScore[i][j]=0;
			computerScore[i][j]=0;
			}
		}
		
	//遍历整个棋盘，对空闲的点逐个计算权值	
	for(var i=0;i<15;i++){
		for(var j=0;j<15;j++){
			if(chessBoard[i][j]==0){//判断是否为空闲点
				for(var k=0;k<count;k++){//遍历每一种赢法
					if(wins[i][j][k]){
						if(myWin[k]==1){
							myScore[i][j]+=200;
							}else if(myWin[k]==2){
								myScore[i][j]+=400;
								}else if(myWin[k]==3){
									myScore[i][j]+=2000;
									}else if(myWin[k]==4){
									myScore[i][j]+=10000;
									}
						if(computerWin[k]==1){
							computerScore[i][j]+=220;
							}else if(computerWin[k]==2){
								computerScore[i][j]+=420;
								}else if(computerWin[k]==3){
									computerScore[i][j]+=2100;
									}else if(computerWin[k]==4){
									computerScore[i][j]+=20000;
									}
						}
					}
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;v=j;
				}else if(myScore[i][j]==max){
						if(computerScore[i][j]>max){
					max=computerScore[i][j];
					u=i;v=j;
				}
			}
			if(computerScore[i][j]>max){
				max=computerScore[i][j];
				u=i;v=j;
			}else if(computerScore[i][j]==max){
				if(myScore[i][j]>max){
					max=myScore[i][j];
					u=i;v=j;
				}
			}
		}
	}
	}
	oneStep(u,v,false);//计算机在所计算出来的(u,v)处落白子
	chessBoard[u][v]=2;//计算机在(u,v)处落子，标识为2
	for(var k=0;k<count;k++){
		if(wins[u][v][k]){
				computerWin[k]++;
				myWin[k]=-1;
				if(computerWin[k]==5){
					window.alert("You lose!Try again!");
					gameOver=true;
					}
				}
	}
		if(!gameOver){
		me=!me;
		}
		
}