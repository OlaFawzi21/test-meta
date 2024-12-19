import { enableProdMode } from '@angular/core';
import { platformServer } from '@angular/platform-server';
import { AppServerModule } from './app/app.server.module'; // Ensure this is correct

enableProdMode();

platformServer()
  .bootstrapModule(AppServerModule)
  .catch((err) => console.error(err));
export { AppServerModule };

