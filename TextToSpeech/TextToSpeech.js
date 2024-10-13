const text = document.getElementById('textToConvert');
const convertBtn = document.getElementById('convertBtn');
const voiceSelect = document.getElementById('voice');
const speechSynth = window.speechSynthesis;
let voices = [];

//Get the voice list
function getVoiceList() {
  voices = speechSynth.getVoices();
}

speechSynth.onvoiceschanged = getVoiceList;

convertBtn.addEventListener('click', function () {
  const enteredText = text.value;
  const error = document.querySelector('.error-para');

  if (!speechSynth.speaking && !enteredText.trim().length) {
    error.textContent = `Nothing to Convert! Enter text in the text area.`;
    return;
  }

  if (!/^[\x00-\x7F]+$/.test(enteredText)) {
    error.textContent = `Please enter text in English only.`;
    return;
  }

  if (!speechSynth.speaking && enteredText.trim().length) {
    error.textContent = '';
    const newUtter = new SpeechSynthesisUtterance(enteredText);

    const selectedVoice = voiceSelect.value;
    if (selectedVoice === 'Male') {
      newUtter.voice = voices.find(
        (voice) =>
          (newUtter.voice = voices.find(
            (voice) => voice.name === 'Microsoft Mark - English (United States)'
          ))
      );
    } else if (selectedVoice === 'Female') {
      newUtter.voice = voices.find(
        (voice) => voice.name === 'Microsoft Zira - English (United States)'
      );
    }

    speechSynth.speak(newUtter);
    convertBtn.textContent = 'Sound is Playing...';
  }

  setTimeout(() => {
    convertBtn.textContent = 'Play Converted Sound';
  }, 5000);
});
