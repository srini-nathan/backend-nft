export default class CasimirError extends Error {
    status: number;
  
    constructor(status: number, ...args: any[]) {
      super(...args);
      this.status = status;
    }
  }