/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    // nowSelectCity: 0,
    // nowGraTime: "day"
    //test data
    nowSelectCity: 0,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    let charWrapper = document.getElementsByClassName('aqi-chart-wrap')[0]
    let innerHTML = ''

    let renderData = chartData[pageState.nowSelectCity][pageState.nowGraTime]
    let graClass = pageState.nowGraTime
    for (let item in renderData) {
        let color = '#' + ('00000' + (Math.random() * 0x1000000).toString(16))
            .slice(-6); // 随机颜色
        let barData = (renderData[item][0] / renderData[item][1]).toFixed(2)
        if (pageState.nowGraTime !== 'day') {
            innerHTML += `<div class="bar ${graClass}" style="height:${barData};background:${color}" title="${pageState.nowGraTime} ${item} 数据:${barData} "></div>`
        } else {
            innerHTML += `<div class="bar ${graClass}" style="height:${barData};background:${color}" title="${renderData[item][2]} 数据:${barData} "></div>`
        }
    }
    charWrapper.innerHTML = innerHTML
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {

    if (pageState.nowGraTime !== event.target.value) {
        pageState.nowGraTime = event.target.value
        renderChart()
    }

}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
    pageState.nowSelectCity = event.target.value
    renderChart()
}


/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementById('form-gra-time').addEventListener('click', graTimeChange)

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    let citySelectEle = document.getElementById('city-select')
    citySelectEle.addEventListener('change', citySelectChange)

}

/**
 * 初始化图表需要的数据格式
 */
// 一句话：我大哥还是我大哥！
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    let cityID = 0
    for (let city in aqiSourceData) {
        chartData[cityID] = {}
        chartData[cityID]['day'] = {}
        chartData[cityID]['week'] = {}
        chartData[cityID]['month'] = {}
        let dayID = 0
        for (let day in aqiSourceData[city]) {
            chartData[cityID]['day'][dayID] = []
            chartData[cityID]['day'][dayID][0] = aqiSourceData[city][day]
            chartData[cityID]['day'][dayID][1] = 1
            chartData[cityID]['day'][dayID][2] = day

            let weekID = parseInt(dayID / 7) + 1
            if (weekID in chartData[cityID]['week']) {
                chartData[cityID]['week'][weekID][0] += aqiSourceData[city][day]
                chartData[cityID]['week'][weekID][1] += 1
            } else {
                chartData[cityID]['week'][weekID] = []
                chartData[cityID]['week'][weekID][0] = aqiSourceData[city][day]
                chartData[cityID]['week'][weekID][1] = 1
            }
            let monthCnt = new Date(day).getMonth() + 1
            if (monthCnt in chartData[cityID]['month']) {
                chartData[cityID]['month'][monthCnt][0] += aqiSourceData[city][day]
                chartData[cityID]['month'][monthCnt][1] += 1
            } else {
                chartData[cityID]['month'][monthCnt] = []
                chartData[cityID]['month'][monthCnt][0] = aqiSourceData[city][day]
                chartData[cityID]['month'][monthCnt][1] = 1
            }
            dayID++
        }
        cityID++
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart()
}

init();