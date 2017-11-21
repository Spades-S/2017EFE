let displayWrapperEle = document.getElementsByClassName('display-wrapper')[0]
document.getElementsByClassName('input-wrapper')[0].addEventListener(
    'click',
    function (e) {
        let targetID = e.target.id
        let dwInnerHTML = displayWrapperEle.innerHTML
        let inputValue = document.getElementById('user-input').value.trim()
        switch (targetID) {
            case 'left-in':
                if (inputValue) {
                    dwInnerHTML = split2items(inputValue) + dwInnerHTML
                    displayWrapperEle.innerHTML = dwInnerHTML
                }
                break
            case 'right-in':
                if (inputValue) {
                    dwInnerHTML = dwInnerHTML + split2items(inputValue)
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
            case 'search':
                let searchTxt = document.getElementById('search-input').value.trim()
                displayWrapperEle.innerHTML = searchResultDisplay(inputValue, searchTxt)
                break
        }
    }
)

displayWrapperEle.addEventListener('click', function (e) {
    if (e.target.className === 'item') {
        e.target.remove()
    }

})

function split2items(str) {
    let items = str.split(/[\t, \n]/)
    let innerHTML = ''
    items.forEach((value) => {
        if (value) {
            innerHTML += `<div class="item">${value}</div>`
        }
    })
    return innerHTML
}

function searchResultDisplay(str, searchTxt) {
    let items = str.split(/[\t, \n]/)
    let innerHTML = ''
    if(!searchTxt.length){
        return ''
    }
       console.log('search')
    let searchReg = new RegExp(searchTxt, 'g')
    items.forEach((value) => {
        if (value) {
           let newValue =  value.replace(searchReg, function (match) {
                return `<span style="background:#ff0000">${match}</span>`
            })
            innerHTML += `<div class="item">${newValue}</div>`
        }
    })
    return innerHTML

}

