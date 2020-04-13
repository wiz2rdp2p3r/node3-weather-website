//console.log('Client side JS is loaded')

// client side javascript (from browser.. wont work in NodeJS)
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
// fetch('http://localhost:3000/weather?address=Boston').then((response) => {//
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data[0].location)
//             console.log(data[0].forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'from JavaScript'

weatherForm.addEventListener('submit', (e) => {
    // prevent refresh on submit
    e.preventDefault()

    const location = searchElement.value
    //console.log(location)

    messageOne.textContent = 'Loading....'
    messageTwo.textContet = ''

    fetch('/weather?address='+location).then((response) => {//
    response.json().then((data) => {
        if (data.error) {
            //console.log(data.error)
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            //console.log(data[0].location)
            //console.log(data[0].forecast)
            messageOne.textContent = ''
            messageTwo.textContent = data[0].location + ', ' + data[0].forecast + 
            '\nDaily high: ' + data[0].highTemp +
            '\nDaily low: ' + data[0].lowTemp
        }
    })
  })
})