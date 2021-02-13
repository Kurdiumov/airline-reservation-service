class Backend {
  static getUrl() {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      return "https://localhost:5000/";
    }

    return "https://airline-reservation-service.herokuapp.com/";
  }
}

export default Backend;