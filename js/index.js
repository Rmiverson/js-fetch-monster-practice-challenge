let currentPage = 1

document.addEventListener("DOMContentLoaded", () => {
   renderForm()
   fetchMonsts()
   addListeners()
})

// sewvah
const fetchMonsts = () => {
   fetch(`http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`)
   .then(resp => resp.json())
   .then(data => {
      clearPage()
      data.forEach(monst => renderMonst(monst))
   })
}

const postMonst = (monst) => {
   fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
         "Content-type": "application/json",
         Accept: "application/json"
      },
      body: JSON.stringify(monst)
   })
   .then(resp => resp.json())
   .then(data => fetchMonsts(data))
}

// DOM
const clearPage = () => {
   const contain = document.querySelector('#monster-container')
   contain.innerHTML = ""
}
const renderMonst = (monst) => {
   const contain = document.querySelector('#monster-container')
   
   const div = document.createElement('div')
   const h3 = document.createElement('h3')
   const h4 = document.createElement('h4')
   const p = document.createElement('p')

   div.id = monst.id
   h3.innerHTML = monst.name
   h4.innerHTML = Math.floor(monst.age)
   p.innerHTML = monst.description

   div.append(h3, h4, p)
   contain.appendChild(div)
}

const renderForm = () => {
   const contain = document.querySelector('#create-monster')

   const form = document.createElement('form')
   const nameInput = document.createElement('input')
   const nameLabel = document.createElement('label')
   const ageInput = document.createElement('input')
   const ageLabel = document.createElement('label')
   const descInput = document.createElement('input')
   const descLabel = document.createElement('label')
   const submit = document.createElement('input')
   const br = document.createElement('br')
   const br1 = document.createElement('br')
   const br2 = document.createElement('br')
   const h3 = document.createElement('h3')

   h3.innerHTML = "New Monster"

   nameLabel.innerHTML = "Name:"
   nameInput.setAttribute("type", "text")
   nameInput.setAttribute("name", "name")
   nameInput.setAttribute("placeholder", "Name...")

   ageLabel.innerHTML = "Age:"
   ageInput.setAttribute("type", "text")
   ageInput.setAttribute("name", "age")
   ageInput.setAttribute("placeholder", "Age...")

   descLabel.innerHTML = "Description:"
   descInput.setAttribute("type", "text")
   descInput.setAttribute("name", "description")
   descInput.setAttribute("placeholder", "Description...")

   submit.setAttribute("type", "submit")

   form.append(h3, nameLabel, nameInput, br, ageLabel, ageInput, br1, descLabel, descInput, br2, submit)

   contain.appendChild(form)
}

//listen listen listen
const addListeners = () => {
   const btns = document.querySelectorAll('button')
   const form = document.querySelector('form')

   form.addEventListener('submit', submitHandler)

   btns.forEach(btn => {
      btn.addEventListener('click', () => arrowHandler(btn))
   })
}

//handle THIS
const arrowHandler = (btn) => {
   if (btn.id === 'forward') {
      currentPage++
   } else if (btn.id === 'back') {
      if (currentPage > 1){
         currentPage--
      }
   }
   fetchMonsts()
}

const submitHandler = (e) => {
   e.preventDefault()
   let monst = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value
   }
   postMonst(monst)
}