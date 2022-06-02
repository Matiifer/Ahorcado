var palabras = ["HOLA", "MANDAR", "DALEROJO", "CAI", "BOCHINI", "ROJO", "GUADA"];
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
var palabra_random;
var ingresadas = [];
var aciertos = 0;
var errores = 0;
var x_inicial = 655;
var puede_jugar = false;

var boton_juego = document.querySelector("#btn_juego");
boton_juego.addEventListener("click", function(){
    var div_juego = document.querySelector("#div_juego");
    var div_principal = document.querySelector("#div_principal");
    div_juego.classList.replace("oculto", "div_juego");
    div_principal.classList.replace("div_principal", "oculto");

    jugar();
})

var boton_agregar = document.querySelector("#btn_agregar");
boton_agregar.addEventListener("click", function(){
    var div_agregar = document.querySelector("#div_agregar");
    var div_principal = document.querySelector("#div_principal");
    div_agregar.classList.replace("oculto", "div_agregar");
    div_principal.classList.replace("div_principal", "oculto");
})

var boton_cancelar = document.querySelector("#btn_cancelar");
boton_cancelar.addEventListener("click", function(){
    var div_agregar = document.querySelector("#div_agregar");
    var div_principal = document.querySelector("#div_principal");
    div_agregar.classList.replace("div_agregar", "oculto");
    div_principal.classList.replace("oculto", "div_principal");

    var area_texto = document.querySelector("#area_agregar");
    area_texto.value = "";
})

var boton_guardar = document.querySelector("#btn_guardar");
boton_guardar.addEventListener("click", function(){
    var area_texto = document.querySelector("#area_agregar");
    var palabra_nueva = area_texto.value;
    palabra_nueva = palabra_nueva.toUpperCase();
    if (palabra_nueva.length <= 8){
        palabras.push(palabra_nueva);
        jugar();
    } else{
        alert("No se pudo agregar la palabra, supera el maximo de 8 letras");
    }
    area_texto.value = "";

    var div_agregar = document.querySelector("#div_agregar");
    var div_juego = document.querySelector("#div_juego");
    div_agregar.classList.replace("div_agregar", "oculto");
    div_juego.classList.replace("oculto", "div_juego");
})

var boton_desistir = document.querySelector("#btn_desistir");
boton_desistir.addEventListener("click", function(){
    var div_juego = document.querySelector("#div_juego");
    var div_principal = document.querySelector("#div_principal");
    div_juego.classList.replace("div_juego", "oculto");
    div_principal.classList.replace("oculto", "div_principal");
    pincel.clearRect(0, 0, 1200, 800);
    puede_jugar = false;
})

var boton_nuevo_juego = document.querySelector("#btn_nuevo_juego");
boton_nuevo_juego.addEventListener("click", function(){
    pincel.clearRect(0, 0, 1200, 800);
    jugar();
})

function jugar(){
    var numero_random = Math.round(Math.random()*(palabras.length - 1));
    palabra_random = palabras[numero_random];

    ingresadas = [];
    aciertos   = 0;
    errores    = 0;
    x_inicial = 655;
    puede_jugar = true;
    dibujar_campo(palabra_random);
}

function dibujar_campo(palabra_random){
    pincel.fillStyle = "#0A3871";
    var x = 650;
    for (var i = 0; i < palabra_random.length; i++){
		pincel.fillRect(x,630,60,4);
        x = x + 70;
    }
    pincel.fillRect(830,470,294,5);
}

document.addEventListener("keydown", function(event){
    var letra = event.key;
    
    if (puede_jugar){
        var letra_valida = verificar_letra(letra);
        if (letra_valida){
            letra = letra.toUpperCase();
            if (palabra_random.includes(letra)){
                dibujar_letra(letra, palabra_random);
            } else{
                errores += 1;
                dibujar_error(letra, errores);
            }
        }
    }
})

function verificar_letra(letra){
    if ((letra.length == 1)){
        if (!ingresadas.includes(letra)){
            ingresadas.push(letra);
            return true;
        }
    }
    return false;
}

function dibujar_letra(letra, palabra_random){
    pincel.font = "50px normal";
    pincel.fillStyle = "#0A3871";
    
    var posiciones = [];
    for (var i = 0; i < palabra_random.length; i++){
        if (palabra_random[i] == letra){
            posiciones.push(i);
            aciertos += 1;
        }
    }
    for (var i = 0; i < posiciones.length; i++){
        if (posiciones[i] == 0){
            var x = 655;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 1){
            var x = 725;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 2){
            var x = 795;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 3){
            var x = 865;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 4){
            var x = 935;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 5){
            var x = 1005;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 6){
            var x = 1075;
            pincel.fillText(letra, x, 620, 80);
        }
        if (posiciones[i] == 7){
            var x = 1145;
            pincel.fillText(letra, x, 620, 80);
        }
    }
    if (aciertos == palabra_random.length){
        pincel.fillStyle = "green";
        pincel.fillText("Ganaste, felicidades!", 350, 470, 180);
        puede_jugar = false;
    }
}

function dibujar_error(letra, errores){
    pincel.font = "50px normal";
    pincel.fillStyle = "#0A3871";
    pincel.fillText(letra, x_inicial, 700, 20);
    x_inicial += 20;
    dibujar_munieco(errores);
}

function dibujar_munieco(error){
    pincel.fillStyle = "#0A3871";
    if (error == 1){
        pincel.fillRect(877,110,5,360);
    }
    if (error == 2){
        pincel.fillRect(877,110,100,5);
    }
    if (error == 3){
        pincel.fillRect(977,110,5,49);
    }
    if (error == 4){
        pincel.beginPath();
        pincel.arc(977, 189, 30, 0, 2*3.14);
        pincel.lineWidth = 3;
        pincel.strokeStyle = "#0A3871";
        pincel.stroke();
    }
    if (error == 5){
        pincel.fillRect(977,219,5,135);
    }
    if (error == 6){
        pincel.moveTo(977,218);
        pincel.lineTo(1027,268);
        pincel.lineWidth = 3.5;
        pincel.strokeStyle = "#0A3871";
        pincel.stroke();
    }
    if (error == 7){
        pincel.moveTo(978,219);
        pincel.lineTo(928,269);
        pincel.lineWidth = 3.5;
        pincel.strokeStyle = "#0A3871";
        pincel.stroke();
    }
    if (error == 8){
        pincel.moveTo(979,353);
        pincel.lineTo(1029,403);
        pincel.lineWidth = 3.5;
        pincel.strokeStyle = "#0A3871";
        pincel.stroke();
    }
    if (error == 9){
        pincel.moveTo(979,353);
        pincel.lineTo(929,403);
        pincel.lineWidth = 3.5;
        pincel.strokeStyle = "#0A3871";
        pincel.stroke();

        pincel.fillStyle = "red";
        pincel.fillText("Fin del juego", 350, 470, 180);
        puede_jugar = false;
    }
}