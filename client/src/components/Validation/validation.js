// const emailRegex = /[\w_.-]+@[\w.-]+[.][a-z]+/i
// const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,10}$/i
// Lockhead positivo. Tiene que haber por lo menos: w->letras d->numeros
// El segundo lockhead obliga que tenga una mayuscula

const regexNotSimbols = /[A-Za-z0-9]+/

export const validation = (gameData) => {
    const errors = {};

    // ! Validación Name
    if(!gameData.name) errors.name = 'The field cannot be empty'
          
    else if (gameData.name.length > 50) errors.name = 'The name can contain a maximum of 50 characters'
    
    else if (!regexNotSimbols.test(gameData.name)) errors.name = "The name can't contain simbols"


    // ! Validación Image
    if (!gameData.image) errors.image = 'The field cannot be empty'


    // ! Validación description
    if (!gameData.description) errors.description = 'The field cannot be empty'
        
    else if (!regexNotSimbols.test(gameData.description)) errors.description = "The description can't contain simbols"

    // ! Validación rating
    if(!gameData.releaseDate) errors.releaseDate = 'The rating cannot be 0'

   return errors;
}