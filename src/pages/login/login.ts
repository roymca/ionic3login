import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import{ Http } from '@angular/http';

import { AuthService } from './auth-service';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
/*	
	@ViewChild('username') uname;
	@ViewChild('password') pwd;
*/

  usercreds = {
        email: '',
        password: ''
    };

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController, public authservice: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  /*
  login(){
	  console.log(this.uname.value, this.pwd.value);
	  
	  this.http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php?requestMethod=login&email='+this.uname.value+'&password='+this.pwd.value).map(res => res.json()).subscribe(data => {
		console.log(data);
		console.log(data.status);
		
		if(data.status == 1){
			this.navCtrl.push(TabsPage);
		}
		else{
			let alert = this.alertCtrl.create({
			  title: 'Login Failed!',
			  subTitle: 'Please enter valid credentials!',
			  buttons: ['OK']
			});
			alert.present();
		}
		//this.allData = data;
	  });
    }
  */
  
  login(user) {
		console.log(user);
		
        this.authservice.authenticate(user).then(data => {
			console.log(data);
            if(data) {
                this.navCtrl.setRoot(TabsPage);
            }
			
			else{
				let alert = this.alertCtrl.create({
				  title: 'Login Failed!',
				  subTitle: 'Please enter valid credentials!',
				  buttons: ['OK']
				});
				alert.present();
			}
		});
		
	}
  
}
