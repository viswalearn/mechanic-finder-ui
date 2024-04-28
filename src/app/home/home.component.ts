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
  showResultsFlag = false;
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
  mechanics: Mechanic[] = [];

  constructor(private userService: UserService,
    private mechanicService: MechanicService
  ) { }

  showHomePage() {
    this.showHome = true;
    this.showRegistration = false;
    this.showMechanicRegistrationFlag = false;
    this.showResultsFlag = false;
  }

  showUserRegistration() {
    this.showHome = false;
    this.showRegistration = true;
    this.showMechanicRegistrationFlag = false;
    this.showResultsFlag = false;
  }

  showMechanicRegistration() {
    this.showHome = false;
    this.showRegistration = false;
    this.showMechanicRegistrationFlag = true;
    this.showResultsFlag = false;
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
      Name: this.mechanicName,
      ContactNumber: this.mechanicContact,
      Password: this.mechanicPassword,
      Address: this.mechanicAddress,
      GovernmentId: this.governmentId,
      Latitude: this.latitude,
      Longitude: this.longitude,
      City: this.mechanicCity,
      State: this.mechanicState
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
      Name: this.userName,
      ContactNumber: this.userMobile,
      Address: this.userAddress,
      City: this.userCity,
      Password: this.userPassword
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
    const mechlist: Mechanic[] = [];
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        //const latitude = position.coords.latitude;
        //const longitude = position.coords.longitude;
        const latitude = 12.986480601510985;
        const longitude = 77.67977322535576;

        // Call REST endpoint with location data
      console.log('Current location:', latitude, longitude);
      console.log("Calling get mechanic");
      this.mechanicService.getMechanic(latitude, longitude).subscribe(mechanicsList => {
        console.log("Received response");
        console.log(mechanicsList);
        this.showResultsFlag = true;
        this.mechanics = mechanicsList;
      })
      }, error => {
        console.error('Error getting location:', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
