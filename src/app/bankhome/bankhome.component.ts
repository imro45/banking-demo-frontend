import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bankhome',
  templateUrl: './bankhome.component.html',
  styleUrls: ['./bankhome.component.less']
})
export class BankhomeComponent implements OnInit {
  bankImage: string = "assets/dhanrashibank.png";

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onCustomerRegisterClick() {
    this.router.navigate(['/account/register']);
  }

}
