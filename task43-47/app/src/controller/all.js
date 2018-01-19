import '../static/sass/all.scss'
import Pan from '../utility/pan'
import Storage from '../model/storage'
import Edit from './edit'

function render(data = [{
    id: 0,
    priority: 2,
    status: 2,
    value: 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttest'
}]) {

    const legendHTML = `<div class="priority">
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
                        <div class="status">
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
    const priorityArr = ['low', 'medium', 'high']
    const statusArr = ['done', 'todo', 'doing']
    let listHTML = `<div class="list">`
    data.map(item => {
        let itemHTML = `<div class="item ${priorityArr[item.priority]}" data-id="${item.id}">
                            <div class="${statusArr[item.status]}"></div>
                            <div class="content">${item.value}</div>
                            <div class="status-choice">
                                <input type="button" value="已完成">
                                <input type="button" value="待办">
                                <input type="button" value="进行中">
                            </div>
                            <div class="edit-choice">
                                <input type="button" value="编辑">
                                <input type="button" value="删除">
                            </div>
                        </div>
        `
        listHTML += itemHTML
    })
    listHTML += '</div>'
    $('main')[0].innerHTML = legendHTML + listHTML
    const listEle = $('.list')[0]

    Pan(
        listEle,
        (event) => {
            let containerEle = event.target.parentNode
            let activeEle = containerEle.getElementsByClassName('edit-choice active')[0]
            if (activeEle) {
                activeEle.classList.remove('active')
            } else {
                containerEle.getElementsByClassName('status-choice')[0].classList.add('active')
            }
        },
        (event) => {
            let containerEle = event.target.parentNode
            let activeEle = containerEle.getElementsByClassName('status-choice active')[0]
            if (activeEle) {
                activeEle.classList.remove('active')
            } else {
                containerEle.getElementsByClassName('edit-choice')[0].classList.add('active')
            }
        })

    listEle.onclick = e => {
        let target = e.target
        if (target.type === 'button') {
            let containerEle = target.parentNode.parentNode
            let id = Number(containerEle.dataset['id'])


            switch (target.value) {
                case'已完成':
                    Storage.updateItemStatus(id, 0)
                    containerEle.children[0].className = 'done'
                    $('.status-choice')[0].classList.remove('active')
                    break
                case'待办':
                    Storage.updateItemStatus(id, 1)
                    containerEle.children[0].className = 'todo'
                    $('.status-choice')[0].classList.remove('active')
                    break
                case'进行中':
                    Storage.updateItemStatus(id, 2)
                    containerEle.children[0].className = 'doing'
                    $('.status-choice')[0].classList.remove('active')
                    break
                case'编辑':
                    Edit.render(Storage.getItem(id))
                    break
                case'删除':
                    Storage.del(id)
                    containerEle.style.cssText = 'display:none'
                    $('.edit-choice')[0].classList.remove('active')

                    break
                default:
                    break

            }
        }
    }

}

export default {
    render: render
}