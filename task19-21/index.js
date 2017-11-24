/**
 * @file 实现tab效果、下拉菜单的联动效果
 * @author Spades(spadesge@gmail.com)
 */


// FIXME js 实现下拉菜单，建议不适用js。使用css实现
// const navItemEles = document.getElementsByClassName('nav-item')
// for (let idx = 1; idx < navItemEles.length; idx++) {
//     navItemEles[idx].addEventListener('mouseenter', mouseEnterHandler)
//     navItemEles[idx].addEventListener('mouseleave', mouseLeaveHandler)
//
// }
//
// /**
//  * nav元素 鼠标enter触发事件
//  * @param {object} event 事件
//  */
// function mouseEnterHandler(event) {
//     const target = event.target
//     target.firstElementChild.style.cssText = "background-color:#6e6e6e;"
//     target.lastElementChild.style.cssText = "display:block;"
//
// }
//
// /**
//  * nav 元素鼠标leave触发事件
//  * @param {object} event 事件
//  */
// function mouseLeaveHandler(event) {
//     const target = event.target
//     target.firstElementChild.style.cssText = "background-color:transparent;"
//     target.lastElementChild.style.cssText = "display:none;"
// }
// FIXME end


const tabEle = document.getElementsByClassName('tab-container')[0]
const spanEles = tabEle.getElementsByClassName('tab-item')
const tcEles = tabEle.getElementsByClassName('tc-item')
let tabItmActiveIndex = 1

/**
 *  tab 点击事件处理程序
 * @param {object} event 事件s
 */
function tabClickHandler(event) {
    if (event.target.tagName.toLowerCase() === 'span') {
        const clickIndex = event.target.dataset['index']
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


const countryInputEle = document.getElementById('country-input')
const NAME2INDEX = {
    '中国': 1,
    '美国': 2,
    '英国': 3
}
/**
 *  下拉选择框 点击事件处理程序
 *  @param {object} event 触发事件对象
 */
function selectHandler(event) {
    let parentNode = event.target.parentNode
    let activeOption = document.getElementsByClassName('options active')
    //判断当前是否有active options，如果存在并且当前操作不是关闭其激活态，自动取消其激活态
    if (activeOption.length) {
        const target = event.target
        if (target.className !== 'op-item'
            && target.className !== 'select-hint') {
            activeOption[0].className = 'options'
        }
        if (target.className === 'select-hint' && target.parentNode !== activeOption[0].parentNode) {
            activeOption[0].className = 'options'
        }
    }
    //如果触发国家选择框，显示国家可选项
    if (parentNode.id === 'country') {
        parentNode.lastElementChild.classList.toggle('active')
    }
    //如果触发城市选择框，根据所选择的国家值，显示对应的城市选择框
    else if (parentNode.id === 'city') {
        let countryInputValue = countryInputEle.dataset['value']
        //如果没选国家，直接选择城市，出现警告
        if (countryInputValue === '') {
            countryInputEle.className += ' alarm'
            countryInputEle.focus()
        } else {
            parentNode.children[NAME2INDEX[countryInputValue]].classList.toggle('active')
        }
    }
    //如果触发的是可选项，修改选择框显示内容
    if (event.target.className === 'op-item') {
        parentNode.parentNode.children[0].innerText = event.target.innerText
        if (NAME2INDEX[event.target.innerText]){
            countryInputEle.dataset['value'] = event.target.innerText
        }
        parentNode.className = 'options'
        countryInputEle.className = 'select-hint'
    }
}

document.getElementById('form').addEventListener('click', selectHandler)






