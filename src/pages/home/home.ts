import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import{ Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from '../login/auth-service';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	allData : Array<any> ;

  constructor(public navCtrl: NavController, public app: App, public http: Http, public authservice: AuthService) {

  }
  
  ionViewDidLoad(){
	  this.http.get('http://dev.elagoondigital.net/FreedomOrdnance/webservice/ws.php?requestMethod=getAllCategories').map(res => res.json().categories).subscribe(data => {
		console.log(data);
		this.allData = data;
	  });
  }
  
  
  logout() {
        this.authservice.logout();
		//this.navCtrl.setRoot(WelcomePage);
		this.app.getRootNav().setRoot(WelcomePage);
    }

/*	
  logout(){
		const root = this.app.getRootNav();
		root.popToRoot();
  }
*/
}
