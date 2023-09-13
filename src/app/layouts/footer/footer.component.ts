/**
 * Title: footer.component.ts
 * Author: Professor Krasso
 * Date: 8/5/23
 */

// imports statements
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  ngOnInit(): void {

  }
}
