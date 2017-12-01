/**
 * @file  左侧导航栏宽度随滚动而变化
 * @author Spades(spadesge@gmail.com)
 */
const anchorEle = document.getElementsByClassName('anchor')[0]
const stickyEle = document.getElementsByClassName('sticky')[0]
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
    }else{
        stickyEle.className = 'sticky disappear'
    }
}

/**
 * 窗口尺寸变化处理函数
 */
function resizeHandler() {
    // //窗口大小变化时，计算出变化后的相对位置，最重要的一点是window.innerHeight 是一个随着窗口大小变化的值
    anchorLH = (window.innerHeight - TOP - 10)
    anchorEle.style.height = anchorLH + window.pageYOffset + 'px'
}

function init() {

    window.scrollTo(0,0)
    //为滚动时导航条到视窗顶部的距离
    TOP = anchorEle.getBoundingClientRect().top
    window.addEventListener('scroll', scrollHandler)
    window.addEventListener('resize', resizeHandler)
}

init()
