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


    // ! Validación ReleaseDate
    if(!gameData.releaseDate) errors.releaseDate = 'The release date cannot be empty'


    // ! Validación Rating
    if(!gameData.rating) errors.rating = 'The rating cannot be 0'


    // ! Validación Platform
    if(!gameData.platforms) errors.platforms = 'You must select at least one platform'


    // ! Validación Genre
    if(gameData.genre.length < 1) errors.genre = 'You must select at least one gender'

   return errors;
}