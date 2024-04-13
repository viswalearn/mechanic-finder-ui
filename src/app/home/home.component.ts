import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showHome = true;
  showRegistration = false;
  showMechanicRegistrationFlag = false;
  userName: string = '';
  userContact: string = '';
  userAddress: string = '';
  userCity: string = '';
  mechanicName: string = '';
  mechanicContact: string = '';
  mechanicAddress: string = '';
  governmentId: string = '';
  useCurrentLocation: boolean = false;
  currentLocation: string = '';
  mechanics: any[] = [];


  showHomePage() {
    this.showHome = true;
    this.showRegistration = false;
    this.showMechanicRegistrationFlag = false;
  }

  showUserRegistration() {
    this.showHome = false;
    this.showRegistration = true;
    this.showMechanicRegistrationFlag = false;
  }

  showMechanicRegistration() {
    this.showHome = false;
    this.showRegistration = false;
    this.showMechanicRegistrationFlag = true;
  }

  registerMechanic() {
    // Implement mechanic registration logic here


    if(this.useCurrentLocation) {
      this.getCurrentLocation();
    }

    const mechanicData = {
      name: this.mechanicName,
      contact: this.mechanicContact,
      address: this.mechanicAddress,
      governmentId: this.governmentId,
      currentLocation: this.currentLocation
    };

    console.log('Registering mechanic:', mechanicData);

    // Reset form fields after submission (optional)
    this.mechanicName = '';
    this.mechanicContact = '';
    this.mechanicAddress = '';
    this.governmentId = '';
    this.currentLocation = '';
  }

  registerUser() {
    // Call your REST endpoint with the user registration data
    const userData = {
      name: this.userName,
      contact: this.userContact,
      address: this.userAddress,
      city: this.userCity
    };
    console.log('Registering user:', userData);

    // Reset form fields after submission (optional)
    this.userName = '';
    this.userContact = '';
    this.userAddress = '';
    this.userCity = '';
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.currentLocation = `Latitude: ${latitude}, Longitude: ${longitude}`;
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  findMechanic() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Call REST endpoint with location data
        console.log('Current location:', latitude, longitude);
        // Make HTTP request to your REST endpoint
        // Example:
        // this.http.get(`your-rest-endpoint?lat=${latitude}&lng=${longitude}`).subscribe(response => {
        //   console.log('Response from REST endpoint:', response);
        // });
        this.mechanics = [{
          "name" : "mechanic1",
          "contact" : "123456789",
          "address" : "NH48"
        },
        {
          "name" : "mechanic2",
          "contact" : "123456788",
          "address" : "NH48"
        }
      ]
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
