window.Vue = require('vue');
window.$ = window.jQuery = require('jquery');


//Интернациализация
import VueI18n  from 'vue-i18n';
import locales  from './vue-i18n-locales';

const i18n = new VueI18n({
    locale: 'ru', // set locale
    messages:locales, // set locale messages
});
//end Интернациализация


//"Стандартная" валидация полей формы0000
//Включить директиву, определённую во внешнем файле (в файле b421validatorsdirective.js директива b421validators определяется глобально)
require('../../../b421validatorsdirective');

//класс с методами валидации. При использовании более ранних (или более поздних) версий bootstrap 
//(или если поля ввода вашей формы будет иметь иную верстку чем в документации бутстрап 4.2.1)
//надо наследоваться от этого класса и перегружать view* - методы (методы, начинающиеся со слова view)
//импортировать в этом случае конечно надо наследник, а не родитель
import B34Validators  from './b34validators';
//Обрати внимание на передачу B421Validators в app.data 
// / "Стандартная" валидация полей формы

Vue.component('login-form-b34', require('./views/Loginform34'));

window.app = new Vue({
    i18n : i18n,
    el: '#appB34',

   /**
    * @property Данные приложения
   */
   data: {
     //Его будем использовать
     formInputValidator: B34Validators
   },
   /**
    * @description Событие, наступающее после связывания el с этой логикой
   */
   mounted() {
    
   },
   /**
    * @property methods эти методы можно указывать непосредственно в @ - атрибутах
   */
   methods:{
    /**
     * @return String title
    */
    getTitle(){
        return document.getElementsByTagName('title')[0].innerHTML.trim();
    }
   }//end methods

}).$mount('#appB34');
