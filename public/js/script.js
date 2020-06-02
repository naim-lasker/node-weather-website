console.log('Hello from script js')

const api = '/weather?address=boston'
fetch(api).then(response => {
    response.json().then(data => {
        console.log(data)
    })
})