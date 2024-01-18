
// Réccuperation éléments modal1
const myModal = document.getElementById('modal');
const myModalButton = document.getElementById('openModalBtn');
const modal = document.querySelector('.modal-content');
const myCloseButton = document.querySelector('.close-button');

// Fonction ouverture du modal1
function openModal() {
  myModal.style.display = "block";
}

// Fonction fermeture du modal1
function closeModal() {
  myModal.style.display = "none";
}

// Ajout des écouteurs d'événements du modal1
myModalButton.addEventListener("click", openModal);
myCloseButton.addEventListener("click", closeModal);

// Réccupérer l'élément body
const body = document.querySelector('body');


// Réccuperation des work pour le modal1
const imgCollectModal = fetch("http://localhost:5678/api/works")
  .then(reponse => reponse.json())
  .then(data => {
    data.forEach(element => {

      // créer balises pour accueillir les images du portfolio
      const modalGallery = document.querySelector('.modal-gallery');
      const maDiv = document.createElement('div');
      const trash = document.createElement('i');
      const myImg = document.createElement('img');
      const myTitle = document.createElement('p');

      trash.dataset.id = element.id
      trash.addEventListener('click', deleteWork);

      myImg.src = element.imageUrl
      myTitle.innerHTML = "éditer"
      maDiv.dataset.categorie = element.categoryId

      trash.classList.add('fa-solid', 'fa-trash-can');
      maDiv.classList.add('work-modal');

      modalGallery.appendChild(maDiv);
      maDiv.appendChild(myImg);
      maDiv.appendChild(myTitle);
      maDiv.appendChild(trash);
    });
  });

// Fonction pour supprimer les works
function deleteWork(e) {
  e.preventDefault()

  fetch(`http://localhost:5678/api/works/${e.target.dataset.id}`, {
    // fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Origin": "http://localhost:5500/",
      // Authorization: 'Bearer ${localstorage.token}'
      "Authorization": `Bearer ${localStorage.token}`
    }
  })
    .then(response => {
      if (response.ok) {
        e.target.parentElement.remove();
      } else {
        console.error("La suppression a échoué.");
      }
    })
}




// Réccupérer élément pour le modal2
const modalContent = document.querySelector('.modal-content');
const myModal2 = document.getElementById('modal2');
const myCloseButton2 = document.querySelector('.close-button2');
const myReturnButton = document.querySelector('.return-button');
const modalContent2 = document.querySelector('.modal-content2');
// const modal2Form = document.querySelector('.modal2-form');

// Ajout du bouton "ajout de photo" modal1
const addPictureBtn = document.createElement('button');
addPictureBtn.textContent = 'Ajouter une photo';
addPictureBtn.classList.add('btn-add-picture');
modalContent.appendChild(addPictureBtn);


//ajout p "supprimer la gallerie"
const paragraphModal = document.createElement('p');
paragraphModal.textContent = 'Supprimer la gallerie';
paragraphModal.classList.add('paragraph-modal');
modalContent.appendChild(paragraphModal);


//function pour ouvrir le modal2 
function openModal2() {
  myModal2.style.display = "block";
  myModal.style.display = 'none';
}

// Fonction fermeture du modal2
function closeModal2() {
  myModal2.style.display = "none";
}

//Fonction retour au modal1
function returnModal() {
  myModal.style.display = "block";
  myModal2.style.display = 'none';
}

addPictureBtn.addEventListener('click', openModal2);
myCloseButton2.addEventListener('click', closeModal2);
myReturnButton.addEventListener('click', returnModal);

// Bouton pour ajouter photo modal2
const addPictureBtn2 = document.querySelector('.add-picture-Btn2');
const pictureInput = document.querySelector('.photo-input');

addPictureBtn2.addEventListener('click', function () {
  pictureInput.click();
});

pictureInput.addEventListener('change', function () {
  const selectedPhoto = pictureInput.files[0];
  // Faire quelque chose avec le fichier sélectionné, par exemple l'afficher ou l'envoyer vers un serveur
});

// Formulaire modal2
const formContainer = document.querySelector('.form-container-modal2');
const labelCategory = document.createElement('label')
const inputCategory = document.createElement('select');
const optionInputCategory = document.createElement('option');

labelCategory.textContent = 'Categorie';

inputCategory.classList.add('input-category');
inputCategory.classList.add('label-category');
optionInputCategory.classList.add('option-input-category');


formContainer.appendChild(labelCategory)
inputCategory.appendChild(optionInputCategory);
formContainer.appendChild(inputCategory);



fetch("http://localhost:5678/api/categories")
  .then(response => response.json())
  .then(categories => {
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      inputCategory.appendChild(option);
    });
  });



// Fonction pour fermer les modal quand on clic à coté 
const closeBody = document.querySelector('body');

function clickOnBody(e) {
  if (e.target === myModal) {
    myModal.style.display = "none";
  } else if (e.target === myModal2) {
    myModal2.style.display = "none";
  }
}
closeBody.addEventListener('click', clickOnBody);

// Pour ajouter une photo
const btnModal2 = document.querySelector('.btn-modal2');


btnModal2.addEventListener('click', (e) => {
  e.preventDefault();

  // Récupérer les données du formulaire
  const titleForm = document.getElementById('title-input').value;;
  const photoForm = document.querySelector('.photo-input').files[0];

  // Créer un objet FormData
  const formData = new FormData();
  formData.append('title', titleForm);
  formData.append('image', photoForm);
  formData.append('category', inputCategory.value);

  // Envoyer les données vers l'API
  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: { // "Content-Type": "application/json",
      "Origin": "http://localhost:5500/",
      "Authorization": `Bearer ${localStorage.token}`
    },
    body: formData,
  })
    .then(response => console.log(response))
    .then(data => {
      // réponse du serveur
      console.log('Photo ajoutée avec succès:', data);
      // Réinitialiser formulaire
      btnModal2.reset();
    })
});

// Preview image
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');

imageInput.addEventListener('change', function() {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block'; // Afficher l'élément img
    };

    reader.readAsDataURL(file);
  } else {
    imagePreview.src = '#';
    imagePreview.style.display = 'none'; // Masquer l'élément img
  }
});

