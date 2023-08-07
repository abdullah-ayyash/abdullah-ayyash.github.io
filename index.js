
const myName = document.getElementById('my-name');
const logoImg = document.getElementById('logo-img');





    // Get the first letter of the heading text
    const nameList = ['A', 'b', 'd', 'u', 'l', 'l', 'a', 'h', ' ', 'A', 'y', 'y', 'a', 's', 'h']

    let timeId = setInterval(frame, 200);
    let index = 0;


    function frame() {
        if (index < nameList.length) {
            myName.textContent += nameList[index];
            index++;
        }


        if (index === nameList.length) {
            clearInterval(timeId);
            clearInterval(timeId2);
            myName.style.borderRight = '';
        }

    }

    let timeId2 = setInterval(typingEff, 200);

    function typingEff() {
        let borderVal = myName.style.borderRight;
        if (borderVal === '3px solid springgreen') {
            myName.style.borderRight = '';
        }
        else {
            myName.style.borderRight = '3px solid springgreen';
        }
    }







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


