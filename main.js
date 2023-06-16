let moveX = 2
let moveY = 2


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateNumber() {
    document.getElementById('numberValue').innerText = `(${document.getElementById('number').value.slice(0, 3)}) ${document.getElementById('number').value.slice(3, 6)}-${document.getElementById('number').value.slice(6, 10)}`
}

function showSection(e) {
    if (Array.from(document.getElementsByTagName('input')).includes(document.activeElement) ||
        Array.from(document.getElementsByTagName('textarea')).includes(document.activeElement) ||
        e.target.id === 'submit'
    ) {
        return
    }
    let sections = document.getElementsByClassName('section')

    if (document.getElementsByClassName('visible').length === sections.length) {
        Array.from(sections).forEach(section => {
            section.classList.remove('visible')
        })
        return
    }
    for (let i = 0; i < sections.length; i++) {
        if (!sections[i].classList.contains('visible')) {
            sections[i].classList.add('visible')
            break
        }
    }
}

document.addEventListener('click', e => {e.target.id !== 'annoying-box' ? showSection(e) : null})
document.addEventListener('keyup', showSection)


async function boxClick(el) {
    console.log('gwe')
    el.style.display = 'none'
    let speed = parseFloat(Math.abs(moveX).toPrecision(2))
    if (speed === 2.0) {
        el.innerText = 'just kidding'
    } else if (speed === 2.2) {
        el.innerText = ''
    } else if (speed === 2.4) {
        el.innerText = 'If you haven\'t figured it out, click the screen or any key'
    } else if (speed === 2.6) {
        el.innerText = ''
    } else if (speed === 2.8) {
        el.innerText = 'getting fast now'
    } else if (speed === 3.2) {
        el.innerText = 'click me and I disappear forever'
    } else if (speed === 3.4) {
        el.innerText = 'just kidding again'
    } else if (speed === 3.6) {
        el.innerText = 'can you even read this anymore'
    }
    await sendNotif('It\'s never really gone, is it?')
    moveX = Math.abs(moveX) + 0.2
    moveY = Math.abs(moveY) + 0.2
    await sleep(5000)
    el.style.display = 'block'
}


setInterval(() => {
    let el = document.getElementById('annoying-box')
    if (!el) {
        console.log(el)
        return
    }
    if (el.getBoundingClientRect().left + moveX > window.innerWidth - 200 || el.getBoundingClientRect().left + moveX < 0) {
        moveX *= -1
    }
    if (el.getBoundingClientRect().top + moveY > window.innerHeight - 200 || el.getBoundingClientRect().top + moveY < 0) {
        moveY *= -1
    }
    el.style.left = (el.getBoundingClientRect().left + moveX).toString() + 'px'
    el.style.top = (el.getBoundingClientRect().top + moveY).toString() + 'px'
    console.log(el.style.top)
    console.log('running')
}, 1)

async function sendNotif(text) {
    let notif = document.getElementById('notif')
    notif.innerText = text
    notif.classList.add('visible')
    await sleep(3000);
    notif.classList.remove('visible')
}