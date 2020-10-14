import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeatured = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeatured = feature;
  }
}
