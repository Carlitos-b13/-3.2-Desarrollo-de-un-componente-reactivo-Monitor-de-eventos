
import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

interface Evento {
  id: number;
  valor: number;
  hora: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {

  contador = 0;
  monitoreoActivo = false;
  ultimosEventos: Evento[] = [];

  private suscripcion: Subscription | null = null;

  iniciarMonitoreo(): void {
    if (this.suscripcion) {
      return;
    }

    this.monitoreoActivo = true;

    this.suscripcion = interval(1000).subscribe(() => {
      this.contador++;

      const nuevoEvento: Evento = {
        id: Date.now(),
        valor: this.contador,
        hora: new Date().toLocaleTimeString('es-MX')
      };

      this.ultimosEventos = [
        nuevoEvento,
        ...this.ultimosEventos
      ].slice(0, 10);
    });
  }

  detenerMonitoreo(): void {
    if (this.suscripcion) {
      this.suscripcion.unsubscribe();
      this.suscripcion = null;
    }

    this.monitoreoActivo = false;
  }

  reiniciarMonitoreo(): void {
    this.detenerMonitoreo();
    this.contador = 0;
    this.ultimosEventos = [];
  }

  ngOnDestroy(): void {
    this.detenerMonitoreo();
  }
}
