let works = []
let categories = []

const divCategories = document.querySelector (".categories")
const gallery = document.querySelector(".gallery")

fetch("http://localhost:5678/api/works")

.then(response =>{
    return response.json()
})
.then(data =>{
    works = data
    for(let item of data){
        createWork(item.imageUrl, item.title)
    }
})

function createWork(imageUrl, title){

    const singleWork = `<figure>
    <img src="${imageUrl}" alt="${title}">
    <figcaption>${title}>
</figure>`
gallery.innerHTML += singleWork
}

/* filtres */

    function fetchCategories (){
    fetch ("http://localhost:5678/api/categories")

    .then(response =>{
        return response.json()
    })
    .then(data =>{
        categories = data
        createCategories("Tous",0)
        for(let item of data){
            createCategories(item.name, item.id)
        }
    })
}

function createCategories (name,id) {
let item = document.createElement("span")
item.classList.add("filtres")
item.innerText = name 
item.id = id
item.addEventListener("click",
    filterWork
)

divCategories.appendChild(item)
}


function filterWork (){
    const idCategorie = parseInt(this.id) 
    gallery.innerHTML = ""
    let filtredWork = []
    if(idCategorie===0){
        filterWork = works
    }
    else{
        filterWork = works.filter (item => item.categoryId === idCategorie)
    }
    for(let item of filterWork){
        createWork(item.imageUrl, item.title)
    }
}

fetchCategories()







 
