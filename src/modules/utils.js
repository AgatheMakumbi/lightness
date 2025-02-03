"use strict";
//importer le module color-convert
import * as convert from "color-convert";

//generatePalette une fonction qui va recevoir un code hexadécimal et entrée et retourner un tableau avec des couleurs au format HSL
function generatePalette(hexColor){
    //verifier si la couleur est bien en hexadécimal
    if (!hexColor.startsWith("#")) {
        throw new Error("Invalid hex color");
    };
    let hsl_tab = [];
    // Conversion hex -> hsl
    const hslColor =convert.hex.hsl(hexColor);

    //décomposition du tableau hslColor
    const [hue,saturation] = hslColor;
    //boucle pour générer 10 couleurs
    for (let i = 0; i <= 100; i+=10) {
        let lightness = i;
        hsl_tab.push([hue,saturation, lightness ]);
    };
    //tableau retourné par la fonction
    return hsl_tab;
};


//console.log(generatePalette("#F15025"));

