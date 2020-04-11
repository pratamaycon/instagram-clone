import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'instagram-clone';

  ngOnInit() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyAN3_i4a19QHZNPj51fzoarVSVPNvJ30ro',
      authDomain: 'jta-instagram-clone-1511d.firebaseapp.com',
      databaseURL: 'https://jta-instagram-clone-1511d.firebaseio.com',
      projectId: 'jta-instagram-clone-1511d',
      storageBucket: 'jta-instagram-clone-1511d.appspot.com',
      messagingSenderId: '173117028858',
      appId: '1:173117028858:web:da8e984d616ee2ef6f8c43',
      measurementId: 'G-Y0E5BR3NHK',
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
