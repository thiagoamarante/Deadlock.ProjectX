import { CarService  } from './services/carservice';

export class App {

    constructor(el: HTMLElement) {        
        //el.innerHTML = "teste";
        $(el).text("teste");
        let service = new CarService(el);
    }

}