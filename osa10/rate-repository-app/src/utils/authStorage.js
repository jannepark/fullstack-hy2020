import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token from the storage
    const accessToken = await AsyncStorage.getItem(`${this.namespace}:token`);
    return accessToken ? accessToken : '';
  }

  async setAccessToken(token) {
    // Add the access token to the storage
    await AsyncStorage.setItem(`${this.namespace}:token`, token);
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:token`);
  }
}

export default AuthStorage;
