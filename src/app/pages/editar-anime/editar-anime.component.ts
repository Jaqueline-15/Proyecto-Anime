import { Component, OnInit } from '@angular/core';
import { Anime } from 'src/app/models/anime';
import { Router,ActivatedRoute } from '@angular/router';
import { AnimeService } from 'src/app/services/anime.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-editar-anime',
  templateUrl: './editar-anime.component.html',
  styleUrls: ['./editar-anime.component.css']
})
export class EditarAnimeComponent implements OnInit {

  //propiedades
  enviado = false;
  editForm: FormGroup;
  animeGeneros : any = [
    'Shonen', 'Shojo', 'Gore', 'Sports', 'Otro'
  ];
  animeTemporadas : any = [
    '1', '2', '3', '4', '5+'
  ];
  animeData: Anime[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private animeService: AnimeService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.mainForm();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getAnime(id);
    this.editForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      genero:['',[Validators.required]],
      temporada: ['',[Validators.required]],
      autor:['',[Validators.required]],
      sinopsis: ['',[Validators.required]],
      imagen:['',[Validators.required]],
    });
    
  }

  //construimos el formulario
  mainForm(){
    this.editForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      genero:['',[Validators.required]],
      temporada: ['',[Validators.required]],
      autor:['',[Validators.required]],
      sinopsis: ['',[Validators.required]],
      imagen:['',[Validators.required]],
    });

  }
  //seleccionar el genero con un select
  actualizarGenero(g){
    this.editForm.get('genero').setValue(g,{
      onlySelf: true,
    });
  }

  //seleccionar la temporada con un select
  actualizarTemporada(t){
    this.editForm.get('temporada').setValue(t,{
      onlySelf: true,
    });
  }

  //getter para acceder al form control
  get myForm(){
    return this.editForm.controls;
  }

  //obtenemos el empleado que se va a modificar por su ID
  getAnime(id){
    this.animeService.getAnime(id).subscribe((data) => {
      this.editForm.setValue({
        nombre: data['nombre'],
        genero: data['genero'],
        temporada: data['temporada'],
        autor: data['autor'],
        sinopsis: data['sinopsis'],
        imagen: data['imagen'],
      });
    });
  }

 //Método que se ejecuta cuando el usuario envía el form
 onSubmit(){
  this.enviado =true;
  if(!this.editForm.valid){
    return false;
  }else{
    if(window.confirm('¿Estás seguro que deseas modificar?')){
      let id = this.actRoute.snapshot.paramMap.get('id');
      this.animeService.updateAnime(id,this.editForm.value).subscribe({
        complete: () => {
          this.router.navigateByUrl('/listar-animes');
          console.log('Se actualizo correctamente');
        },
        error: (e)  => {
          console.log(e);
        },
      });
    }
  }
}
}
