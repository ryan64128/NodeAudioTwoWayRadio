var audioContext;
var source;
var pre;
var myScript;
var play;
var stop;

function init(){
	audioContext = new (window.AudioContext || window.webkitAudioContext);
	source;
	pre = document.querySelector('pre');
	myScript = document.querySelector('script');
	play = document.querySelector('play');
	stop = document.querySelector('stop');

	function getData(){
	 	source = audioContext.createBufferSource();
	 	var request = new XMLHttpRequest();

	 	request.open('GET', 'file_2.wav', true);

	 	request.responseType = 'arraybuffer';

	 	request.onload = function(){
	 		var audioData = request.response;
	 		audioContext.decodeAudioData(audioData, function(buffer){
	 			source.buffer = buffer;
	 			source.connect(audioContext.destination);
	 			source.loop = true;
	 		},
	 		function(e){
	 			console.log("Error decoding audio file: " + e.err);
	 		});
	 	};
	 	request.send();


	};
};

function play(){
	console.log("Playing Stuff");
	getData();
	source.start(0);
	play.setAttribute('disabled');
};

function stop(){
	console.log("Stopping");
	source.stop(0);
	play.removeAttribute('disabled');
};