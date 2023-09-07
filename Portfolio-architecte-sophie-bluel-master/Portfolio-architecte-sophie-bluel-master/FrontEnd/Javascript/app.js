
document.addEventListener("DOMContentLoaded", function () {
  // Le code ici s'exécutera une fois que le DOM est prêt.
  const modifierLink = document.getElementById("modal-trigger");
  if (modifierLink) { // Vérifiez si l'élément existe avant d'ajouter un écouteur.
    modifierLink.addEventListener("click", function (e) {
      e.preventDefault();
      showModal();
    });
  }
});

//Récupération des projets//

function resetAddWorkForm() {
const titleInput = document.getElementById("modal-photo-title");
const categorySelect = document.getElementById("modal-photo-category");
const imageInput = document.getElementById("image");



// Réinitialisez les valeurs des champs du formulaire
titleInput.value = "";
categorySelect.value = "";
imageInput.value = "";

// Réinitialisez l'affichage des éléments cachés (le cas échéant)
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo-div > p");
const iconeImage = document.querySelector("#iModalImage");

labelImage.style.display = "block";
pImage.style.display = "block";
iconeImage.style.display = "block";

// Si vous avez ajouté un aperçu de l'image, supprimez-le également (si applicable)
const imgPreview = document.querySelector("#form-photo-div > img");
if (imgPreview) {
  imgPreview.remove();
}

// // Réinitialisez le style du bouton Valider (s'il est nécessaire)
// const submitButton = document.getElementById("modal-valider");
// submitButton.style.backgroundColor = "";
}

const imagesContainer = document.querySelector('.gallery')

function createWorkFigure(work) {
const figure = document.createElement('figure')
const figureCaption = document.createElement('figcaption')
const figureImage = document.createElement('img')

figureImage.src = work.imageUrl
figureImage.alt = work.title
figureCaption.innerHTML = work.title
figure.setAttribute('data-id', work.id);
figure.setAttribute('category-id', work.categoryId)

figure.appendChild(figureImage)
figure.appendChild(figureCaption)    

return figure;
}

fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then((data) => {
  data.forEach((work) => {
    const figure = createWorkFigure(work);
    imagesContainer.appendChild(figure);
  });
});
  
//FILTERS//

//Filter Objects//
      
function filtreObjet(){
  //Display Objects//
  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '1') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}
var bouton = document.getElementById('btnObjet');
bouton.addEventListener('click',filtreObjet);
            
     
//Filter Hotel & restaurants//
      
function filtreHotelsRestaurants(){
  //Display Hotels & restaurants//
  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
    const categoryId = element.getAttribute('category-id');
    if (categoryId === '3') {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

var bouton = document.getElementById('btnHotelRestaurant');
bouton.addEventListener('click',filtreHotelsRestaurants);

      
//Filter Appartements//

function filtreAppartements(){
          
  //Display Appartements//
  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
      const categoryId = element.getAttribute('category-id');
      if (categoryId === '2') {
          element.style.display = 'block';
      } else {
          element.style.display = 'none';
      }
  });
}

var bouton = document.getElementById('btnAppartement');
bouton.addEventListener('click',filtreAppartements);

//Filter all categories//

function filtreTous(){

  //Display all categories of works//
  const elements = document.querySelectorAll('div.gallery figure');
  elements.forEach((element) => {
      element.style.display = 'block';
  });   
}

var bouton = document.getElementById('btnTous');
bouton.addEventListener('click',filtreTous);


//Function that keeps the filter button selected//

const boutons = document.querySelectorAll('.bouton-css');

boutons.forEach((bouton) => {
  bouton.addEventListener('click', function() {
    boutons.forEach((bouton) => {
      bouton.classList.remove('selected');
    });
    this.classList.add('selected');
    sessionStorage.setItem('boutonSelectionne', this.id);
  });
});
//allows to return to the "all filter" when reloading the page
window.onbeforeunload = function(){
sessionStorage.removeItem('boutonSelectionne');
}


//LOGIN ADMINISTRATOR//

const loginStatus = document.getElementById("login")
const logoutStatus = document.getElementById("logout")
const adminStatus = document.getElementById("admin-logged")
const figureModify = document.getElementById("figure-modify")
const description = document.getElementById("figure-modify-a")
const portfolioModify = document.getElementById("portfolio-l-modify")
const filtreModify = document.querySelector('.filtre')


//displays the administrator elements//

if (JSON.parse(sessionStorage.getItem("isConnected"))) {
  loginStatus.style.display = 'none'
  logoutStatus.style.display = 'block'
  adminStatus.style.display = 'flex'
  figureModify.style.display = 'flex'
  portfolioModify.style.display = 'flex'
  filtreModify.style.display = 'none'
  description.style.display = 'flex'
    
} else {
  loginStatus.style.display = 'block'
  logoutStatus.style.display = 'none'
  adminStatus.style.display = 'none'
  figureModify.style.display = 'none'
  portfolioModify.style.display = 'none'
  filtreModify.style.display = 'flex'
  description.style.display = 'none'
}

//Reset user's connexion state//
logoutStatus.addEventListener("click", (event) => {
  event.preventDefault();
  sessionStorage.removeItem("Token");
  sessionStorage.removeItem("isConnected");
  window.location.replace("index.html");
});


//Categories//

const selectCategory = document.getElementById('modal-photo-category');

const reponseCategory = fetch('http://localhost:5678/api/categories')
.then((response) => response.json())
.then((data) => {
data.forEach((category) => {
  const categoryOption = document.createElement('option')
  const categoryLabel = document.createElement('label')

  categoryOption.setAttribute('value', category.id)
  categoryLabel.innerHTML = category.name

  selectCategory.appendChild(categoryOption)
  categoryOption.appendChild(categoryLabel)
});
});

//MODAL//

const modal = document.querySelector('#modal');
const modalContent = document.querySelector('#modal-content');
const modalPhoto = document.querySelector('#modal-photo');
const modalClose = document.querySelector('#modal-close');

function showModal() {
modal.style.display = 'block';
}

function hideModal() {
modal.style.display = 'none';
resetAddWorkForm();
}

modalContent.addEventListener('click', function(e) {
e.stopPropagation();
});
modalPhoto.addEventListener('click', function(e) {
e.stopPropagation();
});

modalClose.addEventListener('click', hideModal);


modal.addEventListener('click', hideModal);


//Add photo button//

// const newPhotoBtn = document.querySelector('#new-photo');
// const returnBtn = document.querySelector('#modal-return');
// const modalPhotoClose = document.querySelector("#modal-photo-close");
// const fileInput = document.querySelector('#file-input');

// newPhotoBtn.addEventListener('click', function() {
//   modalContent.style.display = 'none';
//   modalPhoto.style.display = 'block';
// });

// returnBtn.addEventListener('click', function(){
//   modalContent.style.display = 'flex';
//   modalPhoto.style.display = 'none';
// })

// modalPhotoClose.addEventListener('click', hideModal);

// fileInput.addEventListener('change', function() {
//   const selectedFile = fileInput.files[0];
//   if (selectedFile) {
//     const fileType = selectedFile.type;
//     if (fileType.startsWith('image/')) {
//       // C'est un fichier image
//       // Vous pouvez maintenant effectuer d'autres actions ici si nécessaire
//       console.log('Fichier image sélectionné');
//     } else {
//       // Ce n'est pas un fichier image
//       alert('Veuillez sélectionner un fichier image.');
//       // Réinitialisez l'élément input pour effacer la sélection non valide (facultatif)
//       fileInput.value = '';
//     }
//   }
// });


const newPhotoBtn = document.querySelector('#new-photo');
const returnBtn = document.querySelector('#modal-return');
const modalPhotoClose = document.querySelector("#modal-photo-close");


newPhotoBtn.addEventListener('click', function() {
modalContent.style.display = 'none';
modalPhoto.style.display = 'block';
});

returnBtn.addEventListener('click', function(){
modalContent.style.display = 'flex';
modalPhoto.style.display = 'none';
resetAddWorkForm();
})

modalPhotoClose.addEventListener('click', hideModal);



//ADD WORKS TO THE MODAL//

const imagesModalContainer = document.querySelector('.gallery-modal')

function createModalWorkFigure(work) {
const figure = document.createElement('figure')
const figureCaption = document.createElement('figcaption')
const figureImage = document.createElement('img')
const deleteIcon = document.createElement('i') 
      
figureImage.src = work.imageUrl
figureImage.alt = work.title
figureCaption.innerHTML = "éditer"
figure.setAttribute('data-id', work.id); // Add a data-id attribute to store the work ID
deleteIcon.className = "fa-regular fa-trash-can" 

figure.appendChild(figureImage)
figure.appendChild(figureCaption)
figure.appendChild(deleteIcon)

// Add a delete event when clicking on the "delete" icon
deleteIcon.addEventListener('click', (event) => {
  event.preventDefault();
  deleteWorkById(work.id);
});

return figure;
}

fetch('http://localhost:5678/api/works')
.then((response) => response.json())
.then((data) => {
  data.forEach((work) => {
    const figure = createModalWorkFigure(work);
    imagesModalContainer.appendChild(figure);
  });
});


//DELETE WORK//

function deleteWorkById(workId) {
const token = sessionStorage.getItem("Token");
const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce travail ?");
if (confirmation) {
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      "Accept" : 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok){
    throw new error ('La supression du travai à echoué.');
  }
  const modalWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
  if (modalWorkToRemove) {
    modalWorkToRemove.remove();
    
  const galleryWorkToRemove = document.querySelector(`figure[data-id="${workId}"]`);
  if (galleryWorkToRemove) {
      galleryWorkToRemove.remove();
  } else {
      console.error('Élément à supprimer non trouvé dans la galerie principale');
    }
  } else {
      console.error('Élément à supprimer non trouvé dans la modale');
  }
})
.catch(error => console.error(error));
}    
}  

//Delete all gallery//

function deleteGallery() {
const token = sessionStorage.getItem("Token");
const galleryWorks = document.querySelectorAll('.gallery-modal figure, .gallery figure');
galleryWorks.forEach((galleryWork) => {
  const workId = galleryWork.getAttribute('data-id');
  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      "Accept" : 'application/json',
      "Authorization" : `Bearer ${token}`
    }
  });
  galleryWork.remove();
});
}

document.getElementById("delete-gallery").addEventListener("click", function() {
const confirmation = confirm("Êtes-vous sûr de vouloir supprimer la galerie ?");
if (confirmation) {
  deleteGallery();
}
});

//Check form filled//

const titleInput = document.getElementById('modal-photo-title');
const categorySelect = document.getElementById('modal-photo-category');
const imageInput = document.getElementById('image');

// Ajout d'un écouteur d'événements pour surveiller les changements de sélection de fichiers
imageInput.addEventListener("change", function () {
  const selectedFile = imageInput.files[0]; // Récupération du fichier sélectionné

  // Vérification de l'extension du fichier
  if (selectedFile) {
    const fileName = selectedFile.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const allowedExtensions = ["jpg", "jpeg", "png"];

    if (!allowedExtensions.includes(fileExtension)) {
      // Le fichier sélectionné n'a pas une extension autorisée (jpg, jpeg, png)
      alert("Veuillez sélectionner un fichier image au format JPG, JPEG ou PNG.");
      // Réinitialisation de l'élément d'entrée de fichier pour effacer la sélection non valide (facultatif)
      imageInput.value = "";
    }
  }
});

const submitButton = document.getElementById('modal-valider');

function checkForm() {
if (titleInput.value !== '' && categorySelect.value !== '' && imageInput.value !== '') {
  submitButton.style.backgroundColor = '#1D6154';
} else {
  submitButton.style.backgroundColor = '';
  }
}

titleInput.addEventListener('input', checkForm);
categorySelect.addEventListener('change', checkForm);
imageInput.addEventListener('change', checkForm);


//ADD NEW WORK//

const btnValider = document.getElementById("modal-valider");
btnValider.addEventListener("click", addNewWork);

function addNewWork(event) {
event.preventDefault(); 

const token = sessionStorage.getItem("Token");

const title = document.getElementById("modal-photo-title").value;
const category = document.getElementById("modal-photo-category").value;
const image = document.getElementById("image").files[0];



// // Check if the selected file is an image (JPG or PNG)
// const allowedExtensions = ["jpg", "jpeg", "png"];
// const fileExtension = image.name.split(".").pop().toLowerCase();
// if (!allowedExtensions.includes(fileExtension)) {
//   alert("Veuillez sélectionner un fichier image au format JPG ou PNG.");
//   return;
// }


if(!title || !category || !image) {
  alert('Veuillez remplir tous les champs du formulaire.')
  return;
}

//check if the image does not exceed 4mo//
if (image.size > 4 * 1024 * 1024) {
  alert("La taille de l'image ne doit pas dépasser 4 Mo.");
  return;
}

const formData = new FormData();
formData.append("title", title);
formData.append("category", category);
formData.append("image", image);

fetch("http://localhost:5678/api/works", {
  method: "POST",
  body: formData,
  headers: {
    "Accept" : 'application/json', 
    "Authorization" : `Bearer ${token}`
  }
})
.then(response => response.json()) 
.then(work => {
  //create and add the new work to the gallery//
  const figure = createWorkFigure(work);
  const gallery = document.querySelector('.gallery');
  gallery.appendChild(figure);

  //create and add the new work to the modal gallery//
  const figureModal = createModalWorkFigure(work);
  const galleryModal = document.querySelector('.gallery-modal');
  galleryModal.appendChild(figureModal);

  alert('Le nouvel travail a été ajouté avec succès.');
  resetAddWorkForm();

})
.catch(error => console.error(error));
}

//PREVIEW IMG//
const inputImage = document.getElementById("image");
const labelImage = document.getElementById("label-image");
const pImage = document.querySelector("#form-photo-div > p");
const iconeImage = document.querySelector("#iModalImage");

inputImage.addEventListener("change", function () {
const selectedImage = inputImage.files[0];

const imgPreview = document.createElement("img");
imgPreview.src = URL.createObjectURL(selectedImage);
imgPreview.style.maxHeight = "100%";
imgPreview.style.width = "auto";

labelImage.style.display = "none";
pImage.style.display = "none";
inputImage.style.display = "none";
iModalImage.style.display = "none";
document.getElementById("form-photo-div").appendChild(imgPreview);
});
