let uri="https://accounts.spotify.com/api/token";

let dato1="grant_type=client_credentials";
let dato2="client_id=f15530390a9644f7b870f49be5416b38";
let dato3="client_secret=57de7109ce8b475eba0462ee30c9f790";

let parametrosPOST={
    method:"POST",
    headers:{
        "Content-Type":"application/x-www-form-urlencoded"
    },
    body:`${dato1}&${dato2}&${dato3}`
}

fetch(uri,parametrosPOST)
.then(function(respuesta){
    return(respuesta.json())
})
.then(function(respuesta){
    console.log(respuesta)
    obtenerToken(respuesta)
})
.catch(function(error) {
    console.log(error)
})

function obtenerToken(respuesta) {
    let token=respuesta.token_type+" "+respuesta.access_token
    obtenerCanciones(token);    
}
function obtenerCanciones(token) {
    let uri="https://api.spotify.com/v1/artists/790FomKkXshlbRYZFtlgla/top-tracks?market=US";
    let parametrosEnvio ={
        method:"GET",
        headers:{
            authorization:token
        }
    }
    fetch(uri,parametrosEnvio)
    .then(function(respuesta){
        return(respuesta.json())   
    })
    .then(function(respuesta){
        console.log(respuesta)
        pintarDatos(respuesta)
    })
    .catch(function(error){
        console.log(error)
    })
      
}
function pintarDatos(datos){
    let fila=document.getElementById("fila")
    datos.tracks.forEach(function(cancion){
        console.log(cancion.name)
        console.log(cancion.preview_url)
        console.log(cancion.album.images[0].url)
        console.log(cancion.popularity)
        //CREAR UN DIV CON JS
        let columna=document.createElement("div")
        columna.classList.add("col")

        //CREO UN DIV QUE SIRVE DE TARJETA
        let tarjeta=document.createElement("div")
        tarjeta.classList.add("card")
        tarjeta.classList.add("h-100")

        //CREO UN AUDIO
        let audio=document.createElement("audio")
        audio.classList.add("w-100")
        audio.controls=true
        audio.src=cancion.preview_url     
        
        let texto=document.createElement("p")
        texto.classList.add("h-100")
        texto.innerHTML="Nivel de popularidad: "+cancion.popularity

        let nombre=document.createElement("p")
        nombre.classList.add("h-100")
        nombre.innerHTML=cancion.name

        //CREO UNA IMG DE TARJETA
        let imagen=document.createElement("img")
        imagen.classList.add("card-img-top")
        imagen.src=cancion.album.images[0].url       

        //PADRES E HIJOS
        tarjeta.appendChild(imagen)
        tarjeta.appendChild(audio)
        tarjeta.appendChild(nombre)
        tarjeta.appendChild(texto)
        columna.appendChild(tarjeta)
        fila.appendChild(tarjeta)        
    })
}


var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}