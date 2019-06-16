import { Component, OnInit } from '@angular/core';
import { DonneesService } from './../donnees.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
  //result
  list:[]
  numPage:number=1;
  pageTotal:number=1;
  resultTotal:number=0;
  currentText:string="";

  show:boolean=false;
  error:boolean=false;
  messageErreur:string="";

  noImage:string="./../../assets/noImage.jpg"

  constructor(private donnees:DonneesService) { }

  getBySearch(text:string,numPage:number){
    
    if (text.trim()==""){
      this.error=false
      this.show=false

      return
    }
  
    this.donnees.getDataBySearch(text,numPage)
    .subscribe(rep=>{
      console.log(rep);

      /*
      !Très important!
      veillez à ne pas indiquez rep.name de manière identique
      dans la base de donnée theMovieDB, sinon il y aura des confusions.
      */

      if(rep.name=="HttpErrorResponse"){
        this.show=false
        this.error=true
        
        this.messageErreur=`
        ${rep.message}
        `
      }
      else{
        this.error=false

        if (1000<rep.total_pages){this.pageTotal=1000}
        else {this.pageTotal=rep.total_pages}
        
        this.resultTotal=rep.total_results;
        
        this.list=rep.results.map(value=>{
        
          return {
            id:value.id,
            titre:value.title,
            poster:(!value.poster_path)?(this.noImage):'https://image.tmdb.org/t/p/w500/'+value.poster_path,
            annee:value.release_date.split('-')[0],
            note:value.vote_average
          }

        },this) // le tableau 'this' de la fonction est par défaut l'élément windows, sinon on peut le pointer vers l'élément 'this' généré par la classe FilmPopulairesComponent
        
        this.show=true
      }
    })
  }

  fSearch(text:string){
    this.numPage=1
    this.currentText=text
    
    this.getBySearch(text,1)
  }
  
  fClick(value:any):void{
    if (value=="first"){this.numPage=1}
    else if(value=="last"){this.numPage=this.pageTotal}
    else{
      this.numPage+=(+value);
      
      if (this.numPage<1){this.numPage=1}
      else if(this.pageTotal<this.numPage){this.numPage=this.pageTotal}
    }
//je choisis le numéro de la page pour la charger par la suite.
    this.getBySearch(this.currentText,this.numPage)
  }

  ngOnInit() {
  }

}
