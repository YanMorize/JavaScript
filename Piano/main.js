
// get all keys

const keys = document.querySelectorAll('.key')


// play notes
// function playNotes(event){

function playNote(event){
	console.log(event)

	let audioKeyCode = getKeyNote(event)
	
	const key = document.querySelector(`[data-key="${audioKeyCode}"]`)
	// if key exists
	const isKeyExist = !key
	if (isKeyExist) {
		return;
	}

	// play audio

	const audio = document.querySelector(`audio[data-key="${audioKeyCode}"]`)
	audio.currentTime = 0
	audio.play()
}

function getKeyNote(event){	
	let keycode

	const isKeyboard = event.type === 'keydown'

	if (isKeyboard) {
		keycode = event.keyCode
	}else{
		keycode = event.target.dataset.key
	}

	return keycode;

}	

// click with mouse
keys.forEach(function(){
	window.addEventListener("click", playNote)

})

// keyboard

window.addEventListener("keydown", playNote)