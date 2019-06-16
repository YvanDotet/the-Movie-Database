import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vignette',
  templateUrl: './vignette.component.html',
  styleUrls: ['./vignette.component.css']
})
export class VignetteComponent implements OnInit {
  @Input("reception") result:Object[]
  //Les informations du film a réceptionner de l'extérieur
  
  constructor() {
 }

  ngOnInit() {
  }
}
