import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'myorg-checkout-entry',
  template: `<myorg-nx-welcome></myorg-nx-welcome>`,
})
export class RemoteEntryComponent {}
