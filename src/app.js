import Rx from 'rxjs/Rx';


console.log('RxJS Boiler Running...');


function getBtnReady() {
	document.getElementById('btnE').addEventListener('click', function() {
	  console.log('click!');
	})

	let btnO = document.getElementById('btnO');
	Rx.Observable.fromEvent(btnO, 'click')
	  .subscribe(e => {
	    console.log('click~');
	  })
}


function getPipeReady() {
	Rx.Observable.fromEvent(document.getElementById('pipe'), 'click')
	  .map(e => e.target)
	  .subscribe(value => {
	    console.log('click: ', value)
	  })
}


function getCounterReady() {
	let counter = document.getElementById('counter');
	Rx.Observable.fromEvent(counter, 'click')
	  .map(e => 1)
	  .scan((total, now) => total + now)
	  .subscribe(value => {
	    counter.innerText = value;
	  })
}


function getAddSubReady() {
	let counter = document.getElementById('counter2');
	Rx.Observable.fromEvent(document.getElementById('btnA'), 'click')
	  .mapTo(1)
	  .merge(
	    Rx.Observable.fromEvent(document.getElementById('btnS'), 'click')
	      .mapTo(-1)
	  )
	  .scan((total, now) => total + now)
	  .subscribe(value => {
	    counter.innerText = value;
	  })
}


function _withEventListener() {
	var total = 0;
	document.getElementById('btnA').addEventListener('click', () => {
	  total += 1;
	  document.getElementById('counter2').innerText = total;
	})

	document.getElementById('btnS').addEventListener('click', () => {
	  total -= 1;
	  document.getElementById('counter2').innerText = total;
	})
}


function getScaleAddSubReady() {
	let counter = document.getElementById('counter2');
	Rx.Observable.fromEvent(document.getElementById('btnA'), 'click')
	  .mapTo(1)
	  .merge(
	    Rx.Observable.fromEvent(document.getElementById('btnS'), 'click')
	      .mapTo(-1)
	  )
	  .map(num => num * 3)
	  .scan((total, now) => total + now)
	  .subscribe(value => {
	    document.getElementById('counter2').innerText = value;
	  })
}


function getEventCanvasReady() {
	var canvas = document.getElementById('event-canvas');
	var ctx = canvas.getContext('2d');
	ctx.beginPath(); // 開始畫畫

	function draw(e){
		ctx.lineTo(e.offsetX, e.offsetY); // 移到滑鼠在的位置
		ctx.stroke(); // 畫畫
	}

	// 按下去滑鼠才開始偵測 mousemove 事件
	canvas.addEventListener('mousedown', function(e){
		ctx.moveTo(e.offsetX, e.offsetY); // 每次按下的時候必須要先把繪圖的點移到那邊，否則會受上次畫的位置影響
		canvas.addEventListener('mousemove', draw);
	})

	// 放開滑鼠就停止偵測
	canvas.addEventListener('mouseup', function(e){
		canvas.removeEventListener('mousemove', draw);
	})
}


function getCanvas1Ready() {
	var canvas = document.getElementById('canvas1');
	Rx.Observable.fromEvent(canvas, 'mousedown')
		.subscribe(e => {
			console.log('mousedown');
		})
}


function getCanvas2Ready() {
	var canvas = document.getElementById('canvas1');
	Rx.Observable.fromEvent(canvas, 'mousedown')
		.mapTo(
			Rx.Observable.fromEvent(canvas, 'mousemove')
		)
		.subscribe(e => {
			console.log('mousedown&move: ', e);
		})
}


function getCanvas3Ready() {
	var canvas = document.getElementById('canvas3');
	Rx.Observable.fromEvent(canvas, 'mousedown')
		.flatMap(e => Rx.Observable.fromEvent(canvas, 'mousemove'))
		.takeUntil(Rx.Observable.fromEvent(canvas, 'mouseup'))
		.subscribe(e => {
			console.log(e);
		})
}


function getCanvas4Ready() {
	var canvas = document.getElementById('canvas4');
	var ctx = canvas.getContext('2d');
	ctx.beginPath(); // 開始畫畫

	function draw(e){
		ctx.lineTo(e.offsetX, e.offsetY); // 移到滑鼠在的位置
		ctx.stroke(); // 畫畫
	}

	Rx.Observable.fromEvent(canvas, 'mousedown')
		.flatMap(e => Rx.Observable.fromEvent(canvas, 'mousemove')
			.takeUntil(Rx.Observable.fromEvent(canvas, 'mouseup'))
		)
		.subscribe(e => {
			draw(e);
		})
}


function getCanvasFinReady() {
	var canvas = document.getElementById('canvas-fin');
	var ctx = canvas.getContext('2d');
	ctx.beginPath(); // 開始畫畫

	function draw(e){
		ctx.lineTo(e.offsetX, e.offsetY); // 移到滑鼠在的位置
		ctx.stroke(); // 畫畫
	}

	// Rx.Observable.fromEvent(canvas, 'mousedown')
	// 	.subscribe(e => {
	// 		ctx.moveTo(e.offsetX, e.offsetY)
	// 	})

	Rx.Observable.fromEvent(canvas, 'mousedown')
		.do(e => {
			ctx.moveTo(e.offsetX, e.offsetY)
		})
		.flatMap(e => Rx.Observable.fromEvent(canvas, 'mousemove')
			.takeUntil(Rx.Observable.fromEvent(canvas, 'mouseup'))
		)
		.subscribe(e => {
			draw(e);
		})
}


getBtnReady();
getPipeReady();
getCounterReady();
getAddSubReady();
//getScaleAddSubReady();
getEventCanvasReady();
getCanvas2Ready();
getCanvas3Ready();
getCanvas4Ready();
getCanvasFinReady();
