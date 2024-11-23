import { setWorldConstructor } from '@cucumber/cucumber';

class CustomWorld {
  constructor() {
    this.context = {};
  }
}

setWorldConstructor(CustomWorld);