let displayWrapperEle = document.getElementsByClassName('display-wrapper')[0]
document.getElementsByClassName('input-wrapper')[0].addEventListener(
    'click',
    function (e) {
        let targetID = e.target.id
        let dwInnerHTML = displayWrapperEle.innerHTML
        let inputValue = document.getElementById('num-input').value.trim()
        switch (targetID) {
            case 'left-in':
                if (inputValue) {
                    dwInnerHTML = `<div class="item">${inputValue}</div>` + dwInnerHTML
                    displayWrapperEle.innerHTML = dwInnerHTML
                }
                break
            case 'right-in':
                if (inputValue) {
                    dwInnerHTML = dwInnerHTML + `<div class="item">${inputValue}</div>`
                    displayWrapperEle.innerHTML = dwInnerHTML
                }
                break
            case 'left-out':
                let firstEle = displayWrapperEle.firstElementChild
                if (firstEle) {
                    firstEle.remove()
                    alert(firstEle.innerText)
                }

                break
            case 'right-out':
                let lastEle = displayWrapperEle.lastElementChild
                if (lastEle) {
                    lastEle.remove()
                    alert(lastEle.innerText)
                }
                break
        }
    }
)

displayWrapperEle.addEventListener('click', function (e) {
    if(e.target.className === 'item'){
        e.target.remove()
    }

})

