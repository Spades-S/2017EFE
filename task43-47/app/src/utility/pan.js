function pan(element, leftHandler, rightHandler) {
    const threshold = 30
    let isLeftPanned = false
    let isRightPanned = false
    let startX = undefined
    element.ontouchstart = event => {
        startX = event.touches[0].clientX
        isLeftPanned = false
        isRightPanned = false
    }
    element.ontouchmove = event => {
        let moveX = event.touches[0].clientX
        if ((moveX - startX) > threshold && !isLeftPanned) {
            isLeftPanned = true
            leftHandler.call(this, event)
        } else if ((moveX - startX) < -threshold && !isRightPanned) {
            isRightPanned = true
            rightHandler.call(this, event)
        }
    }
}

export default pan