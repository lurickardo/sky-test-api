export class HttpStatusException {
  private readonly message: unknown

  private readonly status: number

  constructor(message: string | unknown, status = 500) {
    this.message = { message };
    this.status = status;
  }
}
