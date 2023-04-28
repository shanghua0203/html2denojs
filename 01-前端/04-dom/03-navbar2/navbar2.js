let main = document.querySelector('#main')

let pages = {
    '#aboutus':`
aboutus/
aboutus/
aboutus/
aboutus/
    `,
    '#example1':`
example1/
example1/
example1/
example1/
example1/
    `,
    '#example2':`example2`,
    '#example3':'example3',
}

window.onhashchange = function () {
    let hash = window.location.hash
    main.innerHTML = pages[hash]
}