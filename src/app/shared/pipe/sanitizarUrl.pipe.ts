import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizarUrl',
})
export class SanitizarUrl implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(url: string | null | undefined): SafeResourceUrl | null {
    if (!url) {
      return null;
    }

    const urlSanitizada = this.sanitizer.sanitize(SecurityContext.URL, url);
    
    if (!urlSanitizada) {
      console.warn('URL no válida después de sanitización:', url);
      return null;
    }

    if (!this.esUrlCloudinarySegura(urlSanitizada)) {
      console.warn('URL no permitida - Solo se aceptan URLs de Cloudinary:', url);
      return null;
    }

    // Ahora sí, confiamos porque pasó ambas validaciones
    return this.sanitizer.bypassSecurityTrustResourceUrl(urlSanitizada);
  }

  private esUrlCloudinarySegura(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'https:' && 
             urlObj.hostname.endsWith('cloudinary.com');
    } catch {
      return false;
    }
  }
}