
const imgPreview = document.getElementById('img-preview')
// const imageBg = document.getElementById('image-bg')
const testLlist = document.getElementById('test-list')
const fillClick = document.getElementById('fill-li')
const containClick = document.getElementById('contain-li')
const coverClick = document.getElementById('cover-li')
const noneClick = document.getElementById('none-li')
const scaleDownClick = document.getElementById('scale-down-li')

const randColors = ['#28FCAC','#B9B4EA','#FFADAB','#3EBC82','#6DD87F','#4EDBB4','#F7A644','#6167B3','#5ED3EF']

function randColorGen(){
    let randNum = Math.floor(Math.random() * 9)
    randNum = Number(randNum)
    // imageBg.style.border = `5px dashed ${randColors[randNum]}`
    // testLlist.style.backgroundColor = randColors[randNum]
    imgPreview.style.border = `6px solid ${randColors[randNum]}`
}

fillClick.onclick = ()=>{
    imgPreview.style.objectFit = fillClick.textContent.toLowerCase()
    randColorGen()
}

containClick.onclick = ()=>{
    imgPreview.style.objectFit = containClick.textContent.toLowerCase()
}

coverClick.onclick = ()=>{
    imgPreview.style.objectFit = coverClick.textContent.toLowerCase()
}

noneClick.onclick = ()=>{
    imgPreview.style.objectFit = noneClick.textContent.toLowerCase()
}

scaleDownClick.onclick = ()=>{
    imgPreview.style.objectFit = scaleDownClick.textContent.toLowerCase()

}
