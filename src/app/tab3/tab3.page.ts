import { Component } from '@angular/core';
import {  PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DatalocalService } from '../services/datalocal.service';
import { async } from '@angular/core/testing';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] =[]
  generos: Genre[] = []

  favoritoxGenero: any[] =[]

  constructor(private dataLocal: DatalocalService,
              private moviesService: MoviesService) {}




  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos()
    this.generos = await this.moviesService.cargarGenero()
    console.log(this.peliculas)
    console.log(this.generos)

    this.pelisPorGenero(this.generos, this.peliculas)
  }


  pelisPorGenero(generos:Genre[], peliculas:PeliculaDetalle[]){

    this.favoritoxGenero = []

    generos.forEach(genero =>{

      this.favoritoxGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli =>{
          return peli.genres.find(genre => genre.id == genero.id)
        })
      })
    })
    console.log(this.favoritoxGenero)

  }
}
