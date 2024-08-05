var songrun=false;
var count=1;
var mod=1;
var happyfold = "C:\\Users\\lenovo\\music_recom\\emotion-based-music-player\\web\\songs\\happy";
var sadfold = "C:\\Users\\lenovo\\music_recom\\emotion-based-music-player\\web\\songs\\sad";
var angryfold = "C:\\Users\\lenovo\\music_recom\\emotion-based-music-player\\web\\songs\\angry";
var neutralfold = "C:\\Users\\lenovo\\music_recom\\emotion-based-music-player\\web\\songs\\neutral";
var img_fold= "images\\\\";

var h=new Array();
var s=new Array();
var a=new Array();
var n=new Array();

var dict = [h,s,a,n];
	
var happylist =document.getElementById('happylist');
var sadlist = document.getElementById('sadlist');
var angrylist = document.getElementById('angrylist');
var neutrallist = document.getElementById('neutrallist');
// console.log(happylist,sadlist,angrylist,neutrallist);
var sd=0;
var recent=new Array(10);

async function getfiles(ll,fold,ul){
	var l= dict[ll];
	console.log(l,typeof(l));
	await eel.fileextract(fold)(function(result){

		console.log(result);
		for (var i = 0; i<result.length; i++) {
			sd =sd+1;
			l.push(new Array(2));
			l[i][0]=img_fold+result[i].slice(0,result[i].length-4)+".png"; //song icon
			console.log(l[i][0]);
			l[i][1]=result[i]; //song name
			var ins=document.createElement("div");
			ins.id='b'+i+ll;
			
			ins.setAttribute("class", "song");
			ul.appendChild(ins);
			document.getElementById('b'+i+ll).innerHTML='<div id="pic" style=\'background-image: url(\"'+l[i][0]+'\");\'> </div><p>'+l[i][1].slice(0,l[i][1].length-4)+'</p> <input type="button" id="'+"a"+i+ll+'" class="play" > <input type="button" id="'+"c"+i+ll+'" class="add">';
			document.getElementById('a'+i+ll).onclick=function(){
				play(this);
			};
			document.getElementById('c'+i+ll).onclick=function(){
				addq(this);
			};	
	    }
		console.log(l);
    });
}


getfiles(2,angryfold,angrylist);
getfiles(3,neutralfold,neutrallist);
getfiles(1,sadfold,sadlist);
getfiles(0,happyfold,happylist);

console.log(happyfold);

function setmod(elem){
	mod=elem.value;
	if(!songrun){
		if(mod==2)
			getTime();
		if(mod==3)
			rand_play();
	}
}

var song_fold={0:'./songs/happy/',1:'./songs/sad/',2:'./songs/angry/',3:'./songs/neutral/'};
var emojis={0:'/2.png', 1:'/3.png', 2:'/1.png', 3:'/4.png'};
var rindex=0; //recently played index

function addrecent(x,y,z){
	var l=document.createElement("p");
	l.id="p"+x+y;
	l.name=x+y;
	l.innerHTML=z.slice(0,z.length-4)+"<br>";
	
	document.getElementById("recentp").appendChild(l);	
	// l.onclick(function(){console.log("recent is clicked");});
	// l.onclick(play(l));
	document.getElementById('p'+x+y).onclick=function(){
		play(this);
	};	
}


function play(elem){
	console.log(elem,elem.id);
	
	var x=elem.id.charAt(1);
	var y=elem.id.charAt(2);
	var z=dict[y][x][1];
	console.log(z,y);
	document.getElementById("sname").innerHTML=z.slice(0,z.length-4);
	document.getElementById("sel").src= song_fold[y]+z;
	document.getElementById("main_slider").load();
	document.getElementById("main_slider").play();
	document.getElementById("emoji").style.backgroundImage="url('"+emojis[y]+"')";
	songrun=true;
	addrecent(x,y,z);
}

var eqc=1;
var sqc=1;

var bool=[];
for(var i=0; i<sd.length; i++)
	bool[i]=false;

function addq(elem){
	console.log(elem.id);
	var x=elem.id.charAt(1);
	var y=elem.id.charAt(2);
	var z=dict[y][x][1];  //song.mp3
	if(!songrun){
		// var z=songs[x][0];
		document.getElementById("sname").innerHTML=z.slice(0,z.length-4);
		document.getElementById("sel").src= song_fold[y]+z;
		document.getElementById("main_slider").load();
		document.getElementById("main_slider").play();
		document.getElementById("emoji").style.backgroundImage="url('"+emojis[y]+"')";
		songrun=true;
		addrecent(x,y,z);
		return;
	}
	if(bool[x]==true)
		return;
	
	bool[x]=true;
	var l=document.createElement("p");
	l.id="e"+eqc;
	l.name=x+y;
	l.innerHTML=z.slice(0,z.length-4)+"<br>";
	document.getElementById("queue").appendChild(l);
	eqc=eqc+1;
}

function nextsong(){
	if(sqc==eqc){
				alert("Queue is empty.");
				return;
		}
		var elem=document.getElementById("e"+sqc);
			var xa=elem.name.charAt(0);
			var ya=elem.name.charAt(1);
			var z=dict[ya][xa][1]
			var pa=song_fold[ya]+z;
			bool[xa]=false;
			document.getElementById("sname").innerHTML=z.slice(0,z.length-4);
			document.getElementById("sel").src= pa;
			document.getElementById("main_slider").load();
			document.getElementById("main_slider").play();
			document.getElementById("emoji").style.backgroundImage="url('"+emojis[ya]+"')";
			songrun=true;
			addrecent(x,y,z);

			// createClock= setInterval(displayTime, 100);
			document.getElementById("queue").removeChild(elem);	
			sqc=sqc+1;

}

function next_in_Q(){
	songrun=false;
	if(sqc==eqc){
		alert("Queue is empty.");
		return;
	}
	var elem=document.getElementById("e"+sqc);
	var xa=elem.name.charAt(0);
	var ya=elem.name.charAt(1);
	var z=dict[ya][xa][1];
	var pa=song_fold[ya]+z;
	document.getElementById("sname").innerHTML=z.slice(0,z.length-4);
	document.getElementById("sel").src= pa;
	document.getElementById("main_slider").load();
	document.getElementById("main_slider").play();
	document.getElementById("emoji").style.backgroundImage="url('"+emojis[ya]+"')";
	songrun=true;
	addrecent(x,y,z);
	// createClock= setInterval(displayTime, 100);

	document.getElementById("queue").removeChild(elem);	
	sqc=sqc+1;
}
function rand_play(){
		var index=Math.floor(Math.random()*4); //num b/w 0,4; 0-->h,1-->s
		var index2=Math.floor(Math.random()*dict[index].length);
		// index=parseInt(index);
		var zsong= dict[index][index2][1];
		var pa=song_fold[index]+zsong;
		document.getElementById("sname").innerHTML= zsong.slice(0,zsong.length-4);
		document.getElementById("sel").src= pa;
		document.getElementById("main_slider").load();
		document.getElementById("main_slider").play();
		document.getElementById("emoji").style.backgroundImage="url('"+emojis[index]+"')";
		songrun=true;
		console.log(zsong);
		addrecent(index2,index,zsong);
		// createClock= setInterval(displayTime, 100);
	
}

function moody(index){
		var index2=Math.floor(Math.random()*dict[index].length);
		var zsong= dict[index][index2][1];
		var pa=song_fold[index]+zsong;
		document.getElementById("sname").innerHTML=zsong.slice(0,zsong.length-4);;
		document.getElementById("sel").src= pa;
		document.getElementById("main_slider").load();
		document.getElementById("main_slider").play();
		document.getElementById("emoji").style.backgroundImage="url('"+emojis[index]+"')";
		songrun=true;
		addrecent(x,y,z);
		// createClock= setInterval(displayTime, 100);
}
async function getTime() {
	let value = await eel.getEmotion()();
	if(value=="angry")
		moody(2);
	else if(value=="happy")
		moody(0);
	else if(value=="sad")
		moody(1);
	else
		moody(3);
}
