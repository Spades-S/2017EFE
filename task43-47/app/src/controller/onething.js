import '../static/sass/onething.scss'
const priorityArr = ['low','medium','high']

function render(data){
    let HTML = ''
    if(data){
        HTML = `<div class="ot-tip">Now! The One Thing is</div>
                  <div class="${priorityArr[data.priority]} ot-content">
                      <div class="doing"></div>
                      <div class="text">${data.value}</div>
                  </div>
`
    }else{
        HTML = `<div class="ot-tip">Now! NO The One Thing</div>
                  </div>
`
    }


    $('main')[0].innerHTML = HTML
}

export default {
    render:render
}