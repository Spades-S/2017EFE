/**
 * @file  左侧导航栏宽度随滚动而变话；表头粘性效果；根据数据渲染导航、表格；表格item编辑、删除功能
 * @author Spades(spadesge@gmail.com)
 */
const anchorEle = document.getElementsByClassName('anchor')[0]
const stickyEle = document.getElementsByClassName('sticky')[0]
const tableEle = document.getElementsByClassName('table')[0]
const maskEle = document.getElementsByClassName('mask')[0]
const editMaskEle = document.getElementsByClassName('edit-mask')[0]
const deleteMaskEle = document.getElementsByClassName('delete-mask')[0]
const deleteContent = document.getElementById('delete-content')

// anchorHH -> anchor height height ; anchorSH -> anchor layout height
const anchorHH = anchorEle.scrollHeight - anchorEle.offsetHeight
let anchorLH = anchorEle.offsetHeight
let TOP = 0

/**
 *  滚动条滚动处理事件
 */
function scrollHandler() {
    let scrollOffset = window.pageYOffset
    if (scrollOffset <= anchorHH) {
        anchorEle.style.height = anchorLH + scrollOffset + 'px'
    }
    if (scrollOffset >= TOP) {
        stickyEle.className = 'sticky'
    } else {
        stickyEle.className = 'sticky disappear'
    }
}

/**
 * 窗口尺寸变化处理函数
 */
function resizeHandler() {
    //窗口大小变化时，计算出变化后的相对位置
    anchorLH = (window.innerHeight - TOP - 10)
    anchorEle.style.height = anchorLH + window.pageYOffset + 'px'
}

/**
 *  导航item点击处理函数
 * @param {object} e 点击事件
 */

function anchorClickHandler(e) {
    let target = e.target
    if (target.className === 'acr-item' && target.nextElementSibling) {
        target.nextElementSibling.classList.toggle('active')
    }


}

/**
 * 根据数据渲染导航栏，添加二级条目
 * @param {JSON} data 二级导航栏数据
 */
function renderAnchorEle(anchorData) {
    let anchorChildArr = anchorEle.children
    let childNum = anchorChildArr.length
    for(let idx in anchorData){
        let data = anchorData[idx]
        let dataNum = data.length
        let html = ''
        for (let count = 0; count < dataNum; count++) {
            html += `<div class="acr-subitem">${data[count]}</div>`
        }
        anchorChildArr[idx-1].innerHTML += `<div>${html}</div>`

    }
}

/**
 * 根据数据渲染表格
 * @param {JSON} data table-item 数据
 */
function renderTableEle(data) {
    let html = ''
    for (let idx in data) {
        html += ''
            + `<div class="tb-row" data-index="${idx}">`
            +     `<div class="tb-cell middle">${data[idx]['name']}</div>`
            +     `<div class="tb-cell middle">${data[idx]['content']}</div>`
            +     `<div class="tb-cell min">${data[idx]['value']}</div>`
            +     `<div class="tb-cell max">`
            +         `<button class="edit">编辑</button>`
            +         `<button class="delete">删除</button>`
            +     `</div>`
            + `</div>`
    }

    tableEle.innerHTML += html
}


let activeTableItem = null

/**
 * table 点击事件处理函数
 * @param {object} e 点击事件
 */
function tableClickHandler(e) {
    let target = e.target
    if (target.className === 'edit') {
        activeTableItem = target.parentNode.parentNode
        editMaskEle.classList.remove('disappear')
        document.body.style.overflow = 'hidden'
    } else if (target.className === 'delete') {
        deleteMaskEle.classList.remove('disappear')
        activeTableItem = target.parentNode.parentNode
        deleteContent.innerText = activeTableItem.toString()
        document.body.style.overflow = 'hidden'
    }

}

/**
 * mask 点击事件处理函数
 * @param {object} e 点击事件
 */
function maskClickHandler(e) {
    let target = e.target

    switch (target.id) {
        case 'edit-ensure':
            let name = document.getElementById('name').value
            let content = document.getElementById('content').value
            let value = document.getElementById('value').value
            let idx = activeTableItem.dataset.index
            tableData[idx] = {
                name: name,
                content: content,
                value: value
            }
            activeTableItem.children[0].innerText = name
            activeTableItem.children[1].innerText = content
            activeTableItem.children[2].innerText = value
            editMaskEle.classList.add('disappear')
            document.body.style.overflow = 'auto'

            break
        case 'edit-cancel':
            editMaskEle.classList.add('disappear')
            document.body.style.overflow = 'auto'

            break

        case 'delete-ensure':
            activeTableItem.remove()
            deleteMaskEle.classList.add('disappear')
            delete anchorData[activeTableItem.dataset['index']]
            document.body.style.overflow = 'auto'
           break
        case 'delete-cancel':
            deleteMaskEle.classList.add('disappear')
            document.body.style.overflow = 'auto'
            break

    }


}


/**
 * 初始化函数，设置初始状态，设置监听事件
 */
function init() {

    window.scrollTo(0, 0)
    //为滚动时导航条到视窗顶部的距离
    TOP = anchorEle.getBoundingClientRect().top
    renderAnchorEle(anchorData)
    renderTableEle(tableData)
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('resize', resizeHandler)
    anchorEle.addEventListener('click', anchorClickHandler)
    tableEle.addEventListener('click', tableClickHandler)
    maskEle.addEventListener('click', maskClickHandler)
}

init()


document.onunload = function(){
    window.removeEventListener('scroll', scrollHandler)
    window.removeEventListener('resize', resizeHandler)
    anchorEle.removeEventListener('click', anchorClickHandler)
    tableEle.removeEventListener('click', tableClickHandler)
    maskEle.removeEventListener('click', maskClickHandler)
}
