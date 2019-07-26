Vue.directive('b421validators', {
    inserted:function(el, binding, vnode) {
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
		
		/**
         * @description Set form reset listener 
         * Установить обработчик события reset формы
         * @param {jQueryInput} $el 
         * @param {B421Validators} obj 
         * @param {jQueryForm} $form
         */
        function _setResetListener($el, obj, $form){
            $form.on('reset', (event) => { obj.viewClearError($el); obj.viewClearSuccess($el); });
        }

        let $el = $(el), $form = $el.parents('form').first(),
            args = String(binding.value).split(','), i, func,
            validator = vnode.context.$root.formInputValidator,
            aValidatorMethodArgs = [],
            bLengthCond = true,
            /** @let Аргумент валидации equiv*/
            equivArg = '';
        for (i = 0; i < args.length; i++) {
            func = args[i].trim().replace(/["'\d_]/g, '');
            if (func == 'length') {
                bLengthCond = false;
                aValidatorMethodArgs = args[i].trim().replace(func, '').split('_');
                if (aValidatorMethodArgs.length == 2) {
                    bLengthCond = true;
                }
            }
            if (func.indexOf('equiv') == 0) {
                func = 'equiv';
                bLengthCond = false;
                aValidatorMethodArgs = [];
                equivArg = args[i].trim().replace(func + '_', '');
                if (String(equivArg).length) {
                    bLengthCond = true;
                    aValidatorMethodArgs[0] = equivArg;
                    aValidatorMethodArgs.length = 1;
                }
            }
            if (validator && validator[func] instanceof Function && bLengthCond) {
                //Так нельзя, ибо js всё развивается, а древние грабли по-прежнему с нами
                //$el.on('input', (event) => { console.log(func + '!'); return validator[func](event, $el, 'input', vnode.context.$root.$t); });
                //вместо этого вот так: (иначе последний листенер два раза назначится)
                _setListener($el, 'input', validator, vnode.context.$root.$t, func, null, aValidatorMethodArgs);
                _setListener($el, 'submit', validator, vnode.context.$root.$t, func, $form, aValidatorMethodArgs);
                _setResetListener($el, validator, $form);
            }
        }
    }
    
});