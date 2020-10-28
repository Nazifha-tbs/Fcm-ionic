import { FCM } from './../../../plugins/cordova-plugin-fcm-with-dependecy-updated/src/ionic/FCM';
import { Platform } from '@ionic/angular';
// import { FCM } from './../../../plugins/cordova-plugin-fcm-with-dependecy-updated/src/ionic/ngx/FCM';
import { Component } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public hasPermission: boolean;
  public token: any;
  public receiverToken:any;
  public message: any;
  public notificationUrl = "https://fcm.googleapis.com/fcm/send";
  constructor(
    // public fcm: FCM, 
    public platform: Platform, private http: HttpClient) {
    this.setupFCM();
  }
  private async setupFCM() {
    await this.platform.ready();

    console.log('FCM SETUP INIT');
    if (!this.platform.is('cordova')) {
      return;
    }

    console.log('IN CORDOVA');
    this.hasPermission = await FCM.requestPushPermission();
    console.log('CHECK hasPermission:', this.hasPermission);


    // this.token = await this.fcm.getToken();
    this.token = await FCM.getToken()

    console.log('CHECK getToken: ' + this.token);

    console.log('ON NOTIFICATION SUBSCRIBE');
    // this.fcm
    //   .onTokenRefresh()
    //   .subscribe((newToken) => console.log('NEW TOKEN:', newToken));
    FCM
      .onNotification()
      .subscribe((payload: object) => {
        console.log('ON NOTIFICATION:', payload)
        alert(JSON.stringify(payload));
      });
  }
  // sendMsg(val){
  //   let body = {
  //     "notification": {
  //       "title": "New Notification has arrived",
  //       "body": "Notification Body",
  //       "sound": "default",
  //       "click_action": "FCM_PLUGIN_ACTIVITY",
  //       "icon": "fcm_push_icon"
  //     },
  //     "data": {
  //       "param1": "value1",
  //       "param2": "value2"
  //     },
  //     "to": "/topics/all",
  //     "priority": "high",
  //     "restricted_package_name": ""
  //   }
  //   // let options = new HttpHeaders().set('Content-Type', 'application/json');
  //   // this.http.post(this.notificationUrl, body, {
  //   //   headers: options.set('Authorization', this.token),
  //   // })
  //   //   .subscribe();
  // }
  sendMsg() {
    
    let body = {
      
      "notification": {
        "title": "You have new Message!",
        "body": this.message,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      data: {
        param1: this.message,
      },
      alert:{
        "title": "You have new Message!",
        "body": this.message, 
      },
      "content_available": true,
      "priority": "high",
      to: 'dpuzTxs_DFs:APA91bFc2lshv6sDVvddUVe-LWe0VmHbMJJ2KIarNe6RpM-3kSlcyN6el12Vau6UOgzij4e9qUXhvrP1ppyO7Nd2X-mfMp78_82B0t3ZpNAN6i5xq4rEltVJzD_mJaLtR3u5TCNaGkW7'
    };
    this.http
      .post(this.notificationUrl, body, {
        headers: {
          Authorization:
            "key=AAAAlmUJzJU:APA91bGeoTH0SySDoi4GxdgJfUzzawZn_dh8Pu7eFc-4mX1l9prO3F5aVEsb7Znj34V5KsHrb2qiEXRU-CwpPSDfWMuElh2T_sBkPVT01v66IhTnZ28LbrjmkekVFtcgI3vet5ZUixBB",
          "Content-Type": "application/json",
        },
      })
      .subscribe((response: any) => {
        console.log("Notification response:", response);
      });
    // FCM
    //   .onNotification()
    //   .subscribe((payload: object) => {
    //     alert(payload)
    //     console.log('ON NOTIFICATION:', payload)
    //   });
  }
}
