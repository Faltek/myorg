import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

const containerElementName = 'customReactComponentContainer';

@Component({
  selector: 'org-test-app-component',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="margin: 35px">
    <h2 style="color: cadetblue">Profile (React Microfrontend)</h2>
    <div
      style="font-family: Inter, sans-serif; color: rgb(140, 137, 137, 1); font-size: 13px"
    >
      This user profile component is being remotely loaded into the application
      from React App using Webpack Module Federation
    </div>
    <span #${containerElementName}></span>
  </div>`,

  styleUrl: './testAppComponent.component.scss',
})

export class TestAppComponent implements AfterViewInit, OnDestroy {
  @ViewChild(containerElementName, { static: true }) containerRef!: ElementRef;
  async ngAfterViewInit() {
    try {
      const response = await fetch(`http://localhost:4205`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      const data = await response.json();
      this.containerRef.nativeElement.innerHTML = data.html;

      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = data.css;
      document.body.appendChild(style);

      const script = document.createElement('script');
      script.src = data.js;
      script.async = true;
      document.body.appendChild(script);
    } catch (error) {
      console.log('Erorr', error);
    }
  }

  ngOnDestroy() {}

}
