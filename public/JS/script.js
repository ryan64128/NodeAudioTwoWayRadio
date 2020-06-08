//--------------------------- Context Variables --------------------------------------------------
var context;
var master;
var canPlay;

//--------------------------- Voice Channel Variables ---------------------------------------------
var source;
var voiceBuffer;
var filter1;
var filter2;
var filter1Gain;
var filter1Volume;
var filter1VolumeInit;
var receptionVolumeInit;

//--------------------------- Helicopter Audio Channel Variables ----------------------------------
var sources = [];
var sourceGains = [];
var volumeSliders = [];
var sourceSliderDisplays = [];
var crossFade;

//--------------------------- File Load Variables -------------------------------------------------
var audioBuffer;
const SOURCE_COUNT = 4;

//--------------------------- Download Variables --------------------------------------------------
var chunks;
var mediaRecorder;
var dest;
var downloading;
var downloadInterval;

//--------------------------- Digital Display Variables -------------------------------------------
var isOnSlider1 = true;
var isOnSlider2 = true;
var isOnSlider3 = true;
var isOnSlider4 = true;
var isOnSlider5 = true;
var isOnSlider6 = true;
var isOnSlider7 = true;
var isOnSlider8 = true;
var isOnSlider9 = true;
var firstDigit = imgNumber0;
var secondDigit = imgNumber0;

//--------------------------- HTML Element Variables ----------------------------------------------
var fileInput = document.getElementById("file1");
var textArea = document.getElementById("fileTextArea");
var slider = document.getElementById("slider1");
var gainSlider = document.getElementById("gainSlider");
var voiceVolumeSlider = document.getElementById("voiceVolumeSlider");
var slider4 = document.getElementById("slider4");
var slider9 = document.getElementById("slider9");
var slider10 = document.getElementById("slider10");
var crossFadeSlider = document.getElementById("crossFadeSlider");
const progressBar = document.getElementsByClassName("progress-bar")[0];
var on1 = document.getElementById("on1");
var off1 = document.getElementById("off1");
var on2 = document.getElementById("on2");
var off2 = document.getElementById("off2");
var on3 = document.getElementById("on3");
var off3 = document.getElementById("off3");
var on4 = document.getElementById("on4");
var off4 = document.getElementById("off4");
var on5 = document.getElementById("on5");
var off5 = document.getElementById("off5");
var on6 = document.getElementById("on6");
var off6 = document.getElementById("off6");
var on7 = document.getElementById("on7");
var off7 = document.getElementById("off7");
var on8 = document.getElementById("on8");
var off8 = document.getElementById("off8");
var on9 = document.getElementById("on9");
var off9 = document.getElementById("off9");
var imgNumber0 = document.getElementById("num0");
var imgNumber1 = document.getElementById("num1");
var imgNumber2 = document.getElementById("num2");
var imgNumber3 = document.getElementById("num3");
var imgNumber4 = document.getElementById("num4");
var imgNumber5 = document.getElementById("num5");
var imgNumber6 = document.getElementById("num6");
var imgNumber7 = document.getElementById("num7");
var imgNumber8 = document.getElementById("num8");
var imgNumber9 = document.getElementById("num9");

crossFade = crossFadeSlider.value / 100;
canPlay = true;

window.addEventListener('touchstart', function(){
	alert("touchstart event");
	if (context){
		var buffer = context.createBuffer(1,1,,22050);
		var source = context.createBufferSource();
		source.buffer = buffer;
		source.connect(context.destination);
		source.noteOn(0);
	}
}, false);

function displayDigitSlider(number){
	if (number === 1){
		convertToImage(((slider1.value / 4000) * 100) - 1);
	}
	else if (number === 2){
		convertToImage(((slider4.value / 10000) * 100) - 1);
	}
	else if (number === 3){
		convertToImage(((gainSlider.value / 40) * 100) - 1);
	}
	else if (number === 4){
		convertToImage(crossFadeSlider.value);
	}
	else if (number === 5){
		convertToImage(voiceVolumeSlider.value);
	}
	else if (number === 6){
		convertToImage(volumeSlider0.value);
	}
	else if (number === 7){
		convertToImage(volumeSlider1.value);
	}
	else if (number === 8){
		convertToImage(volumeSlider2.value);
	}
	else if (number === 9){
		convertToImage(volumeSlider3.value);
	}
	document.getElementById("sliderFirstDigit" + number).src = firstDigit.src;
	document.getElementById("sliderSecondDigit" + number).src = secondDigit.src;
}

function convertToImage(n){
	if (n < 0){
		n = 0;
	}
	n = Math.floor(n);
	switch (n % 10){
		case 0:
			firstDigit = imgNumber0;
			break;
		case 1:
			firstDigit = imgNumber1;
			break;
		case 2:
			firstDigit = imgNumber2;
			break;
		case 3:
			firstDigit = imgNumber3;
			break;
		case 4:
			firstDigit = imgNumber4;
			break;
		case 5:
			firstDigit = imgNumber5;
			break;
		case 6:
			firstDigit = imgNumber6;
			break;
		case 7:
			firstDigit = imgNumber7;
			break;
		case 8:
			firstDigit = imgNumber8;
			break;
		case 9:
			firstDigit = imgNumber9;
			break;
		default:
	}
	switch (Math.floor(n/10)){
		case 0:
			secondDigit = imgNumber0;
			break;
		case 1:
			secondDigit = imgNumber1;
			break;
		case 2:
			secondDigit = imgNumber2;
			break;
		case 3:
			secondDigit = imgNumber3;
			break;
		case 4:
			secondDigit = imgNumber4;
			break;
		case 5:
			secondDigit = imgNumber5;
			break;
		case 6:
			secondDigit = imgNumber6;
			break;
		case 7:
			secondDigit = imgNumber7;
			break;
		case 8:
			secondDigit = imgNumber8;
			break;
		case 9:
			secondDigit = imgNumber9;
			break;
		default:
		
	}
}

function turnOffButton1(){
	if (on1.style.visibility == 'hidden')
	{
		on1.style.visibility ='visible';
		off1.style.visibility = 'hidden';
		isOnSlider1 = true;
		filter1.type = "lowpass";				
	}
	else
	{
		on1.style.visibility ='hidden';
		off1.style.visibility = 'visible';
		isOnSlider1 = false;
		filter1.type = "allpass";			
	}
}

function turnOffButton2(){
	if (on2.style.visibility == 'hidden')
	{
		on2.style.visibility ='visible';
		off2.style.visibility = 'hidden';
		isOnSlider2 = true;
		filter2.type = "highpass";
	}
	else
	{
		on2.style.visibility ='hidden';
		off2.style.visibility = 'visible';
		isOnSlider2 = false;
		filter2.type = "allpass";
	}

}

function turnOffButton3(){
	if (on3.style.visibility == 'hidden')
	{
		on3.style.visibility ='visible';
		off3.style.visibility = 'hidden';
		isOnSlider3 = true;
		filter1Gain.gain.value = gainSlider.value;
	}
	else
	{
		on3.style.visibility ='hidden';
		off3.style.visibility = 'visible';
		isOnSlider3 = false;
		filter1Gain.gain.value = 1.0;
	}
}

function turnOffButton4(){
	if (on4.style.visibility == 'hidden')
	{
		on4.style.visibility ='visible';
		off4.style.visibility = 'hidden';
		isOnSlider4 = true;
		crossFade = 0;
		crossFadeUpdate();
	}
	else
	{
		on4.style.visibility ='hidden';
		off4.style.visibility = 'visible';
		isOnSlider4 = false;
		crossFade = 1.0;
		crossFadeUpdate();
	}
}

function turnOffButton5(){
	if (on5.style.visibility == 'hidden')
	{
		on5.style.visibility ='visible';
		off5.style.visibility = 'hidden';
		isOnSlider5 = true;
		changeSourceVolumes();
	}
	else
	{
		on5.style.visibility ='hidden';
		off5.style.visibility = 'visible';
		isOnSlider5 = false;
		changeSourceVolumes();
	}
}

function turnOffButton6(){
	if (on6.style.visibility == 'hidden')
	{
		on6.style.visibility ='visible';
		off6.style.visibility = 'hidden';
		isOnSlider6 = true;
		sourceGains[0].gain.value = volumeSliders[0].value / 100;
		changeSourceVolumes();
	}
	else
	{
		on6.style.visibility ='hidden';
		off6.style.visibility = 'visible';
		isOnSlider6 = false;
		sourceGains[0].gain.value = 0;
		changeSourceVolumes();
	}
}

function turnOffButton7(){
	if (on7.style.visibility == 'hidden')
	{
		on7.style.visibility ='visible';
		off7.style.visibility = 'hidden';
		isOnSlider7 = true;
		sourceGains[1].gain.value = volumeSliders[1].value / 100;
		changeSourceVolumes();
	}
	else
	{
		on7.style.visibility ='hidden';
		off7.style.visibility = 'visible';
		isOnSlider7 = false;
		sourceGains[1].gain.value = 0;
		changeSourceVolumes();
	}
}

function turnOffButton8(){
	if (on8.style.visibility == 'hidden')
	{
		on8.style.visibility ='visible';
		off8.style.visibility = 'hidden';
		isOnSlider8 = true;
		sourceGains[2].gain.value = volumeSliders[2].value / 100;
		changeSourceVolumes();
	}
	else
	{
		on8.style.visibility ='hidden';
		off8.style.visibility = 'visible';
		isOnSlider8 = false;
		sourceGains[2].gain.value = 0;
		changeSourceVolumes();
	}
}

function turnOffButton9(){
	if (on9.style.visibility == 'hidden')
	{
		on9.style.visibility ='visible';
		off9.style.visibility = 'hidden';
		isOnSlider9 = true;
		sourceGains[3].gain.value = volumeSliders[3].value / 100;
		changeSourceVolumes();
	}
	else
	{
		on9.style.visibility ='hidden';
		off9.style.visibility = 'visible';
		isOnSlider9 = false;
		sourceGains[3].gain.value = 0;
		changeSourceVolumes();
	}
}

function displayDigitSliders(){
	for (var i=1; i<10; i++){
		displayDigitSlider(i);
	}
}

function initializeData(){
	context = new (window.AudioContext || window.webkitAudioContext);
	master = context.createGain();
	master.gain.value = 1.0;
	master.connect(context.destination);
	displayDigitSliders();
	sources[0] = context.createMediaElementSource(document.getElementById("audio1"));
	sources[1] = context.createMediaElementSource(document.getElementById("audio2"));
	sources[2] = context.createMediaElementSource(document.getElementById("audio3"));
	sources[3] = context.createMediaElementSource(document.getElementById("audio4"));
	volumeSliders[0] = document.getElementById("volumeSlider0");
	volumeSliders[1] = document.getElementById("volumeSlider1");
	volumeSliders[2] = document.getElementById("volumeSlider2");
	volumeSliders[3] = document.getElementById("volumeSlider3");
	sourceGains[0] = context.createGain();
	sourceGains[1] = context.createGain();
	sourceGains[2] = context.createGain();
	sourceGains[3] = context.createGain();
	sourceSliderDisplays[0] = document.getElementById("sourceDisplay0");
	sourceSliderDisplays[1] = document.getElementById("sourceDisplay1");
	sourceSliderDisplays[2] = document.getElementById("sourceDisplay2");
	sourceSliderDisplays[3] = document.getElementById("sourceDisplay3");
	sources[0].connect(sourceGains[0]);
	sources[1].connect(sourceGains[1]);
	sources[2].connect(sourceGains[2]);
	sources[3].connect(sourceGains[3]);
	sourceGains[0].connect(master);
	sourceGains[1].connect(master);
	sourceGains[2].connect(master);
	sourceGains[3].connect(master);
	source = context.createMediaElementSource(document.getElementById("voiceAudio"));
	initFilters();
	connectVoiceChain();

}

function loadSources(callback){
	if (isOnSlider6){				
		sourceGains[0].gain.value = volumeSliders[0].value / 100;
	}
	else {
		sourceGains[0].gain.value = 0;
	}
	if (isOnSlider7){				
		sourceGains[1].gain.value = volumeSliders[1].value / 100;
	}
	else {
		sourceGains[1].gain.value = 0;
	}
	if (isOnSlider8){				
		sourceGains[2].gain.value = volumeSliders[2].value / 100;
	}
	else {
		sourceGains[2].gain.value = 0;
	}
	if (isOnSlider9){				
		sourceGains[3].gain.value = volumeSliders[3].value / 100;
	}
	else {
		sourceGains[3].gain.value = 0;
	}
	document.getElementById("audio1").play();
	document.getElementById("audio2").play();
	document.getElementById("audio3").play();
	document.getElementById("audio4").play();
}

function stopSound() {
	document.getElementById("audio1").pause();
	document.getElementById("audio2").pause();
	document.getElementById("audio3").pause();
	document.getElementById("audio4").pause();
	document.getElementById("voiceAudio").pause();
	if (mediaRecorder){
		if (mediaRecorder.state != 'inactive')
		{
			mediaRecorder.stop();
		}
	}
}

function resetSound(){
	document.getElementById("audio1").pause();
	document.getElementById("audio1").currentTime = 0;
	document.getElementById("audio2").pause();
	document.getElementById("audio2").currentTime = 0;
	document.getElementById("audio3").pause();
	document.getElementById("audio3").currentTime = 0;
	document.getElementById("audio4").pause();
	document.getElementById("audio4").currentTime = 0;
	document.getElementById("voiceAudio").pause();
	document.getElementById("voiceAudio").currentTime = 0;
}



function changeSourceVolumes()
{
	for (var i=0; i<SOURCE_COUNT; i++){
		if (sourceGains[i])
			sourceGains[i].gain.value = volumeSliders[i].value / 100;
	}
	if (isOnSlider5){				
		filter1VolumeInit = voiceVolumeSlider.value / 100;
	}
	else {
		filter1VolumeInit = 0;
	}
	if (isOnSlider6){	
		if (sourceGains[0])			
			sourceGains[0].gain.value = volumeSliders[0].value / 100;
	}
	else {
		if (sourceGains[0])							
			sourceGains[0].gain.value = 0;
	}
	if (isOnSlider7){	
		if (sourceGains[1])			
			sourceGains[1].gain.value = volumeSliders[1].value / 100;
	}
	else {
		if (sourceGains[1])
			sourceGains[1].gain.value = 0;
	}
	if (isOnSlider8){	
		if (sourceGains[2])			
			sourceGains[2].gain.value = volumeSliders[2].value / 100;
	}
	else {
		if (sourceGains[2])
			sourceGains[2].gain.value = 0;
	}
	if (isOnSlider9){
		if (sourceGains[3])				
			sourceGains[3].gain.value = volumeSliders[3].value / 100;
	}
	else {
		if (sourceGains[3])
			sourceGains[3].gain.value = 0;
	}
	if (volumeSliders[2])
		receptionVolumeInit = volumeSliders[2].value / 50;
	
	applyCrossFade();
	displayDigitSliders();
}

function changeVoiceFilterFrequency()
{
	displayDigitSliders();
	if (filter1)
		filter1.frequency.value = slider.value;
	if (filter2)
		filter2.frequency.value = slider4.value;
}

function changeVoiceGain(){
	if (isOnSlider3){
		if (filter1Gain)
			filter1Gain.gain.value = gainSlider.value;
	}
	else{
		if (filter1Gain)
			filter1Gain.gain.value = 1.0;
	}
	displayDigitSliders();
}

function initFilters(){
	filter1 = context.createBiquadFilter();
	if (isOnSlider1){
		filter1.type = 'lowpass';
	}
	else{
		filter1.type = 'allpass';
	}
  	filter1.frequency.value = slider.value;

  	filter2 = context.createBiquadFilter();
  	if (isOnSlider2){
		filter2.type = 'highpass';
	}
	else{
		filter2.type = 'allpass';
	}
  	filter2.frequency.value = slider4.value;
  	
  	filter1Gain = context.createGain();
  	if (isOnSlider3){
		filter1Gain.gain.value = gainSlider.value;
	}
	else{
		filter1Gain.gain.value = 1.0;
	}
  	
  	filter1Volume = context.createGain();
  	if (isOnSlider5){				
		filter1VolumeInit = voiceVolumeSlider.value / 100;
	}
	else {
		filter1Volume.gain.value = 0;
	}
}

function connectSourcesToGains(index){
	sources[index].connect(sourceGains[index]);
	sourceGains[index].connect(master);
	
}

function crossFadeUpdate(){
	if (isOnSlider4){
		crossFade = crossFadeSlider.value / 100;
	}
	else{
		crossFade = 0;
	}
	displayDigitSliders();
	changeSourceVolumes();
}

function applyCrossFade(){
	if (filter1)
		filter1Volume.gain.value = filter1VolumeInit * (1 - crossFade);
	if (sourceGains[2])
		sourceGains[2].gain.value = receptionVolumeInit * crossFade;			
}

function playSound() {
	if (canPlay){
		context.resume().then(() => {
			if (context){
				if (context.state == 'closed'){
				  	context = new (window.AudioContext || window.webkitAudioContext);
				}
			}
			loadSources(function(){		// this already creates gains and volume sliders 
			});
	  		if (source){
	  			document.getElementById("voiceAudio").play();
	  		}
	  	});
	}
}

function connectVoiceChain(){
	source.connect(filter1);
  	filter1.connect(filter2);
  	filter2.connect(filter1Gain);
  	filter1Gain.connect(filter1Volume);
  	filter1Volume.connect(master);
}

fileInput.addEventListener('change', function(e) {  
	document.getElementById("voiceAudio").src = this.files[0].name;
  	var reader = new FileReader();
  	reader.onload = function(e) {
    	console.log(this.result);
    	context.decodeAudioData(this.result, function(buffer) {
	    	audioBuffer = buffer;
	    	voiceBuffer = audioBuffer;
	    	console.log(voiceBuffer.duration);
	  	}, function(e) {
	    	console.log('Error decoding file', e);
	  	});
  	};
  	textArea.value = this.files[0].name;
  	reader.readAsArrayBuffer(this.files[0]);
}, false);

function downloadFile(){
	if (context){
		if (context.state == 'closed'){
		  	context = new (window.AudioContext || window.webkitAudioContext);
		}
	}
	resetSound();
	canPlay = false;
	var recorderDest = context.createMediaStreamDestination();
	master.connect(recorderDest);
	master.disconnect(context.destination);
	chunks = [];
	loadSources(function(){
	});
	if (source){
		document.getElementById("voiceAudio").play();
	}
  	progressBar.style.display = "";
	mediaRecorder = new MediaRecorder(recorderDest.stream);
	var downloadButton = document.getElementById("downloadButton");
	mediaRecorder.start();
	var i = 0;
	downloadInterval = setInterval (() => {
		const computedStyle = getComputedStyle(progressBar);
		const width = parseFloat(computedStyle.getPropertyValue('--width')) || 0;
		progressBar.style.setProperty('--width', width + (100/(voiceBuffer.duration*1000)) * 5);
	}, 5);
	downloading = true;
	mediaRecorder.ondataavailable = function(e){
		chunks.push(e.data);
	}
	mediaRecorder.onstop = function(e){
		var blob = new Blob(chunks, {'type' : 'audio/ogg; codecs=opus'});
		var url = URL.createObjectURL(blob);
		var downloadLink;
		if (!document.getElementById("download"))
		{
			downloadLink = document.createElement('a');
			downloadLink.id = "download";
		}
		else{
			downloadLink = document.getElementById("download");
		}
		downloadLink.href = url;
		downloadLink.download = "file1" + ".oga";
		downloadLink.innerHTML = "Download";
		downloadLink.margin = 100;
		progressBar.appendChild(downloadLink);
		clearInterval(downloadInterval);
		progressBar.dataset.label = "Complete";
		downloadLink.click();
		downloadLink.remove();
		setTimeout(function(){
			progressBar.style.display = 'none';
			master.connect(context.destination);
			canPlay = true;
		}, 200);
	}
}

function sendEmail(url){
	var ajax = new XMLHttpRequest();
	ajax.open('GET', url, true);
	ajax.responseType = 'text/html';
	ajax.send(null);
}