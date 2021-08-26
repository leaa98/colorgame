////////////////////////////////////////////////////////////////////////////////////////////////

let square = document.querySelectorAll(".square"); //arreglo de "cuadrados"
let colors = []; //arreglo para guardar colores utilizados por los cuadrados
let pickedColor; //variable para guardar el color seleccionado para jugar
let flag = false;
let dif = document.querySelector(".dropdown-menu").children
let numsquare = 24;
let btndif = document.getElementById("dropdownMenuButton")
let start = true;
let botonstart = document.querySelector("#play");
///////////////////////////////////////////////////////////////////7////////////////////////
for (let i = 0; i < dif.length; i++) {
    dif[i].addEventListener("click", function () {
        if (this.textContent == "Facil") {
            dificultad(3, "square1", "square");
            numsquare = 3;
        } else if (this.textContent == "Normal") {
            dificultad(6, "square1", "square");
            numsquare = 6;

        } else if (this.textContent == "Dificil") {
            dificultad(12, "square", "square1");
            numsquare = 12;

        } else {
            dificultad(24, "square", "square1");
            numsquare = 24;
        }

    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    botonstart.addEventListener("click", function(){
        document.querySelector(".message").textContent = ""
        document.querySelector(".titulo").style.color = "rgb(255, 255, 255)";
        document.querySelector("#play").innerHTML = "Restart"
        btndif.disabled = true;
        for (let i = 0; i < numsquare; i++) {
            colors.push(colorRandom()); // se guarda el color, que se genera aleatoriamente en el metodo, dentro del arreglo

            square[i].style.backgroundColor = colors[i]; //se asigna el color al cuadrado

            square[i].addEventListener("click", changeColors)

        }

        pickColor(); //se llama al metodo pickcolor para selecionar aleatoriamente el color a adivinar

        document.querySelector("span").textContent = pickedColor;
     
       

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    function colorRandom() {

        let color = "rgb(";

        for (let i = 0; i < 3; i++) { // el for da 3 vueltas, para cumplic con el codigo rgb


            if (i == 2) {

                color += (Math.round(Math.random() * 256 - 1).toString()).concat(")"); //se genera aleatoriamente un numero entre 0 y 255 y luego se concatena en la variable local color

            } else {

                color += (Math.round(Math.random() * 256 - 1).toString()).concat(", "); //se genera aleatoriamente un numero entre 0 y 255 y luego se concatena en la variable local color

            }
        }
        return color;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////

    function pickColor() {
        pickedColor = "";
        let index = Math.round(Math.random() * colors.length - 1);
        if (index < 0)
            index = 1;

        pickedColor = colors[index]; //se elige aleatoriamente el color a partir del arreglo que contiene los colores usados por los cuadrados
        colors = [];
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function changeColors() { //se crea un evento para cada cuadrado

        let clickedColor = this.style.backgroundColor; //se asigna el color del cuadrado cliqueado dentro de la variable
        if (clickedColor == pickedColor) {
            for (let i = 0; i < square.length; i++) { //si coincide con el seleccionado para jugar, todos los cuadrados tendrán el mismo color

                square[i].style.backgroundColor = pickedColor;
                document.querySelector("h1").style.color = pickedColor;

            }
            document.querySelector(".message").textContent = "Correct!"
            btndif.disabled = false;
            botonstart.innerHTML = "Play Again?"
        } else {

            this.style.backgroundColor = "rgb(35, 35, 35)"; //si no coincide, el cuadrado cliqueado será de ese color
            document.querySelector(".message").textContent = "Try Again"
        }

    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function dificultad(squares, classuse, classdel) {

        for (let i = squares; i < square.length; i++) {

            square[i].classList.add("hide")
        }

        for (let i = 0; i < squares; i++) {
            square[i].classList.remove("hide")
            square[i].classList.remove(classdel)
            square[i].classList.add(classuse)

        }

    }

}