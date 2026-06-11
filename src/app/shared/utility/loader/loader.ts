import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../ui/material-module';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loaderService';

@Component({
  selector: 'app-loader',
  imports: [MaterialModule, CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Loader {
  private readonly loaderService = inject(LoaderService);
  loading$ = this.loaderService.loading$;
}
