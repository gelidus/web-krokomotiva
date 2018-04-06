import { Component, OnInit } from '@angular/core';

import { ApiClientService } from '../../../../api';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss']
})
export class NewTripComponent implements OnInit {

  categories = [
    {name: 'Theaters', img: 'assets/categories/theaters.jpg', select: false},
    {name: 'Restaurants', img: 'assets/categories/restaurants.jpg', select: false},
    {name: 'Night Clubs', img: 'assets/categories/night-clubs.jpg', select: false},
    {name: 'Bars', img: 'assets/categories/bars.jpg', select: false},
    {name: 'Parks', img: 'assets/categories/parks.jpg', select: false},
    {name: 'Coffee Shops', img: 'assets/categories/coffee-shops.jpg', select: false}
  ];

  selectedCategory: any;

  timeline = [
    {name: "Get drunk", duration: 3600},
    {name: "Get high", duration: 7200},
    {name: "Get smashed", duration: 10}

  ];

  constructor(public api: ApiClientService, public db: AngularFirestore) { }
  onItemDrop(e: any, id: number) {
    // Get the dropped data here
    let old = this.timeline[id];
    this.timeline[id] = e.dragData;
    this.timeline[e.dragData.index] = old;
  }

  ngOnInit() {
    this.getLocation({ lng: 16.590935, lat: 49.222653 })
      .then((pos) => {
        this.api
          .gimmePlaces(1000, '', pos.lng, pos.lat, '', '', '')
          .subscribe(console.log);
      })
  }

  wrapItem(item: Object, index: number): Object {
    return {...item, index: index}
  }

  getLocation(def: { lat: number, lng: number }): Promise<any> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          res({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.log('Error getting position:', err);
          res(def);
        },
        { timeout: 1500 }
      );
    })
  }

  selectCategory(category) {
    if (this.selectedCategory !== undefined) {
      this.selectedCategory.select = false;
    }
    category.select = true;
    this.selectedCategory = category;
  }

}
