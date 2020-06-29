import { Component, OnInit, Input } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[]= [];

  slidesOpts = {
    slidesPerView: 1.3, 
    freeMode: true
  }

  constructor (private modlaCtrl:ModalController) { }

  ngOnInit() {}

  async verDetalle (id: string){

    const modal = await this.modlaCtrl.create({
      component: DetalleComponent, 
      componentProps:{
        id
      }
    })

    modal.present();
  }
}
