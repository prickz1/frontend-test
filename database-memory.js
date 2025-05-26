import { randomUUID } from 'node:crypto';

export class DatabaseMemory{

    #companies = new Map();


  list() {
    return this.#companies.values();
  }


  create(company) {
    const companyId = randomUUID()

    this.#companies.set(companyId, company);
  }

  uptade(id, company) {
    this.#companies.set(id, company);
  }

  delete(id) {
    this.#companies.delete(id);
  }

}