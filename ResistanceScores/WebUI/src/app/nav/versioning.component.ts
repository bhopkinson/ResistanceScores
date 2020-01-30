import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-versioning',
  templateUrl: './versioning.component.html',
  styleUrls: ['./versioning.component.scss']
})
export class VersioningComponent {

  constructor(private update: SwUpdate) {
    console.log(update);
    update.available.subscribe(event => {
      if (event.current.hash !== event.available.hash) {
        this.isNewVersionAvailable = true;
      }
    });
  }

  isNewVersionAvailable = false;

  updateServiceWorker(): void {
    if(!this.isNewVersionAvailable) {
      this.update.checkForUpdate();
      return;
    }
    if (confirm('Would you like to update to the latest version of ResistanceScores?')) {
      this.update.activateUpdate().then(()=> {document.location.reload();} );
    }
  }

}
