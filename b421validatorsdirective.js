Vue.directive('b421validators', {
    inserted:function(el, binding, vnode) {
        console.log('Hello! b421validators!');
        /**
         * @description Set event listener on form input and form
         * Установить обработчик события на поле ввода и форме
         * @param {jQueryInput} $el 
         * @param {String} eventName 
         * @param {B421Validators} obj 
         * @param {Function} t 
         * @param {String} fName 
         * @param {jQueryForm} $form
         * @param {Array} args аргументы для метода валидации (длины)
         */
        function _setListener($el, eventName, obj, t, fName, $form, args){
            let a = $form ? $form : $el;
            a.on(eventName, (event) => { return obj[fName](event, $el, eventName, t, args); });
        }

        let $el = $(el), $form = $el.parents('form').first(),
            args = String(binding.expression).split(','), i, func,
            validator = vnode.context.$root.formInputValidator,
            aValidatorMethodArgs = [],
            bLengthCond = true;
        for (i = 0; i < args.length; i++) {
            func = args[i].trim().replace(/["'\d_]/g, '');
            if (func == 'length') {
                bLengthCond = false;
                aValidatorMethodArgs = args[i].trim().replace(func, '').split('_');
                if (aValidatorMethodArgs.length == 2) {
                    bLengthCond = true;
                }
            }
            if (validator && validator[func] instanceof Function && bLengthCond) {
                //Так нельзя, ибо js всё развивается, а древние грабли по-прежнему с нами
                //$el.on('input', (event) => { console.log(func + '!'); return validator[func](event, $el, 'input', vnode.context.$root.$t); });
                //вместо этого вот так: (иначе последний листенер два раза назначится)
                _setListener($el, 'input', validator, vnode.context.$root.$t, func, null, aValidatorMethodArgs);
                _setListener($el, 'submit', validator, vnode.context.$root.$t, func, $form, aValidatorMethodArgs);
            }
        }
    }
    
});