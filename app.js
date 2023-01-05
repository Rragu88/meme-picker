import { catsData } from './data.js';

function highlightCheckedOption(e) {
    const radios = document.getElementsByClassName('radio');
    for (let radio of radios) {
        radio.classList.remove('highlight');
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight');
}

function renderCat() {
    const catObject = getSingleCatObject();
    const memeModalInner = document.getElementById('meme-modal-inner');
    memeModalInner.innerHTML = `<img class="cat-img" src="./images/${catObject.image}"alt="${catObject.alt}" >`;
    const memeModal = document.getElementById('meme-modal');
    memeModal.style.display = 'flex'; 
    const closeBtn = document.getElementById('meme-modal-close-btn');
    closeBtn.addEventListener('click', () => {
        memeModal.style.display = 'none';
    });
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();

    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomIndex]; 
    }
}

function getMatchingCatsArray() {
    const gifOnlyCheckbox = document.querySelector('.gifs-only-option');
    if (document.querySelector('input[type="radio"]:checked')) {
        const isGif = gifOnlyCheckbox.checked;
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
        const matchingCatsArray = catsData.filter((cat) => {
            if (isGif) {
                return cat.isGif && cat.emotionTags.includes(selectedEmotion);
            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }
        });
        return matchingCatsArray;
    }
}

function getEmotionsArray(cats){
    const emotionArr = [];
    for  (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionArr.includes(emotion)) {
                emotionArr.push(emotion);
            }
        }     
    }
    return emotionArr;
}

function renderEmotionsRadios(cats) {
    const emotionRadios = document.getElementById('emotion-radios');
    const getImageBtn = document.querySelector('.get-image-btn');
    
    emotionRadios.addEventListener('change', highlightCheckedOption);
    getImageBtn.addEventListener('click', renderCat);
    let radioItems = ``;
    const emotions = getEmotionsArray(cats);     
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" id="${emotion}" value="${emotion}" name="emotions" >
        </div>`;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);