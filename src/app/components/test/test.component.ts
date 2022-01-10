import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AsignaturaService } from '../../services/asignatura.service';
import {Router,ActivatedRoute, Params} from '@angular/router';
import { Test } from 'src/app/models/test';
import { UserService } from 'src/app/services/user.service';
import * as faceapi from 'face-api.js';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers:[AsignaturaService,UserService]
})
export class TestComponent implements OnInit {
  private llave:boolean=true;
  modelsReady: boolean;
 @ViewChild('videoContainer', {static: true}) videoContainer!: ElementRef;
  @ViewChild('myCanvas', {static:true}) myCanvas!: ElementRef;
  public context!: CanvasRenderingContext2D;
  public finalScore:number=0;
  public messageScore:any;
  public currentStream:any;
  public test:Test;
  public pregunta:any;
  public respuesta:any=[];
  public materiaTitle:any;
  public responses=["","","","",""];
  public dimensionVideo: any;
  private img_perfil_Aux:any;
  listEvents: Array<any> = [];
  overCanvas: any;
  listExpressions: any = [];
  

  constructor(
    private _testService:AsignaturaService,
    private _userService:UserService,
    private _route:ActivatedRoute,
  	private _router:Router,
  ) { 
    this.img_perfil_Aux=this._userService.getUsuario();
    
  }

  ngOnInit(): void {
    this.getTest();
    this.main();
    this.setTitle();

  }

  
   

  async main(){ 

    var video = await navigator.mediaDevices.getUserMedia({ video: true });
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models'),
    await faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/assets/models');
    
    this.videoContainer.nativeElement.srcObject = video;
    this.context = this.myCanvas.nativeElement.getContext('2d');    
   

    const displaSize = {
      width: this.videoContainer.nativeElement.width, 
      height: this.videoContainer.nativeElement.height
    };
    
    faceapi.matchDimensions(this.myCanvas.nativeElement, this.videoContainer.nativeElement);

    //Capturando Frame por Frame cada intervalo de tiempo
    setInterval(async () => {
     //Detecting all faces for verification of one only face.
    const detectionsFaces = await faceapi.detectAllFaces(this.videoContainer.nativeElement, new faceapi.TinyFaceDetectorOptions())
                                      .withFaceLandmarks()  
                                      .withFaceExpressions()
                                      .withFaceDescriptors();

          if(!detectionsFaces.length){
            this.llave=true;
            return;
          }

      console.log(detectionsFaces);
      console.log(detectionsFaces.length);
      //Verifying only one person doing the test
      if(detectionsFaces.length > 1 ){
        this._router.navigate(['/error']);
      }else{
        if(this.llave){
          //Verificancion de autenticidad 
          this.llave=false;
          await this.validacionAuth(detectionsFaces);
        }

      }
  

      const resizeDetections = faceapi.resizeResults(detectionsFaces, displaSize);

      this.context.clearRect(0, 0, this.myCanvas.nativeElement.width, this.myCanvas.nativeElement.height);
      
      faceapi.draw.drawDetections(this.myCanvas.nativeElement, resizeDetections);
      faceapi.draw.drawFaceLandmarks(this.myCanvas.nativeElement, resizeDetections);
      faceapi.draw.drawFaceExpressions(this.myCanvas.nativeElement, resizeDetections);

    },500);

  
  }
  async validacionAuth(detectionsFaces: faceapi.WithFaceDescriptor<faceapi.WithFaceExpressions<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection; }, faceapi.FaceLandmarks68>>>[]) {
     const faceMatcher = new faceapi.FaceMatcher(detectionsFaces);
    const imagePerfil=document.createElement('img');
    //Change to dinamic value
    imagePerfil.src=this.img_perfil_Aux[3].img_perfil;  
    imagePerfil.crossOrigin="anonymous";
    const singleResult = await faceapi
      .detectSingleFace(imagePerfil)
      .withFaceLandmarks()
      .withFaceDescriptor()

      if(singleResult){
        const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor) 
        if(bestMatch.label!="person 1"){
          console.log("VERIFICACION FALLO");
          this._router.navigate(['/error']);
        }else{
          console.log("VERIFICACION EXITOSA!!!")
        }
      }
  }




  reload(){
  location.reload();

  }


getTest(){
  this._route.params.subscribe(params=>{
    
    this._testService.getTestByMateria(params['id']).subscribe(
      response=>{
          if(response.ok == true){
           this.test=response.test;
           this.pregunta=this.test.preguntas; 

           this.pregunta.forEach(resp => {
              this.respuesta.push(resp.respuestas);  
           });

           
          }else{
            console.log(response);
          }
      },
      err=>{
        console.log(err);}
    );
  });	

  }


setTitle() {
  this._route.params.subscribe(params=>{
    
    this._testService.getAsignaturaById(params['id']).subscribe(
      response=>{
          if(response.ok == true){
           this.materiaTitle= "Test de " +response.asignatura.nombre;
          }else{
            console.log(response);
          }
      },
      err=>{
        console.log(err);
       
      }
    );
  });	


   }




  onSubmit(){
    
    this.respuesta.forEach((resp, index) => {
      if(this.responses[index] == resp[0].rc){
        this.finalScore=this.finalScore+20;
      }
    });

 if(this.finalScore >50){
  this.messageScore="Felicidades!!!, materia aprobada.";
  //Add materia to aux
  this.pushMateriaToUser();
 }else{
  this.messageScore="Solicitud rechazada, siga intentado.";
 }

 

  }
  pushMateriaToUser() {
     this._route.params.subscribe(params=>{

    let data= {"asignaturaId":params['id'],
                "id":this._userService.getUserData()._id
              }

    this._testService.pushAdignaturaToUser(data).subscribe(
      response=>{
          if(response.ok == true){
            console.log(response)
          }else{
            console.log(response);
          }
      },
      err=>{
        console.log(err);
       
      }
    );
  });	
  }
  

  

}
