let tagArr = []
let interestArr = []
let tagInputEle = document.getElementById('tag-input')
let tagDisplayEle = document.getElementById('tag-display')
let interestInputEle = document.getElementById('interest-input')
let interestDisplayEle = document.getElementById('interest-display')
tagInputEle.addEventListener('keypress', (e) => {
    if (/(32|13|44)/.test(e.charCode.toString())) {
        e.preventDefault()
        let inputValue = tagInputEle.value.trim()
        if (!inputValue) {
            return
        }
        if (tagArr.indexOf(inputValue) < 0) {
            if (tagArr.length >= 10) {
                tagArr.shift()
            }
            tagArr.push(inputValue)
            render(tagArr, tagDisplayEle)

        }
        tagInputEle.value = ''
    }
})
let activeItem = null
tagDisplayEle.addEventListener('mouseover', (e) => {
    let dclassName = e.target.className
    if (dclassName.includes('item')) {
        e.target.className = 'item active'
        activeItem = e.target
    } else {
        if (e.target.className !== 'del') {
            if (activeItem) {
                activeItem.className = 'item'
            }
        }
    }
})
tagDisplayEle.addEventListener('click', (e) => {
    let removeEle = null
    if (e.target.className === 'item active') {
        removeEle = e.target

    }
    if (e.target.parentNode.className === 'item active') {
        removeEle = e.target.parentNode

    }
    let index = tagArr.indexOf(removeEle.innerText.substr(2))
    tagArr.splice(index, 1)
    removeEle.remove()
})

document.getElementById('btn-interest').addEventListener('click', () => {
    let inputValue = interestInputEle.value
    inputValue.split(/[\t, \n]/).forEach((item) => {
        if (item) {
            if (interestArr.indexOf(item) < 0) {
                if (interestArr.length >= 10) {
                    interestArr.shift()
                }
                interestArr.push(item)
            }
        }

    })
    render(interestArr, interestDisplayEle)
})


function render(arr, ele) {
    let innerHTML = ''
    arr.forEach((value) => {
        innerHTML += `<span class="item"><span class="del">删除</span>${value}</span>`
    })
    ele.innerHTML = innerHTML
}


