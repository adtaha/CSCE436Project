
// Get the announce button
const announceBtn = document.querySelector('#announce')

// Add click event listener
announceBtn.addEventListener('click', e => {
    const emotions = ['happy', 'smiling', 'positive']
    emotions.forEach(emotion => tts(emotion))
})



function tts(speechText) {
    var speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = speechText;
  
    window.speechSynthesis.speak(speech);
}


