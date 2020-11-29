interface LoginResponse {
  token: string;
}

class Service {
  async loginUser(email: string, password: string): Promise<LoginResponse> {
    console.log(email, password);
    return Promise.resolve({ token: 'abc' });
  }
}

export default new Service();
