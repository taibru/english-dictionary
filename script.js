const inputEl = document.getElementById('input');
const infoTextEl = document.getElementById('info-text');
const meaningContEl = document.getElementById('meaning-container');
const titleEl = document.getElementById('title');
const meaningEl = document.getElementById('meaning');
const audioEl = document.getElementById('audio');

async function fetchAPI(word){
  try {
    infoTextEl.style.display = 'block';
    meaningContEl.style.display = 'none';
    infoTextEl.innerHTML = `Searcing the meaning of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res)=>res.json());

    if(result.title){
      meaningContEl.style.display = 'block';
      infoTextEl.style.display = 'none';
      titleEl.innerHTML = word;
      meaningEl.innerHTML = 'N/A'
      audioEl.style.display = 'none';
    }else{
      infoTextEl.style.display = 'none';
      meaningContEl.style.display = 'block';
      audioEl.style.display = 'inline-flex';
      titleEl.innerHTML = result[0].word;
      meaningEl.innerHTML = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerHTML = `an error happened, try again later`;
  }
  
 
}
inputEl.addEventListener('keyup', (e)=>{
  if(e.target.value && e.key === 'Enter'){
    fetchAPI(e.target.value);
  }
});
