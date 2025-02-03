import {generatePalette,convertHextoHsl,convertHsltoCSSHsl} from "./modules/utils.js";
import Color from "./modules/Color.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

// Instancier Notyf
const notyf = new Notyf();
const main = document.querySelector("main");

const displayColors = (palette,hexColor) => {
    //Reset du container
    main.innerHTML = " ";
    const lineargradient =[];
    
    //Affichage du container
    const header = document.querySelector("header");
    header.classList.add("minimized");

    //Ombre du container
    const InputColorHsl = convertHextoHsl(hexColor);
    const csshsl =  convertHsltoCSSHsl(InputColorHsl);
        //vous pouvez modifier la variable css avec la méthode element.style.setProperty(property, value) Vous pouvez aller chercher l’élément :root avec document.documentElement. 
    document.documentElement.style.setProperty("--shadow-color", csshsl);

    console.log(lineargradient);
    document.body.style.backgroundColor=`linear-gradient(-45deg, ${lineargradient[1]},${lineargradient[5]},${lineargradient[10]})`;
    document.body.style.backgroundSize = `400% 400%`

    palette.map((c) => new Color(c).display(main));

    /* palette.forEach((color) => {
        console.log(color);
        const colorInstance = new Color(color);
        console.log(colorInstance);
        colorInstance.display(document.querySelector("main"));
        lineargradient.push(colorInstance.hex);
    }); */

};

//Un Event Listener sur l’élément <form>.
document.querySelector("form").addEventListener("submit", (e) => {
    //console.log("submit");  
    e.preventDefault();
    
    //Chercher la valeur de l’élément <input>
    // À l'intérieur du callback de l'événement
    //const hexColor = document.querySelector("input").value;
    const hexColor = e.target.firstElementChild.value;
    if(!/^#[0-9A-F]{6}$/i.test(hexColor)){
        notyf.error(`${hexColor}is not a valid Hexadecimal color !`);
        throw new Error(`${hexColor}is not a valid Hexadecimal color !`);  
    }
    const palette = generatePalette(hexColor);
    displayColors(palette,hexColor);
    console.log(palette);
    
    
    
    
    
});
//Lorsqu’un click est détecté, trouvez la cible de l’élément du click (qui doit être une élément <div> avec la classe color) et récupérez son attribut de donnée data-color. 
const copyColor = async(e) => {
    if(e.target.classList.contains("color")){
        const dataColor = e.target.dataset.color;
        console.log(dataColor);
        
        await navigator.clipboard.writeText(dataColor);
            
        
        notyf.success(`copied${dataColor} to clipboard`);
        
    };
};
main.addEventListener("click", copyColor);
