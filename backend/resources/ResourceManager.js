export class ResourceManager {
  constructor() {
    this.resources = new Map();
  }

  addResource(name, resource) {
    this.resources.set(name, resource);
  }

  getResource(name) {
    return this.resources.get(name);
  }
}
