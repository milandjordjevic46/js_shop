import { Injectable } from '@angular/core';

export abstract class ContactPresenter {
    abstract openOnMap(): void;
}

@Injectable()
export class ContactPresenterImpl implements ContactPresenter {

    openOnMap() {
        let link = "https://www.google.ru/maps/place/Vi%C5%A1egradska+14/@44.8015698,20.4519703,17z/data=!4m6!3m5!1s0x475a70069a60437d:0xe1490b55d4e52123!4b1!8m2!3d44.801543!4d20.4541486";
        window.open(link, "_blank");
    }
}
