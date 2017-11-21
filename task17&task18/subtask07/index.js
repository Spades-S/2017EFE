let displayWrapperEle = document.getElementsByClassName('display-wrapper')[0]
let inputArray = []
document.getElementsByClassName('input-wrapper')[0].addEventListener(
    'click',
    function (e) {
        let targetID = e.target.id
        let inputValue = document.getElementById('num-input').value.trim()
        switch (targetID) {
            case 'left-in':
                if (inputArray.length > 60) {
                    alert('数组长度已经超出范围！')
                    return
                }
                if (inputValue && checkInputValue(inputValue)) {
                    inputArray = [inputValue].concat(inputArray)
                    render()
                }
                break
            case 'right-in':
                if (inputArray.length > 60) {
                    alert('数组长度已经超出范围！')
                    return
                }
                if (inputValue && checkInputValue(inputValue)) {
                    inputArray.push(inputValue)
                    render()

                }
                break
            case 'left-out':
                if (inputArray.length) {
                    inputArray = inputArray.slice(1)
                    render()
                }


                break
            case 'right-out':
                if (inputArray.length) {
                    inputArray.pop()
                    render()
                }
                break
            case "sort":
                sort()
                break
            case "random-insert":
                randomInsert()
                break
        }
    }
)

displayWrapperEle.addEventListener('click', function (e) {
    if (e.target.className === 'item') {
        let index = inputArray.indexOf(e.target.title)
        inputArray.splice(index, 1)
        render()
    }

})



function checkInputValue(inputValue) {
    if (
        !/^\d+$/.test(inputValue)
        || inputValue < 10
        || inputValue > 100
    ) {
        alert("请输入[10,100]范围内的数字！")
        return false
    }
    return true
}

function sort() {
    let length = inputArray.length
    let i = 0
    let j = 1

    function next() {
        if (j >= length) {
            i++;
            j = i + 1
        }
        if (inputArray[i] > inputArray[j]) {
            let temp = inputArray[i]
            inputArray[i] = inputArray[j]
            inputArray[j] = temp
        }
        j++
        render()
        if (i < length) {
            setTimeout(next, 10)
        }

    }

    setTimeout(next, 10)

}

function render() {
    let innerHTML = ''
    inputArray.forEach((value) => {
        innerHTML += `<div class="item" style="height:${value}px" title="${value}"></div>`
    })
    displayWrapperEle.innerHTML = innerHTML
}

function randomInsert() {
    if (inputArray.length > 60) {
        alert('数组长度超过范围限制')
        return
    }
    for(let i=0;i<10;i++){
        inputArray.push(Math.ceil(Math.random()*90)+10)
    }
    render()
}