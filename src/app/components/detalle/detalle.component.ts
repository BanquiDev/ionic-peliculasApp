import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  iconoFavorito:string = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true, 
    spacebetween: -5
  }

  constructor(private movieService: MoviesService,
              private modalCtrl: ModalController,
              private dataLocal: DatalocalService) { }

  ngOnInit() {
    
     this.dataLocal.existePelicula(this.id)
                    .then(existe => this.iconoFavorito = (existe) ? 'star' : 'star-outline')
   // console.log('detalle existe', existe)

    // if(existe == true){
    //   this.iconoFavorito = "star"
    // }else{
    //   this.iconoFavorito = "star-outline"
    // }

    this.movieService.getPeliculaDetalle(this.id)
                      .subscribe(resp =>{
                        
                        this.pelicula = resp
                      })

    this.movieService.getActoresPelicula(this.id)
                      .subscribe(resp =>{
                        
                        this.actores = resp.cast
                      })
  }

  regresar(){
    
    this.modalCtrl.dismiss();
  }

  favorito(){
    const existe = this.dataLocal.guardarPelicula( this.pelicula )
    this.iconoFavorito = (existe) ? 'star' : 'star-outline'
   }
  
 
  
}


