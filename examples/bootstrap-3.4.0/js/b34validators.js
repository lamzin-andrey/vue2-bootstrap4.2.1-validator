//включить пользовательскую библиотеку из внешней папки
import B421Validators  from '../../../b421validators';


class B34Validators extends B421Validators{
    /**
     * @description Установить вид "Ошибка" и текст ошибки
     * @param {jQueryInput} jInp 
     * @param {String} errorText 
     */
    static viewSetError(jInp, errorText) {
        let obj = this._getElements(jInp);
        if (obj.jFormGroup[0]) {
            obj.jFormGroup.addClass('has-error').addClass('has-danger').addClass('has-feedback');
        }
        if (obj.jErrorPlace[0]) {
            obj.jErrorPlace.text(errorText);
        }
        if (obj.jCross[0]) {
            obj.jCross.removeClass('hide');
        }
    }
    /**
     * @description Установить вид "Ошибка" и текст ошибки
     * @param {jQueryInput} jInp 
     * @param {String} errorText 
     */
    static viewSetSuccess(jInp) {
        this.viewClearError(jInp);
        let obj = this._getElements(jInp);
        if (obj.jFormGroup[0]) {
            obj.jFormGroup.addClass('has-success');
        }
    }
    /**
     * @description Удалить вид "Ошибка" и очистить текст ошибки
     * @param {jQueryInput} jInp 
     */
    static viewClearError(jInp) {
        let obj = this._getElements(jInp);
        if (obj.jFormGroup[0]) {
            obj.jFormGroup.removeClass('has-error').removeClass('has-danger').removeClass('has-feedback');
        }
        if (obj.jErrorPlace[0]) {
            obj.jErrorPlace.text('');
        }
        if (obj.jCross[0]) {
            obj.jCross.addClass('hide');
        }
    }
    /**
     * @description Удалить вид "Отличное значение"
     * @param {jQueryInput} jInp 
     */
    static viewClearSuccess(jInp) {
        let obj = this._getElements(jInp);
        if (obj.jFormGroup[0]) {
            obj.jFormGroup.removeClass('has-success');
        }
    }
    /**
     * @description Получить элементы, вид которых надо изменить
     * @param {jQueryInput} jInp 
     * @return {jFormGroup, jCross, jErrorP{lace}}
     */
    static _getElements(jInp) {
        let jFormGroup = jInp.parents('.form-group').first(), jCross, jErrorPlace;
        if (jFormGroup[0]) {
            jFormGroup.removeClass('has-error').removeClass('has-danger').removeClass('has-deedback');
            jErrorPlace = jFormGroup.find('.list-unstyled li').first();
            jCross = jFormGroup.find('.form-control-feedback').first();
        }
        return {jFormGroup, jCross, jErrorPlace};
    }
}
export default B34Validators;
