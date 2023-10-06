/**
 *  Title: Bob's Computer Repair Shop
 *  Arthur: Professor Krasso
 *  Modified By: Janis Gonzalez
 *  Date: 09/26/2023
 *  Description: graph.component.ts
 */



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