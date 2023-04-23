
// Get the announce button
const announceBtn = document.querySelector('#announce')
// const emotions = [['happy', 'smiling', 'positive'], ['bored'], ['frowning', 'sad', 'negative'], ['angry', 'mad', 'negative']]

let i = 0
// Add click event listener
announceBtn.addEventListener('click', e => {
    emotions[i].forEach(emotion => tts(emotion))
    i += 1
    if (i == emotions.length) {
        i = 0
    }
})

function tts(speechText) {
    var speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = speechText;

    window.speechSynthesis.speak(speech);
}
