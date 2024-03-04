import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TimerService {
    isSuccessful: boolean = false;
    isError: boolean = false;

    removeAfterDelay(time: number) {
        setTimeout(() => {
            this.isSuccessful = false;
            this.isError = false;
        }, time);
    }
}