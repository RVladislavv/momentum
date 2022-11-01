"use strict";

//подключение файла
import playList from './playList.js';


//тут в будущем код языка размещу=
let lang = 'en';


//Время
//получаем со страницы раздел времени

function showTime() {
    const time = document.querySelector('.time');
    //Получить текущие дату и время
    const date = new Date();
    //Чтобы из строки с датой и временем получить только время
    const currentTime = date.toLocaleTimeString();
    //вывод текста в разделе времени
    time.textContent = currentTime;
    //обновление каждую секунду
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
    
}
showTime();

//Дата - вызывается внутри функции Время

function showDate() {
    const data = document.querySelector('.date');
    const date = new Date();
    //формат отображения
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    //язык отображения даты, например 'ru-RU', 'en-US', 'en-Br' 
    const currentDate = date.toLocaleDateString('en-US', options);
    data.textContent = currentDate;
}   

//Приветствие
//F получения времени суток
function getTimeOfDay() {
    let res = '';
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 6 && hours < 12) {
        res = 'morning';
    }
    if (hours >= 12 && hours < 18) {
        res = 'afternoon';
    }
    if (hours >= 18 && hours < 24) {
        res = 'evening';
    }
    if (hours >= 0 && hours < 6) {
        res = 'night';
    }
    return res;

}
//вывод приветствия

function showGreeting() {
    const greeting = document.querySelector('.greeting');
    //получаем количество часов
    let partOfDay = getTimeOfDay();
    let timeG = `Good ${partOfDay}`;
    
    greeting.textContent = timeG;
}

//Имя пользователя
//перед перезагрузкой или закрытием страницы (событие beforeunload) данные нужно сохранить
function setLocalStorage() {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage)

//перед загрузкой страницы (событие load) данные нужно восстановить и отобразить 
function getLocalStorage() {
    const name = document.querySelector('.name');
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage)


//Слайдер изображений
//рандомное целое число от 1 до 20 включительно
function getRandomNum(max) {
    return Math.floor(Math.random() * max + 1);
}
//установка бекграунда
let randomNum = getRandomNum(20);
function setBg() {
    //это строка для плавной загрузки фона создаём изображение
    const img = new Image();
    const body = document.querySelector('.body');
    //показывает какая часть суток(morning, afternoon, evening, night)
    let timeOfDay = getTimeOfDay();
    //приведение цифр к формату двухзначных, если однозначное - добавляет ноль слева
    let bgNum = randomNum.toString().padStart(2, "0");
    //let path = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
    //
    let path = `https://raw.githubusercontent.com/RVladislavv/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.src = path;
    //будет фоном только после полной загрузки
    img.onload = () => {      
        body.style.backgroundImage = `url(${path})`;
    }; 
    //body.style.backgroundImage = path;
}
setBg()
//переключение бекграунда по стрелкам
function getSlideNext() {
    randomNum++;
    if(randomNum == 21) {
        randomNum = 1;
    }
    setBg()
}
const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);
function getSlidePrev() {
    randomNum--;
    if(randomNum == 0) {
        randomNum = 20;
    }
    setBg()
}
const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);


//виджет погоды
const city = document.querySelector('.city');
city.value = 'Minsk';
async function getWeather() { 
    let APIkey = '1fc4ff412511b041916e5e59e45beed2';
    let units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=${APIkey}&units=${units}`;
    const res = await fetch(url);
    const data = await res.json(); 
    
    if(data.cod == 200 && typeof(city.value) == 'string') {
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        let temRound = Math.round(data.main.temp);
        temperature.textContent = `${temRound}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    } else if(city.value == '') {
        weatherIcon.style.display = 'none';
        temperature.textContent = `'Empty string'`;
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
    } else {
        weatherIcon.style.display = 'none';
        temperature.textContent = `Error! city not found for '${city.value}'`;
        weatherDescription.textContent = '';
        wind.textContent = ``;
        humidity.textContent = ``;
    }
}
getWeather();
city.addEventListener('change', getWeather);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');




//цитата дня
//думаю, при смене языка - можно тупо взять и использовать другой data.json файл, для русских цитат один, для английских другой
//получаем через селектор кнопку изменения цитаты, раздел цитат, автора
const quoteBtn = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


async function getQuotes() {  
    const quotes = 'dataen.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    //напишем код для рандомного вывода цитаты + при нажатии на кнопку он так же рандомно будет выводить её

    let quoteRandom = getRandomNum(data.length) - 1;
    quote.textContent = data[quoteRandom]['text'];
    author.textContent = data[quoteRandom]['author'];

  }

getQuotes();
quoteBtn.addEventListener('click', getQuotes);

//аудиоплеер
//кнопка плея и паузы(2в1), а так же кнопки назад и вперёд
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

//флаг работы плеера - по дефолту false - не работает
let isPlay = false;

//создаём плеер
const audio = new Audio();

//счётчик трека
let playNum = 0;


audio.src = playList[playNum].src;
function playAudio() {
    if(!isPlay) {
        audio.src = playList[playNum].src;
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        playBtn.classList.toggle('pause');

    } else {
        audio.pause();
        isPlay = false;
        playBtn.classList.toggle('pause');
    }
    
}

//плей и пауза кнопка - нажатие
playBtn.addEventListener('click', playAudio);




function playNext() {
    playNum++;
    if(playNum > 3) {
        playNum = 0;
    }
    playAudio();
}

function playPrev() {
    playNum--;
    if(playNum < 0) {
        playNum = 3;
    }
    playAudio();
}
//немного доделать функцию, чтоб сразу воспроизводилось при переключении
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

//список композиций 


const playListContainer = document.querySelector('.play-list');

/*for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = element['title'];
    playListContainer.append(li);
}*/
playList.forEach(element => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = element['title'];
    playListContainer.append(li);
});