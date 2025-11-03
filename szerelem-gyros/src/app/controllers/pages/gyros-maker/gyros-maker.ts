import { Component } from '@angular/core';
import { Panels } from '@app/components/panels/panels';


@Component({
  selector: 'app-gyros-maker',
  standalone: true,
  imports: [Panels],
  templateUrl: './gyros-maker.html',
  styleUrl: './gyros-maker.css',
})
export class GyrosMaker {
}
