import { Component, Input } from '@angular/core';

@Component({
  selector: 'navigation-root',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  @Input() title?: string;
}
