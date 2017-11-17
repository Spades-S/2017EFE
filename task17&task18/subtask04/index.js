/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */


function addAqiData() {
    let cityEle = document.getElementById('aqi-city-input')
    let qualityEle = document.getElementById('aqi-value-input')
    let city = cityEle.value.trim()
    let quality = qualityEle.value.trim()
    if (city.length === 0 || !/^[\u4e00-\u9fa5_a-zA-Z]+$/.test(city)) {
        cityEle.style.cssText = "border-color: red;"
        return
    } else {
        cityEle.style.cssText = "border-color: initial;"
    }
    if (quality.length === 0 || !/^[0-9]*$/.test(quality)) {
        qualityEle.style.cssText = "border-color: red;"
        return
    } else {
        cityEle.style.cssText = "border-color: initial;"
    }
    aqiData[city] = quality
    console.log(aqiData)
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

    let tableEle = document.getElementById('aqi-table')
    let innerHTML = ''
    let rowNum = 0

    for (let item in aqiData) {
        if (rowNum === 0) {
            innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>'
        }
        innerHTML += `<tr><td>${item}</td><td>${aqiData[item]}</td><td><button>删除</button></td></tr>`
        rowNum++
    }
    tableEle.innerHTML = innerHTML
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList()
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
    let target = event.target
    if (target.tagName.toLowerCase() === "button") {
        let delCity = target.parentNode.parentNode.getElementsByTagName('td')[0].innerText
        let cityNums = document.getElementsByTagName('tr').length
        if (cityNums > 2) {
            delete aqiData[delCity]
            renderAqiList();
        } else {
            document.getElementById('aqi-table').innerHTML = ''
            aqiData = {}
        }
    }

}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById('add-btn').onclick = addBtnHandle
    document.getElementById('aqi-table').onclick = delBtnHandle

}

init()