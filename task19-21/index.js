/* js实现下拉菜单 */
let navItemEles = document.getElementsByClassName('nav-item')
for (let idx = 1; idx < navItemEles.length; idx++) {
    navItemEles[idx].addEventListener('mouseenter', mouseEnterHandler)
    navItemEles[idx].addEventListener('mouseleave', mouseLeaveHandler)
}

function mouseEnterHandler(event) {
    let target = event.target
    target.firstElementChild.style.cssText = "background-color:#6e6e6e;"
    target.lastElementChild.style.cssText = "display:block;"

}

function mouseLeaveHandler(event) {
    let target = event.target
    target.firstElementChild.style.cssText = "background-color:transparent;"
    target.lastElementChild.style.cssText = "display:none;"
}

/* js 实现下拉菜单 end */


/* tab 切换*/
let tabEle = document.getElementsByClassName('tab-container')[0]
let spanEles = tabEle.getElementsByClassName('tab-item')
let tcEles = tabEle.getElementsByClassName('tc-item')
let tabItmActiveIndex = 1

function tabClickHandler(event) {
    if (event.target.tagName.toLowerCase() === 'span') {
        let clickIndex = event.target.dataset['index']
        if (clickIndex !== tabItmActiveIndex) {
            spanEles[tabItmActiveIndex].className = 'tab-item'
            tcEles[tabItmActiveIndex].className = 'tc-item'
            spanEles[clickIndex].className += ' active'
            tcEles[clickIndex].className += ' active'
            tabItmActiveIndex = clickIndex
        }
    }
}

tabEle.addEventListener('click', tabClickHandler)


/* change select style*/
document.getElementById('form').addEventListener('click', (event) => {
    let parentNode = event.target.parentNode
    let countryInputEle = document.getElementById('country-input')
    let name2index = {
        '中国': 1,
        '美国': 2,
        '英国': 3
    }
    let activeOption = document.getElementsByClassName('options active')
    if (activeOption.length) {
        if (event.target.className !== 'op-item'
            && event.target.className !== 'select-hint') {
            activeOption[0].className = 'options'
        }
    }
    if (parentNode.id === 'country') {
        if (parentNode.lastElementChild.className.includes('active')) {
            parentNode.lastElementChild.className = 'options'
        } else {
            parentNode.lastElementChild.className += ' active'
        }
    } else if (parentNode.id === 'city') {
        let countryInputValue = countryInputEle.dataset['value']
        if (countryInputValue === '') {
            countryInputEle.className += " alarm"
            countryInputEle.focus()
        } else {
            if (parentNode.children[name2index[countryInputValue]].className.includes('active')) {
                parentNode.children[name2index[countryInputValue]].className = 'options'
            } else {
                parentNode.children[name2index[countryInputValue]].className += ' active'
            }
        }
    }
    if (event.target.className === 'op-item') {
        parentNode.parentNode.children[0].innerText = event.target.innerText
        if (name2index[event.target.innerText])
            countryInputEle.dataset['value'] = event.target.innerText
        parentNode.className = 'options'
        countryInputEle.className = 'select-hint'
    }

})







