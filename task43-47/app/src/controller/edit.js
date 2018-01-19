import '../static/sass/edit.scss'
import Storage from '../model/storage'
import All from './all'

function render(data = {id: undefined, priority: undefined, status: undefined, value: '请输入备忘内容'}) {
    const legendHTML = `<div class="priority edit">
                            <div class="item high">
                                <div class="circle"></div>
                                <div class="hint">高优</div>
                            </div>  
                            <div class="item medium">
                                <div class="circle"></div>
                                <div class="hint">中优</div>
                            </div>
                            <div class="item low">
                                <div class="circle"></div>
                                <div class="hint">低优</div>
                            </div>                                                          
                        </div>
                        <div class="status edit">
                            <div class="item">
                                <div class="doing"></div>
                                <div class="hint">进行中</div>
                            </div>  
                            <div class="item">
                                <div class="todo"></div>
                                <div class="hint">待办</div>
                            </div>
                            <div class="item">
                                <div class="done"></div>
                                <div class="hint">已完成</div>
                            </div>                                                          
                        </div>
`
    let textareaHTML = ''
    if (data.id === undefined) {
        textareaHTML = `<textarea placeholder="${data.value}"></textarea>`
    } else {
        textareaHTML = `<textarea>${data.value}</textarea>`
    }
    $('main')[0].innerHTML = legendHTML + textareaHTML

    const FinishBtn = $('.finish')[0]
    const AddBtn = $('.add')[0]
    const CancelBtn = $('.cancel')[0]
    const PriorityEle = $('.priority')[0]
    const StatusEle = $('.status')[0]
    const textareaEle = $('textarea')[0]
    let priority = data.priority
    let status = data.status

    CancelBtn.classList.remove('disappear')
    AddBtn.classList.add('disappear')
    FinishBtn.classList.remove('disappear')
    if (data.priority !== undefined) {
        PriorityEle.children[2 - data.priority].classList.add('active')
    }
    if (data.status !== undefined) {
        StatusEle.children[2 - data.status].classList.add('active')

    }

    FinishBtn.onclick = () => {
        if (priority === undefined) {
            alert('请选择优先级')
            return
        }
        if (status === undefined) {
            alert('请选择状态')
            return
        }
        if (!textareaEle.value) {
            alert('请输入备忘内容')
            return
        }
        if (data.id === undefined) {
            Storage.create(priority, status, textareaEle.value)
        } else {
            Storage.update(data.id, priority,status, textareaEle.value)
        }
        All.render(Storage.getItems())
        AddBtn.classList.remove('disappear')
        CancelBtn.classList.add('disappear')
        FinishBtn.classList.add('disappear')
    }

    PriorityEle.onclick = (event) => {
        activeItemShowClickHandler(event, PriorityEle)
        switch (event.target.innerText) {
            case '高优':
                priority = 2
                break
            case '中优':
                priority = 1
                break
            case '低优':
                priority = 0
                break
        }
    }

    StatusEle.onclick = (event) => {
        activeItemShowClickHandler(event, StatusEle)
        switch (event.target.innerText) {
            case '进行中':
                status = 2
                break
            case '待办':
                status = 1
                break
            case '已完成':
                status = 0
                break
        }

    }


}

function activeItemShowClickHandler(event, element) {
    let containerEle = event.target.parentNode
    let activeItem = element.getElementsByClassName('active')[0]
    if (activeItem) {
        activeItem.classList.remove('active')
    }
    containerEle.classList.add('active')


}


export default {
    render: render
}