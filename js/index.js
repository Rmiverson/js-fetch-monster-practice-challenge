let currentPage = 1

document.addEventListener("DOMContentLoaded", () => {
   newMonstForm()
   fetchMonsts()
   searchMonst()
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

const fetchMonst = (monst) => {
   fetch (`http://localhost:3000/monsters/${monst.id}`)
   .then(resp => resp.json())
   .then(data => {
      clearPage()
      renderMonst(data)
   })
}

const findMonst = (monstName) => {
   fetch ('http://localhost:3000/monsters')
   .then(resp => resp.json())
   .then(data => {
      //didn't use forEach because it doesn't have a built in break
      for (i = 0; i < data.length; i++) {
         if (data[i].name === monstName.name) {
            return fetchMonst(data[i])
            break
         }
      }

      clearPage()
      notFound()
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
   .then(data => fetchMonst(data))
}

const deleteMonst = (monstId) => {
   fetch (`http://localhost:3000/monsters/${monstId}`, {
      method: 'DELETE',
   })
   .then(resp => resp.json())
   .then(data => {
      console.log("success!! ")
      fetchMonsts()
   })
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
   const br = document.createElement('br')
   const remove = document.createElement('button')

   div.id = monst.id
   h3.innerHTML = monst.name
   h4.innerHTML = Math.floor(monst.age)
   p.innerHTML = monst.description
   remove.setAttribute("type", "button")
   remove.innerHTML = "Delete"
   remove.className = "monst-delete"

   div.append(h3, remove, h4, p, br)
   contain.appendChild(div)

   remove.addEventListener('click', () => deleteHandler(monst.id))
}

const newMonstForm = () => {
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

   form.id = "new-monst-form"

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

const searchMonst = () => {
   const newMonstForm = document.getElementById('create-monster')

   const div = document.createElement('div')
   const form = document.createElement('form')
   const txt = document.createElement('input')
   const submit = document.createElement('input')
   const br = document.createElement('br')
   const h3 = document.createElement('h3')

   h3.innerHTML = "Search Monster"
   form.id = "search-form"
   txt.setAttribute("type", "text")
   txt.setAttribute("name", "searchTxt")
   txt.setAttribute("placeholder", "Search monster name...")
   submit.setAttribute("type", "submit")

   form.append(h3, txt, br, submit)
   div.appendChild(form)
   newMonstForm.after(div)
}

const notFound = () => {
   const contain = document.querySelector('#monster-container')
   const h3 = document.createElement('h3')

   h3.innerHTML = "Not Found"

   contain.appendChild(h3)
}

//listen listen listen
const addListeners = () => {
   const btns = [document.querySelector('#back'), document.querySelector('#forward')]
   const newForm = document.querySelector('#new-monst-form')
   const searchForm = document.querySelector('#search-form')

   newForm.addEventListener('submit', submitHandler)
   searchForm.addEventListener('submit', searchHandler)

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

const searchHandler = (e) => {
   e.preventDefault()
   let monst = {
      name: e.target.searchTxt.value
   }
   findMonst(monst)
}

const deleteHandler = (id) => {
   let monstId = id
   deleteMonst(monstId)
}