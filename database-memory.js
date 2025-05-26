import { randomUUID } from 'node:crypto';

export class DatabaseMemory{

    #companies = new Map();


  list() {
    return Array.from(this.#companies.entries()).map((companyArray) =>{
        const id = companyArray[0];
        const data = companyArray[1];

        return {
            id,
            ...data
        }
    })
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