import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { MechanicService } from './mechanic.service';
import { User } from './user.model';
import { Mechanic } from './mechanic.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showHome = true;
  showRegistration = false;
  showMechanicRegistrationFlag = false;
  showPasswordError = false;
  showMechanicPasswordError = false;
  userName: string = '';
  userMobile: string = '';
  userAddress: string = '';
  userCity: string = '';
  userConfirmPassword: string = '';
  userPassword : string = '';
  mechanicName: string = '';
  mechanicContact: string = '';
  mechanicAddress: string = '';
  mechanicCity: string = '';
  mechanicState: string = '';
  governmentId: string = '';
  mechanicPassword: string = '';
  mechanicConfirmPassword: string = '';
  useCurrentLocation: boolean = false;
  latitude: number = 0;
  longitude: number = 0;
  mechanics: any[] = [];

  constructor(private userService: UserService,
    private mechanicService: MechanicService
  ) { }

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

    if(this.mechanicPassword !== this.mechanicConfirmPassword) {
      this.showMechanicPasswordError = true;
      return;
    } else {
      this.showMechanicPasswordError = false;
    }

    if(this.useCurrentLocation) {
      this.getCurrentLocation();
    }

    const mechanicData : Mechanic = {
      name: this.mechanicName,
      contact: this.mechanicContact,
      password: this.mechanicPassword,
      address: this.mechanicAddress,
      governmentId: this.governmentId,
      latitude: this.latitude,
      longitude: this.longitude,
      city: this.mechanicCity,
      state: this.mechanicState
    };

    console.log('Registering mechanic:', mechanicData);
    this.mechanicService.registerMechanic(mechanicData)
    .subscribe(
      (response) => {
        console.log('Mechanic registered successfully:', response);
        // Optionally, redirect to a success page or display a success message
      },
      (error) => {
        console.error('Error registering Mechanic:', error);
        // Handle registration error (e.g., display error message)
      }
    );
    // Reset form fields after submission (optional)
    this.mechanicName = '';
    this.mechanicContact = '';
    this.mechanicAddress = '';
    this.governmentId = '';
    this.mechanicCity = '';
    this.mechanicAddress = '';
    this.mechanicPassword = '';
    this.mechanicConfirmPassword = '';
  }

  registerUser() {
    // Call your REST endpoint with the user registration data
    const userData: User = {
      name: this.userName,
      contact: this.userMobile,
      address: this.userAddress,
      city: this.userCity,
      password: this.userPassword
    };
    console.log('Registering user:', userData);
    if(this.userPassword !== this.userConfirmPassword) {
      this.showPasswordError = true;
      return;
    } else {
      this.showPasswordError = false;
    }

    this.userService.registerUser(userData)
    .subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        // Optionally, redirect to a success page or display a success message
      },
      (error) => {
        console.error('Error registering user:', error);
        // Handle registration error (e.g., display error message)
      }
    );

    // Reset form fields after submission (optional)
    this.userName = '';
    this.userMobile = '';
    this.userAddress = '';
    this.userCity = '';
    this.userPassword = '';
    this.userConfirmPassword = '';
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
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
