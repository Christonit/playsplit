const createSpotifyPlayer = (name, getOAuthToken) => {
  class Player {
    constructor({ name, getOAuthToken } = {}) {
      this.name = name;
      this.callback = getOAuthToken;
      this.listeners = [];
      this.device_id = "5def083a-a0b0-447c-9e47-1d0123f1453d";
    }

    addListener(eventName, callback) {
      this.listeners[eventName] = [callback];
    }

    trigger(eventName) {
      this.listeners[eventName].forEach(cb =>
        cb({ device_id: this.device_id })
      );
    }

    getCurrentState() {
      return Promise.resolve();
    }

    connect() {}
  }

  return new Player({ name, getOAuthToken });
};


  export default createSpotifyPlayer;
