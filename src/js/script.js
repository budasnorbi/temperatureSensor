/*var socket = io();

socket.on('newCelsius',function(data){
	let celsius = data.celsius;
	setCelsius(celsius);
	checkCelsius(celsius);
	//setCelsiusHeight(celsius);
});*/


function setCelsius(celsius){
	let element = document.getElementById('celsius');
	element.textContent = `${celsius}°`;
}


function setCelsiusHeight(celsius){
	let rectangular = document.getElementById('celsius-val');
	let result = (((15 - 95) * 0 + (-1) * (0 - 220) * 15 - (-1) * (0 - 220) * celsius) / (15 - 95));
	return (((Y1 - Y2) * X1 + (-1) * (X1 - X2) * Y1 - (-1) * (X1 - X2) * val) / (Y1 - Y2));
	rectangular.setAttribute('height', result);
	rectangular.setAttribute('y',293 - result);
}


getFilterData();

function getFilterData(){
	let minV = document.getElementById('min-celsius');
	let maxV = document.getElementById('max-celsius');
	let minP = document.getElementById('minV');
	let maxP = document.getElementById('maxV');
	let btn = document.getElementById('setCelsius');



	btn.addEventListener('click',(e)=>{	
		e.preventDefault();
		if(minV.value.length === 0 || maxV.value.length === 0){
			alert('Kérjük ne haggyjon üres mezőket')
			return;
		} else {
			if(Number(minV.value) < Number(maxV.value)){
				minP.textContent = `Hőmérséklet alsóhatár: ${minV.value}°`;
				maxP.textContent = `Hőmérséklet felsőhatár: ${maxV.value}°`;	
			} else {
				alert('A minimum határérték nem lehet a maximummal egyenlő vagy nagyobb.');
				return;
			}
		} 
	});
}


function checkCelsius(celsius){
	let minV = document.getElementById('min-celsius');
	let maxV = document.getElementById('max-celsius');

	var minVn = Number(minV.value);
	var maxVn = Number(maxV.value);
	var celsiusN = Number(celsius);

	if(celsiusN < minVn){
		let notify;

		if(Notification.permission === 'default'){
			alert('Kérlek kapcsold be az értesítéseket');
		} else {
			notify = new Notification('Hőmérséklet riasztás!',{
				body : `Alsó határérték alá esett a hőmérséklet. Beállított határ:${minV.value}°. Jelenlegi hőmérséklet:${celsius}° `,
				icon : '../images/thermometer.png'
			});
		}

	} else if ( celsiusN > maxVn ){
		let notify;

		if(Notification.permission === 'default'){
			alert('Kérlek kapcsold be az értesítéseket');
		} else {
			notify = new Notification('Hőmérséklet riasztás!',{
				body : `Felső határérték fölé ment a hőmérséklet. Beállított határ:${maxV.value}°. Jelenlegi hőmérséklet:${celsius}° `,
				icon : '../images/thermometer.png'
			});
		}

	} 
}


checkPermission();

function checkPermission(){

	var btn = document.getElementById('notify');

	let disabledDiv = document.getElementById('disabled');
	let enabledDiv = document.getElementById('enabled');

	if(window.Notification.permission === 'default'){
		disabled.style.display = 'none';
		enabled.style.display = 'none';

		btn.style.display = 'block';
		getPermission(enabledDiv,disabledDiv);	
	} else if (window.Notification.permission === 'denied'){
		btn.style.display = 'none';
		enabled.style.display = 'none';
	} else if (window.Notification.permission === 'granted'){
		btn.style.display = 'none';
		disabled.style.display = 'none';
	}


}

function getPermission(enabledDiv,DisabledDiv){
	let btn = document.getElementById('notify');
	let btnParent = document.getElementById('Notification');

	btn.addEventListener('click',(e)=>{
	

		if(!window.Notification){
			alert('Sorry, notifications are not supported.')
		} else {
			Notification.requestPermission((p)=>{
				if(p === 'denied'){
					enabledDiv.style.display = 'none';
					disabledDiv.style.display = 'flex';
					btn.style.display = 'none';
				} else if(p === 'granted'){
					enabledDiv.style.display = 'flex';
					disabledDiv.style.display = 'none';
					btn.style.display = 'none';
				}
			})
		}
	})
}