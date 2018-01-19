import './static/sass/common.scss'

import OneThing from './controller/onething'
import All from './controller/all'
import Edit from './controller/edit'
import Storage from './model/storage'


OneThing.render(Storage.getTheOneThing())
const AddBtn = $('.add')[0]
const CancelBtn = $('.cancel')[0]
const FinishBtn = $('.finish')[0]

$('footer')[0].onclick = e => {
    AddBtn.classList.remove('disappear')
    CancelBtn.classList.add('disappear')
    FinishBtn.classList.add('disappear')
    let target = e.target
    $('.active')[0].classList.remove('active')
    target.classList.add('active')
    switch (target.innerText) {
        case 'OneThing':
            OneThing.render(Storage.getTheOneThing())
            break
        case 'All':
            All.render(Storage.getItems())
            break

    }
}

CancelBtn.onclick = () => {
    console.log(Storage.getItems())
    All.render(Storage.getItems())
    CancelBtn.classList.add('disappear')
    AddBtn.classList.remove('disappear')
    FinishBtn.classList.add('disappear')
}

AddBtn.onclick = () => {
    Edit.render()

}