import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MenulateralComponent } from '../menulateral/menulateral.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, NavbarComponent , MenulateralComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
