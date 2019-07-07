//включить пользовательскую библиотеку из внешней папки
import Validator  from '../landlib/nodom/validator';

class B421Validators {
    /**
     * @description Валидация поля формы типа email
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
    */
    static email(event, jInp, eventType, t) {
        return this._captureInput(event, jInp, eventType, t, 'isValidEmail', 'app.IncorrectEmail');
    }
    /**
     * @description Общая логика для всех валидаций
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
     * @param {String} method Метод объекта Validator
     * @param {String} message Сообщение об ошибке
     * @param {Array}  args аргументы для метода валидации длины
    */
    static _captureInput(event, jInp, eventType, t, method, message, args) {
        //console.log('Call validation ' + method + '!');
        let val = jInp.val(),
            errorText;
        if (!Validator[method](val, args) ) {
            if (eventType == 'submit') {
                errorText = t(message);
                this.viewSetError(jInp, errorText);
                event.preventDefault();
                return false;
            } else {
                this.viewClearError(jInp);
                this.viewClearSuccess(jInp);
            }
        } else {
            if (eventType == 'input') {
                this.viewSetSuccess(jInp);
            }
        }
        return true;
    }
    /**
     * @description Валидация поля формы типа password
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
    */
    static password(event, jInp, eventType, t) {
        return this._captureInput(event, jInp, eventType, t, 'isValidPassword', 'app.InvalidPasswordMsg');
    }

    /**
     * @description Валидация поля формы обязательных для заполнения
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
     * 
    */
   static required(event, jInp, eventType, t) {
        return this._captureInput(event, jInp, eventType, t, 'isRequired', 'app.FormFieldRequired');
   }
   /**
     * @description Валидация поля формы типа password
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
    */
    static length(event, jInp, eventType, t, args) {
        return this._captureInput(event, jInp, eventType, t, 'isValidLength', 'app.InvalidPasswordLength', args);
    }
    /**
     * @description Установить вид "Ошибка" и текст ошибки
     * @param {jQueryInput} jInp 
     * @param {String} errorText 
     */
    static viewSetError(jInp, errorText) {
        jInp.addClass('is-invalid');
        jInp.parent().find('.invalid-feedback').text(errorText);
    }
    /**
     * @description Установить вид "Ошибка" и текст ошибки
     * @param {jQueryInput} jInp 
     * @param {String} errorText 
     */
    static viewSetSuccess(jInp) {
        this.viewClearError(jInp);
        jInp.addClass('is-valid');
    }
    /**
     * @description Удалить вид "Ошибка" и очистить текст ошибки
     * @param {jQueryInput} jInp 
     */
    static viewClearError(jInp) {
        jInp.removeClass('is-invalid');
        jInp.parent().find('.invalid-feedback').text('');
    }
    /**
     * @description Удалить вид "Отличное значение"
     * @param {jQueryInput} jInp 
     */
    static viewClearSuccess(jInp) {
        jInp.removeClass('is-valid');
    }
}
export default B421Validators;
