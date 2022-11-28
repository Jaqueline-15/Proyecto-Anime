import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-crear-animes',
  templateUrl: './crear-animes.component.html',
  styleUrls: ['./crear-animes.component.css']
})
export class CrearAnimesComponent implements OnInit {

  //propiedades
  animeForm : FormGroup;
  enviado = false;
  animeGeneros : any = [
    'Shonen', 'Shojo', 'Gore', 'Sports', 'Otro'
  ];
  animeTemporadas : any = [
    '1', '2', '3', '4', '5+'
  ];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private animeService: AnimeService
  ) {
    this.mainForm();
   }

  ngOnInit(): void {
  }

  //construimos el formulario
  mainForm(){
    this.animeForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      genero:['',[Validators.required]],
      temporada: ['',[Validators.required]],
      autor:['',[Validators.required]],
      sinopsis: ['',[Validators.required]],
      imagen:['',[Validators.required]],
    });
  }

  //seleccionar el genero con un select
  actualizarGenero(d){
    this.animeForm.get('genero').setValue(d,{
      onlySelf: true,
    });
  }

  //seleccionar la temporada con un select
  actualizarTemporada(d){
    this.animeForm.get('temporada').setValue(d,{
      onlySelf: true,
    });
  }

  //getter para acceder al form control
  get myForm(){
    return this.animeForm.controls;
  }

  //método que se ejecuta cuando se envia el formulario
  onSubmit(){
    this.enviado = true;
    if(!this.animeForm.valid){
      return false;
    }else{
      return this.animeService.agregarAnime(this.animeForm.value).subscribe({
        complete: () =>{
          console.log('Anime agregado corectamente'),
          this.ngZone.run(() => this.router.navigateByUrl('/listar-animes'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }


}
