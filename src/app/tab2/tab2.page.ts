import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  ideas:string[] = ['Spiderman', 'Avenger', 'Rambo', 'Matrix']  
  peliculasEncontradas: Pelicula[]= [];
  buscando = false;

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController) {}


  buscar(event){
    
    const valor:string = event.detail.value
    console.log(valor)

    this.buscando = true;

    if(valor.length === 0){
     this.buscando = false;
     this.peliculasEncontradas = [];
     return;
    }
      
      this.movieService.buscarPeliculas( valor )
                      .subscribe((resp) =>{
                        console.log(resp)
                        this.peliculasEncontradas = resp['results']
                        this.buscando = false
                      })
    
  }


  async detalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent, 
      componentProps:{
        id
      }
    })

    modal.present();
    
  }
    

}
