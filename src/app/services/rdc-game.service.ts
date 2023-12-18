import { Injectable } from "@angular/core";
import { IRdcPartySettings } from "@rdc/pages/rdc/settings/settings.component";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class RdcGameService {


  gameSetting$: BehaviorSubject<IRdcPartySettings | null> = new BehaviorSubject<IRdcPartySettings | null>(null);
  _gameSetting = this.gameSetting$.asObservable();


}
