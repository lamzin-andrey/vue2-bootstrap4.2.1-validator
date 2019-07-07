<template>
    <form @submit="onSubmitLoginForm" class="" action="" method="POST"  novalidate="novalidate">
					<!-- Email -->
					<div class="form-group ">
						<label for="inputEmail" class="control-label">{{ $t('app.email') }}</label>
						<input
                            v-model="email"
							v-b421validators="'required,email'"
							:placeholder="$t('app.EnterEmail')"
						type="email" class="form-control" id="inputEmail"  required>
						<span class="hide glyphicon form-control-feedback glyphicon-remove" aria-hidden="true"></span>
						<div class="help-block with-errors">
							<ul class="list-unstyled">
								<li></li>
							</ul>
						</div>
					</div>
					
					<!-- Password -->
					<div class="form-group ">
						<label for="inputPassword" class="control-label">{{ $t('app.Passsword') }}</label>
						<input 
                            v-model="password"
							v-b421validators="'required,password,length3_16'"
							:placeholder="$t('app.EnterPassword')"
						type="password" class="form-control" id="inputPassword"  required>
						<span class="hide glyphicon form-control-feedback glyphicon-remove" aria-hidden="true"></span>
						<div class="help-block with-errors">
							<ul class="list-unstyled">
								<li></li>
							</ul>
						</div>
					</div>
					
					<div class="text-right">
						<button type="submit" class="btn btn-primary">{{ $t('app.LoginFormButtonText') }}</button>
					</div>
				</form>
</template>
<script>
    export default {
        name: 'Loginform34',
        //вызывается раньше чем mounted
        data: function(){return {
            //Значение email
            email:null,
            //Значение password
            password:null
        }; },
        //
        methods:{
            /** 
             * TODO localize
             * @description Пробуем отправить форму
            */
            onSubmitLoginForm(evt) {
                //it patch, because this is demo
                evt.preventDefault();
            },
           
        }, //end methods
        //вызывается после data, поля из data видны "напрямую" как this.fieldName
        mounted() {
            var self = this;
            /*this.$root.$on('showMenuEvent', function(evt) {
                self.menuBlockVisible   = 'block';
                self.isMainMenuVisible  = true;
                self.isScrollWndVisible = false;
                self.isColorWndVisible  = false;
                self.isHelpWndVisible   = false;
                self.nStep = self.$root.nStep;
            })/**/
            console.log('I mounted!');
        }
    }
</script>