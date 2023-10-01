/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Janis Gonzalez
 *  Date: 09/26/2023
 *  Description: graph.component.ts
 */

/* Graph with data from api

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../shared/invoice.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  purchases: any;
  itemCount: string[] = [];
  labels: string[] = [];

  constructor(private invoiceService: InvoiceService) {
    this.purchases = [];
  }

  ngOnInit(): void {
    this.invoiceService.findPurchasesByServiceGraph().subscribe({
      next: (res) => {
        this.purchases = res;

        // Clear previous data before populating
        this.labels.length = 0;
        this.itemCount.length = 0;

        for (let item of this.purchases) {
          let title = item._id.title;
          let count = item.count;

          this.labels.push(title);
          this.itemCount.push(count);
        }

        // Create pie chart here, after data is inserted
        const myPie = new Chart('myPieChart', {
          type: 'pie',
          data: {
            labels: this.labels,
            datasets: [
              {
                data: this.itemCount,
                backgroundColor: [
                  '#372e29',
                  '#4d3f38',
                  '#524734',
                  '#7D6B5D',
                  '#ee9e35',
                  '#eeba35',
                  '#f3ca61',
                ],
                hoverBackgroundColor: [
                  '#372e29',
                  '#4d3f38',
                  '#524734',
                  '#7D6B5D',
                  '#ee9e35',
                  '#eeba35',
                  '#f3ca61',
                ],
              },
            ],
          },
        });
      },
    });
  }
}
*/



import { Component, OnInit } from '@angular/core';
import { Chart, registerables  } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor () {}

  ngOnInit(): void {
    // Create a new pie chart instance via the myPie variable and the Chart constructor.
    // Pass in the id of the canvas element and the type of chart (pie).
    // Pass in the data and options objects to the chart constructor.
    const myPie = new Chart("myPieChart", {
      type: 'pie',
      data: {
          labels: ['Password Reset', 'Spyware Removal', 'RAM Upgrade', 'Software Installation', 'PC Tune-up', 'Keyboard Cleaning', 'Disk Clean-up'], // Labels for the data
          datasets: [{
              data: [12, 19, 3, 5, 2, 3, 30], // Data for the dataset
              backgroundColor: [
                '#372e29',
                  '#4d3f38',
                  '#524734',
                  '#7D6B5D',
                  '#ee9e35',
                  '#eeba35',
                  '#f3ca61',
              ],
              hoverBackgroundColor: [
                '#372e29',
                  '#4d3f38',
                  '#524734',
                  '#7D6B5D',
                  '#ee9e35',
                  '#eeba35',
                  '#f3ca61',
              ],
          }]
      }
    })
  }
}
