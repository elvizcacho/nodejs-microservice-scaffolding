interface HomeResponse {
  ok: string;
}

class Service {
  async home(): Promise<HomeResponse> {
    return Promise.resolve({ ok: 'ok' });
  }
}

export default new Service();
