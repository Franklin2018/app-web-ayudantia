import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { UserService } from 'src/app/services/user.service';
declare var JitsiMeetExternalAPI: any;

@Component({
    selector: 'app-jitsi',
    templateUrl: './jitsi.component.html',
    styleUrls: ['./jitsi.component.css']
})
export class JitsiComponent implements OnInit, AfterViewInit {

    domain: string = "meet.jit.si";
    room: any;
    options: any;
    api: any;
    user: any;
    
    // For Custom Controls
    isAudioMuted = false;
    isVideoMuted = false;

    //For meet option
    auxId:any;
    nombreAux:any;
    nombreSala:any;

    constructor(
      private _userService:UserService,
      private router: Router,
      private _asignaturaService:AsignaturaService,
        private _route:ActivatedRoute,
    ) {
        this.nombreAux=this._userService.getPersona();
        this.auxId=this._userService.getUsuario();
     }

    ngOnInit(): void {
       
     let sala=JSON.parse(localStorage.getItem('sala')|| '{}');
        this.room = sala; // set your room name
        this.user = {
            name: this.nombreAux[1].nombre // set your username
        }

    }


   

   



    ngAfterViewInit(): void {
        this.options = {
            roomName: this.room,
            width: 1000,
            height: 570,
            configOverwrite: { prejoinPageEnabled: false },
            interfaceConfigOverwrite: {
                // overwrite interface properties
            },
            parentNode: document.querySelector('#jitsi-iframe'),
            userInfo: {
                displayName: this.user.name
            }
        }

        this.api = new JitsiMeetExternalAPI(this.domain, this.options);

        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }


    handleClose = () => {
        console.log("handleClose");
    }

    handleParticipantLeft = async (participant) => {
        console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
        const data = await this.getParticipants();
    }

    handleParticipantJoined = async (participant) => {
        console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
        const data = await this.getParticipants();
    }

    handleVideoConferenceJoined = async (participant) => {
        console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
        const data = await this.getParticipants();
        console.log("CAMBIAR ESTADO DE SALA A HABILITADA")
    }

    handleVideoConferenceLeft = () => {
        console.log("handleVideoConferenceLeft");
       console.log("CAMBIAR ESTADO DE SALA DESHABILITADO")
       localStorage.removeItem('sala');
        this.router.navigate(['/mismaterias']);
    }

    handleMuteStatus = (audio) => {
        console.log("handleMuteStatus", audio); // { muted: true }
    }

    handleVideoStatus = (video) => {
        console.log("handleVideoStatus", video); // { muted: true }
    }

    getParticipants() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.api.getParticipantsInfo()); // get all participants
            }, 500)
        });
    }

    // custom events
    executeCommand(command: string) {
        this.api.executeCommand(command);;
        if(command == 'hangup') {

            this.router.navigate(['/mismaterias']);
            return;
        }

        if(command == 'toggleAudio') {
            this.isAudioMuted = !this.isAudioMuted;
        }

        if(command == 'toggleVideo') {
            this.isVideoMuted = !this.isVideoMuted;
        }
    }
}
