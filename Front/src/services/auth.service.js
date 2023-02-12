import instance from "./axios";

class AuthService {
  login(email, password) {
    return instance
      .post("login", {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          instance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
          const userData = Object.assign(response.data);
          localStorage.setItem(userData);
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  registerAssociation(name, siren , adress, city, zip_code, country, email, password, repeat_password) {
    return axios.post(API_URL + "register/association", {
      name,
      siren,
      adress,
      city,
      zip_code,
      country,
      email,
      password,
      repeat_password
    });
  }
  registerBenevole(first_name, last_name, adress, city, zip_code, country, email, password, repeat_password) {
    return axios.post(API_URL + "register/benevole", {
      first_name,
      last_name,
      adress,
      city,
      zip_code,
      country,
      email,
      password,
      repeat_password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();
