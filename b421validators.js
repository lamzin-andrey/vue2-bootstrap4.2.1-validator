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
        //console.log('Call validation ' + method + ' for ', jInp);
        let val = jInp.val(),
            errorText;

        if (jInp.attr('type') == 'checkbox') {
            val = '';
            if (jInp.prop('checked')) {
                val = jInp.val();
            }
        }
        
        jInp.viewVoices = jInp.viewVoices || {};
        jInp.viewVoices[method] = jInp.viewVoices[method] || {neutral:0, error:0, success:0};
        if (!Validator[method](val, args) ) {
            if (eventType == 'submit') {
                errorText = t(message);
                jInp.viewVoices[method].neutral = 0;
                jInp.viewVoices[method].success = 0;
                jInp.viewVoices[method].error = 1;
                this.viewSetError(jInp, errorText);
                event.preventDefault();
                return false;
            } else {
                jInp.viewVoices[method].error = 0;
                this.viewClearError(jInp);
                jInp.viewVoices[method].neutral = 1;
                jInp.viewVoices[method].success = 0;
                this.viewClearSuccess(jInp);
            }
        } else {
            if (eventType == 'input') {
                //console.log(method + ` mean than ${val} is valid!`);
                jInp.viewVoices[method].success = 1;
                jInp.viewVoices[method].neutral = 0;
                
                //set success view only if all validators return true
                if (this._isAllValidatorsSuccess(jInp)) {
                    //console.log(`All validators  mean, than value is valid, set success view`);
                    this.viewSetSuccess(jInp);
                }

                
            }
        }
        return true;
    }
    /**
     * @description Проверка, все ли назначенные полю ввода валидаторы вернули true
     * @param {jQueryInput} jInp
     * @param Boolean true if all field validators return true
    */
    static _isAllValidatorsSuccess(jInp) {
        if (jInp.viewVoices) {
            let i, v;
            for (i in jInp.viewVoices) {
                v = parseInt(jInp.viewVoices[i].success);
                if ( !isNaN(v) && v == 0) {
                    //console.log(`method ${i} mean, than value is invalid, set success view cancel`);
                    return false;
                }
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
     * @description Валидация длины значения введённого в поле формы
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
     * @param {Array} args массив целых значений
    */
    static length(event, jInp, eventType, t, args) {
        return this._captureInput(event, jInp, eventType, t, 'isValidLength', 'app.InvalidPasswordLength', args);
    }
    /**
     * @description Валидация равенства значений, введённых в поля формы
     * Метод вызывается при отправке формы и при вводе в форму значения (события form.submit и input.input)
     * @param {Event} event
     * @param {jQueryInput} inp
     * @param {jQueryInput} jInp - одно из полей формы
     * @param {String} eventType
     * @param {Function} t Функция локализации (трансляции)
     * @param {Array} args массив строковых значений. В нулевом элементе содержится id второго поля
    */
    static equiv(event, jInp, eventType, t, args) {
        let jInp2 = $('#' + args[0]), val = '', args2 = [];
        if (jInp2[0]) {
            val = jInp2.val();
        }
        args2[0] = val;
        return this._captureInput(event, jInp, eventType, t, 'isEquiv', 'app.PasswordsIsDifferent', args2);
    }
    /**
     * @description Получить объект landlib/nodom/validator
     * @return Validator
     */
    static getValidator() {
        return Validator;
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
