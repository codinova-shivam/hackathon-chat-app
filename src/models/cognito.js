import { Auth } from "aws-amplify";
export class CognitoAuth {
  static acessToken;
  static setAccessToken(token) {
    this.acessToken = token;
  }

  static tokenExpiryTime = null;

  static setTokenExpiryTime(expiryTime) {
    this.tokenExpiryTime = expiryTime;
  }

  static get hasTokenExpired() {
    return this.tokenExpiryTime < new Date().getTime() / 1000;
  }

  static getCurrentUser() {
    return Auth.currentAuthenticatedUser();
  }
  static getCurrentSession() {
    return Auth.currentSession();
  }

  static setCurrentSession(session) {
    const idToken = session.getIdToken();
    this.setAccessToken(idToken.getJwtToken());
    this.setTokenExpiryTime(idToken.getExpiration());
  }

  static async refreshToken() {
    const currentSession = await this.getCurrentSession();
    this.setCurrentSession(currentSession);
  }
 
}
