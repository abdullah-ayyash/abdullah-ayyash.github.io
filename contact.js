const logoImg = document.getElementById('logo-img');

let menuAniTime = setInterval(menuAni,50);
const listItems = document.getElementsByClassName('list-items');
let count = -70;
function menuAni(){
    if(count < 0){
        count +=6;
        for(let i = 0; i < listItems.length; i++){
            listItems[i].style.top = count + 'px'
        }
    }
    else{
        clearInterval(menuAniTime);
    }
}

let timeId3 = setInterval(rotateImg, 20);

let deg = 0;
function rotateImg() {
    if (deg > 360) {
        clearInterval(timeId3);
    }
    else {
        logoImg.style.rotate = deg + "deg"
        deg += 2;
    }

}


// Only contact page
let timeId4 = setInterval(contactStat, 150);
let contactHeading = document.getElementById('contact-h1');
let val = 0;
function contactStat() {
    if (val < 1) {
        contactHeading.style.opacity = `${val}`
        val += 0.1;
    }
    else {

        clearInterval(timeId4);
    }
}


const showSucess = () => {
    const fnVal = document.getElementsByClassName('inputs-field')
    if (fnVal[0].value) {
        document.getElementById('sucessMessage').style.display = 'block';
        scrollTo(0, document.body.scrollHeight);
    }
    fnVal[0].value = '';
    fnVal[1].value = '';
    fnVal[2].value = '';
    fnVal[3].value = '';


}


const sendBtn = document.getElementById('send-btn');
sendBtn.onclick = showSucess;