console.log('Hello from script js')

const api = 'http://localhost:3000/weather?address=boston'
fetch(api).then(response => {
    response.json().then(data => {
        console.log(data)
    })
})