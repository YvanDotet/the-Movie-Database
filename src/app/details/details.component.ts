import { DonneesService } from './../donnees.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  error:boolean=false;
  messageErreur:string=""
  show:boolean=false;

  errorLoadActors:boolean=false
  messageErreurLoadActors:string=""
  showActors:boolean=false

  errorSimilars:boolean=false
  messageErreurSimilars:string=""
  showSimilars:boolean=false

  noImage:string="./../../assets/noImage.jpg"
  params:object
  
  actors:Object[]
  infoActeur:Object

  similars:Object[]

  constructor(private route:ActivatedRoute,private donnees:DonneesService) {
  }

  ngOnInit() {
    this.getInfos()
  }

  getInfos(){
    //le 'id' paramètre rencontré lors de l'appel de route
    const id=+this.route.snapshot.paramMap.get('id')// '+' toNumber
    this.donnees.getDataById(id)
    .subscribe(rep=>{
      console.log(rep);
    
      /*
      !Très important!
      veillez à ne pas indiquez rep.name de manière identique
      dans la base de donnée theMovieDB, sinon il y aura des confusions.
      */

      if(rep.name=="HttpErrorResponse"){
        this.error=true
        this.show=false
        
        this.messageErreur=`
        ${rep.message}
        `
      }
      else{
        this.donnees.getDataById(id)
        .subscribe(rep=>{ // je m'abonne au flux apportant les informations sur le film
        
        this.params={
          poster: (!rep.poster_path)?(this.noImage) :'https://image.tmdb.org/t/p/w500/'+rep.poster_path,
          titre:rep.title,
          fanart:(!rep.backdrop_path)?(this.noImage):'https://image.tmdb.org/t/p/w500/'+rep.backdrop_path,
          synopsis:rep.overview,
          annee:rep.release_date.split('-')[0],
          note:rep.vote_average,
          id:rep.id
        }
        this.show=true
        this.error=false
        
        this.loadActors(id)
        this.loadSimilars(id)
        })
      }

    })
  }

  loadActors(id:number):void{
    this.donnees.getActors(id) //abonnement pour recevoir des informations des acteurs
    .subscribe(rep=>{
      
      if(rep.name=="HttpErrorResponse"){
        this.showActors=false
        this.errorLoadActors=true
        
        this.messageErreurLoadActors=`
        ${rep.message}
        `
      }
      else{
        this.errorLoadActors=false

        this.actors=rep.cast.map(o=>{ // je n'extrais que certaines informations
          return {
            personnage:o.character,
            acteur:o.name,
            image:(!o.profile_path)?(this.noImage) :'https://image.tmdb.org/t/p/w500/'+o.profile_path
          }
        })

        this.showActors=true
      }

    })
  }

  fChange(select){
    let k = select.value

    if (k==="Introduction"){
      this.infoActeur=null
    }
    else {
      this.infoActeur=this.actors[+k]
    }

  }

  loadSimilars(id:number):void{
    this.donnees.getSimilars(id)
    .subscribe(rep=>{
      if(rep.name=="HttpErrorResponse"){
        this.showSimilars=false
        this.errorSimilars=true
        
        this.messageErreurSimilars=`
        ${rep.message}
        `
      }
      else{
        this.errorSimilars=false

        this.similars=rep.results.map(o=>{
          return{
            id:o.id,
            titre:o.title,
            image:(!o.poster_path)?(this.noImage) :'https://image.tmdb.org/t/p/w500'+o.poster_path
          }
        })

        this.showSimilars=true
      }

    })
  }

}