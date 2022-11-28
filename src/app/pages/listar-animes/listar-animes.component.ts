import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-listar-animes',
  templateUrl: './listar-animes.component.html',
  styleUrls: ['./listar-animes.component.css']
})
export class ListarAnimesComponent implements OnInit {

  Animes:any = [];

  constructor(private animeService:AnimeService) {
    this.getAnimes();
   }

  ngOnInit(): void {
  }

  //metodo para obtener todos los animes
  getAnimes(){
    this.animeService.getAnimes().subscribe((data) => {
      this.Animes = data;
    })
  }
  

  //método para borrar en animes 
  eliminarAnime(anime, index){
    if(window.confirm('¿Estas seguro que lo deseas eliminar?')){
      this.animeService.deleteAnime(anime._id).subscribe((data)=>{
        this.Animes.splice(index, 1);
      })
    }
  }

}
