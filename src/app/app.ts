import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  // --- CONFIGURAZIONE TESTI TYPEWRITER ---
  texts: string[] = [
    "Studente ITS Rizzoli", 
    "Full Stack Developer", 
    "Software Architect", 
    "Problem Solver"
  ];
  
  currentText: string = "";
  private textIdx = 0;
  private charIdx = 0;
  private isDeleting = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Avviamo l'effetto scrittura solo se siamo nel browser
    if (isPlatformBrowser(this.platformId)) {
      this.type();
    }
  }

  ngAfterViewInit() {
    // Avviamo le animazioni di comparsa (Reveal) allo scroll
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollReveal();
    }
  }

  // --- LOGICA EFFETTO SCRITTURA ---
  type() {
    const currentFullText = this.texts[this.textIdx];
    
    if (this.isDeleting) {
      this.currentText = currentFullText.substring(0, this.charIdx--);
    } else {
      this.currentText = currentFullText.substring(0, this.charIdx++);
    }

    let typeSpeed = this.isDeleting ? 50 : 100;

    // Gestione pause tra una parola e l'altra
    if (!this.isDeleting && this.charIdx === currentFullText.length + 1) {
      typeSpeed = 2000; // Pausa a parola completa
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIdx === 0) {
      this.isDeleting = false;
      this.textIdx = (this.textIdx + 1) % this.texts.length;
      typeSpeed = 500; // Pausa prima di iniziare la nuova parola
    }

    setTimeout(() => this.type(), typeSpeed);
  }

  // --- LOGICA ANIMAZIONI ALLO SCROLL (REVEAL) ---
  private initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, { 
      threshold: 0.1 // L'elemento appare quando è visibile al 10%
    });

    // Seleziona tutti gli elementi che devono "animarsi"
    const elementsToReveal = document.querySelectorAll('.section, .project-card, .skill-group');
    elementsToReveal.forEach(el => {
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });
  }

  // --- AZIONI UTENTE ---
  scrollTo(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadVCard() {
    const link = document.createElement('a');
    link.href = 'assets/contatto.vcf';
    link.download = 'Contatto_Marco_Bianchi.vcf';
    link.click();
  }
}