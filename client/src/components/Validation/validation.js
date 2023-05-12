// const emailRegex = /[\w_.-]+@[\w.-]+[.][a-z]+/i
// const passwordRegex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,10}$/i
// Lockhead positivo. Tiene que haber por lo menos: w->letras d->numeros
// El segundo lockhead obliga que tenga una mayuscula

const regexNotSimbols = /^[A-Za-z-._]+/

export const validation = (gameData) => {
    const errors = {};

    // ! Validación Name

    switch(gameData.name) {
        case '':
            errors.name = 'The field cannot be empty'
            break;

        case gameData.name.length > 50:
            errors.name = 'The name can contain a maximum of 50 characters'
            break;

        case !regexNotSimbols.test(gameData.name):
            errors.name = "The name can't contain simbols"
            break;

        default: 
            break;
    }

    // ! Validación Image

    if (gameData.name) errors.name = 'The field cannot be empty'
    
    // ! Validación description
    
    switch(gameData.description) {
        case '':
            errors.description = 'The field cannot be empty'
            break;

        case !regexNotSimbols.test(gameData.description):
            errors.description = "The name can't contain simbols"
            break;

        default: 
            break;
    }

    // ! Validación Rating

    switch(gameData.rating) {
        case '':
            errors.rating = 'The field cannot be empty'
            break;

        case typeof(gameData.rating) != 'number':
            errors.rating = 'Rating only can contain numbers'
            break;

        case gameData.rating < 0 :
            errors.rating = 'Rating must be a number between 0 and 5'
            break;

        case gameData.rating > 5 :
            errors.rating = 'Rating must be a number between 0 and 5'
            break;

        default: 
            break;
    }

    return errors

}