import { Component } from '@angular/core';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pdfURL: string ="";
  pdfBlobURL: string ="";
  maxFileSizeMB = 4;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileSizeMB = file.size / (1024 * 1024); 

    if (file && file.type === "application/pdf") {
      this.pdfURL = URL.createObjectURL(file); 
      this.pdfBlobURL = this.pdfURL; 
    } 
    if (fileSizeMB > this.maxFileSizeMB) {
      Swal.fire({
        icon: "warning",
        text: `El archivo seleccionado es demasiado grande. Por favor, selecciona un archivo de ${this.maxFileSizeMB}MB o menos.`,
      });
      this.pdfURL = "";
      this.pdfBlobURL = "";
     
    }
  }

  openPDF() {
    if (this.pdfBlobURL) {
      window.open(this.pdfBlobURL, '_blank'); 
    } else {
      Swal.fire({
        icon: "warning",
        text: "No hay un archivo PDF seleccionado.",
      });
    }
  }
}
