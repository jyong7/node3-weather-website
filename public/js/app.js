
const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
const messageOne = document.querySelector('#message1')
const messageTwo = document.querySelector('#message2')



weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location= search.value
    messageOne.textContent='loading..'
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
           messageOne.textContent=data.error
       }else{
           messageOne.textContent=data.forecast
           messageTwo.textContent=data.location
       }
    })
}) 

})