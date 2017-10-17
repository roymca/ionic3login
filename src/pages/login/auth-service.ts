import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

isLoggedin: boolean;
    AuthToken;
    
    constructor(public http: Http) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
	
	storeUserCredentials(token) {
		console.log(token);
        window.localStorage.setItem('id', token);
        this.useCredentials(token);
        
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('id');
        this.useCredentials(token);
    }
    
    destroyUserCredentials() {
		console.log(window.localStorage);
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
		console.log(window.localStorage);
    }
    
    authenticate(user) {
		console.log(user);
        //var creds = "&email=" + user.email + "&password=" + user.password;
        console.log(user.email);
		console.log(user.password);
		
        return new Promise(resolve => {
            this.http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php?requestMethod=login&email='+user.email+'&password='+user.password).map(res => res.json()).subscribe(data => {
				console.log(data);
                if(data.status == 1){
                    this.storeUserCredentials(data.id);
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }
	
    adduser(user) {
        var creds = "name=" + user.email + "&password=" + user.password;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', creds, {headers: headers}).subscribe(data => {
                if(data.json().success){
                    resolve(true);
                }
                else
                    resolve(false);
            });
        });
    }
    
    getinfo() {
        return new Promise(resolve => {
            var headers = new Headers();
            this.loadUserCredentials();
            console.log(this.AuthToken);
            headers.append('Authorization', 'Bearer ' +this.AuthToken);
            this.http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php', {headers: headers}).subscribe(data => {
                if(data.json().success)
                    resolve(data.json());
                else
                    resolve(false);
            });
        })
    }
    
    logout() {
        this.destroyUserCredentials();
    }
}
