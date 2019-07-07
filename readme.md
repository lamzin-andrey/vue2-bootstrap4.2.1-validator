# Назначение


 Сделать поддержку директивы (атрибута) v-b421validators в проектах использующих vue 2.5.17 и bootstrap 4.2.1
 
 для полей ввода
 
 input[type=text]
 
 input[type=number]
 
 input[type=password]
 
 input[type=email]
 
Работает со стандартной версткой полей ввода bootstrap 4.2.1 вида

```html
<div class="col-md-6 mb-3">
  <label for="iPassword">Password</label>
  <input type="password" class="form-control is-invalid" id="iPassword" placeholder="Enter password" required>
  <div class="invalid-feedback">
	Password must containts numbers and letters different case: upper and lower.
  </div>
</div>
```

Для указанного примера программист может добавить 
атрибут v-b421validators="'password,required,length3_16'" полю input[type=password]. (кавычки внутри кавычек важны).


Директива перехватывает событие submit формы, в которой содержится поле ввода и если введенное значение не валидно,
 добавляет класс is-invalid и заполняет div.invalid-feedback локализованым сообщением. 
(Функцию локализации можно передать в конструктор например так: oB421Validator = new B421Validator(t);)

Директива перехватывает событие input поля ввода, удаляет is-invalid при начале ввода и очищает div.invalid-feedback.
Если в процессе ввода введено валидное значение, добавляет полю ввода класс is-valid.

Для использования другой верстки (или других версий бутстрап) надо наследоваться от класса B421Validators
и переопределить методы, начинающиеся с view*


# Использование 

## (файл app.js):

```javascript
window.Vue = require('vue');

//Интернациализация (Это важно, так как сейчас валидатор фактически зависит от функции $t которую предоставляет vue-i18n v7.0.0)
//Он обращается к ней как к vnode.context.$root.$t - это не очень гибко, но в принципе даёт возможность для использования других решений для локализации.

import VueI18n  from 'vue-i18n';
import locales  from './vue-i18n-locales';

const i18n = new VueI18n({
    locale: 'ru', // set locale
    messages:locales, // set locale messages
});
//end Интернационализация

//"Стандартная" валидация полей формы
//Включить директиву, определённую во внешнем файле 
//(в файле b421validatorsdirective.js директива b421validators определяется глобально)
require('../../../bootstrap421-validators/b421validatorsdirective');

//класс с методами валидации. При использовании более ранних (или более поздних) версий bootstrap 
//(или если поля ввода вашей формы будет иметь иную верстку чем в документации бутстрап 4.2.1)
//надо наследоваться от этого класса и перегружать view* - методы (методы, начинающиеся со слова view)
//импортировать в этом случае конечно надо наследник, а не родитель

import B421Validators  from '../../../bootstrap421-validators/b421validators';
//Обрати внимание на передачу B421Validators в app.data 

// end "Стандартная" валидация полей формы

//Подключили какой-то компонент с формой, для полей которой хотим использовать директиву
Vue.component('login-form', require('./views/Loginform'));

window.app = new Vue({
	//Не забываем, что для текущей реализации это важно! (см. выше, секцию Интернациализация)
    i18n : i18n,
    el: '#wrapper',

   // router,
   /**
    * @property Данные приложения
   */
   data: {
     //formInputValidator Это важно, так как b421validatorsdirective будет искать именно vnode.context.$root.formInputValidator
     formInputValidator: B421Validators
     //...
   },
   /**
    * @description Событие, наступающее после связывания el с этой логикой
   */
   mounted() {
		//...
   },
   /**
    * @property methods эти методы можно указывать непосредственно в @ - атрибутах
   */
   methods:{
    //...
   }//end methods

}).$mount('#wrapper');
```

## Вёрстка

Надо добавить директиву вида `v-b421validators="'password,required,length3_16'"` полю ввода. Кавычки внутри кавыяек важны.

## Реализованные значения атрибута v-b421validators:

`email`

`password`

`required`

`lengthMIN_MAX` (например `length3_16`)

## Зависимости:

Помимо указанных в 

examples/package.json,

npm-help.txt

и подключаемых в app.js файлов из данного репозитория
https://github.com/lamzin-andrey/vue2-bootstrap4.2.1-validator

используется файл 
https://github.com/lamzin-andrey/landlib/blob/master/nodom/validator.js

Позже экспортирую npm пакет.




## Гибкость:

### Изменения логики. 

Добавление новых валидаторов (или изменение старых, например для пароля у вас могут быть более 
мягкие или более жёсткие требования):

Наследуемся от B421Validators
перегружаем (для примера) метод password.

Понадобилось добавить ограничение длины только в меньшую сторону
Добавляем в наследник метод min_length, реализуем его по аналогии length.

В атрибуте v-b421validators добавляем min_length7_1 (Второе число на данный момент обязательно, но ваш новый метод его может просто игнорировать).


### Изменения вёрстки.

В наследнике перегружаем view* методы (имена которых начинаются с view*)

Если верстка содержит много разных вариантов верстки поля, совмещаем изменения логики и верстки:
 определяем новые методы валидации, которые вызывают новые методы view*. Прописываем в атрибут, где надо.
 
### Смена фреймвёрка.

Судьба забросила вас из vue в angular или ещё куда-то.

Класс B421Validators и объект Validator никак не зависят от vue - вам остаётся только написать аналог директивы b421validators
для нового фреймвёрка. И даже в ванильном js это можно будет использовать.


