// map.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare const google: any; // Declare Google Maps to avoid TypeScript errors

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  map: any;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    const mapOptions = {
      center: { lat: 0, lng: 0 }, // Initial map center (adjust as needed)
      zoom: 12 // Initial zoom level (adjust as needed)
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }
}
