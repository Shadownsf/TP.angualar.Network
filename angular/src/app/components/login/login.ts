import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin, AuthenticatedUser } from 'models';
import { AuthenticationService,  } from '../../services/index';
import { NzMessageService } from 'ng-zorro-antd';

/**
 * Connecte un utilisateur à la plateforme
 */
@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    model = new UserLogin();
    failed = false;

    constructor(
        private authService: AuthenticationService,
        private messageService: NzMessageService,
        private router: Router
    ) { }

    async login() {
        this.failed = false;
        try {
            let promiseAuthdUser:  Promise<AuthenticatedUser>;

            // TODO utiliser authService en async/await pour authentifier l'utilisateur
            promiseAuthdUser = this.authService.authenticate(this.model);

            promiseAuthdUser
                .then((value) => {
                    if (value.accessToken) {
                        // TODO redirection sur "/"
                        this.failed = false;
                        this.router.navigate(["/"]);
                    }
                } , reason => {
                    this.messageService.error('Login Failed');
                    console.error( reason );
                });
        }
        catch (e) {
            return this.failed = true;
        }
    }
}
