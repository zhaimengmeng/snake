window.onload=function(){
	var ROWS=20,
	width=Math.floor(600-ROWS)/ROWS+'px',
	dashe=document.getElementById('dashe');

	for(var i=0;i<ROWS;i++){
			for(j=0;j<ROWS;j++){
				var block=document.createElement('div');
				block.setAttribute('class','block');
				block.setAttribute('id',i+'__'+j);
				block.style.width=width;
				block.style.height=width;
				dashe.appendChild(block);
			}
		};

	
	 snack=[{x:0,y:1},{x:0,y:2},{x:0,y:3}],
	 MAXSNACK=100,RIGHT=39,
	 LEFT=37,DOWN=40,UP=38,defaultDiretion=RIGHT,
	 isInSnack=function(x,y){
		for(var i=0;i<snack.length;i++){
			if(snack[i].x==x&&snack[i].y==y){return true;}
			}
			return false;
		},
	random=function(){
		return Math.floor(Math.random()*ROWS);
	},
	 dropFood=function(){
		var x=random(),y=random();
		if(snack.length==MAXSNACK){return null;}
		while(isInSnack(x,y)){
			x=random();
			y=random();
		}
		document.getElementById(x+'__'+y).style.background='url(./img/60.jpg)';
		return{foodx:x,foody:y};
	},
	food=dropFood();
	(function(){
		for(var i=0;i<snack.length;i++){
			document.getElementById(snack[i].x+'__'+snack[i].y).style.background='green';
		}

	})();
	var zou=function(dir){
		var last=snack.length-1,newHead,weiba;
		if(defaultDiretion==RIGHT){newHead={x:snack[last].x,y:snack[last].y+1};}
		if(defaultDiretion==LEFT){newHead={x:snack[last].x,y:snack[last].y-1};}
		if(defaultDiretion==DOWN){newHead={x:snack[last].x+1,y:snack[last].y};}
		if(defaultDiretion==UP){newHead={x:snack[last].x-1,y:snack[last].y};}
		if( newHead.x >(ROWS-1)|| newHead.x <0 || newHead.y>(ROWS-1) || newHead.y <0){
			game.style.display='block';
			return null;
		}
		if(isInSnack(newHead.x,newHead.y)){
			 game.style.display='block';
			return null;
	}
		snack.push(newHead);
		if(newHead.x==food.foodx&&newHead.y==food.foody){
			var tmp=document.getElementById(food.foodx+'__'+food.foody);
			tmp.style.background='green';
			food=dropFood();
			return null;
		}
		var weiba=snack.shift();
		var t=document.getElementById(weiba.x+'__'+weiba.y);
		t.style.backgroundColor='rgba(255, 255, 255, 0.5)';
		var h=document.getElementById(newHead.x+'__'+newHead.y);
		h.style.background='green';
		return null;

	};


	document.onkeydown=function(e){
		var direction=e.keyCode;
		if( (direction==LEFT||
			direction==UP||
			direction==RIGHT||
			direction==DOWN
			)&&
			Math.abs(direction-defaultDiretion)!==2){
			defaultDiretion=direction;
			}
			
		};
		start.onclick=function(){
			var timerId=setInterval(zou,500);
			picture.style.display='none';
			start.style.display='none';
			dashe.style.display='block';
			banner.style.display='block';
		}
		game.onclick=function(){
			location.reload();
		}	
	};
	

