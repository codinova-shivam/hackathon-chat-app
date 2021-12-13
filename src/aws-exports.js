export default {
    Auth: {
      region: "us-east-2",
      userPoolId: "us-east-2_ZdZg2hrec",
      userPoolWebClientId: "5paeb4mkf18tu3m72k2u8b143j",
      oauth: {
        domain: "dev-hackathon-chat.auth.us-east-2.amazoncognito.com",
        scope: [
          "phone",
          "email",
          "profile",
          "openid",
          "aws.cognito.signin.user.admin",
        ],
        redirectSignIn: "http://localhost:8080/",
        redirectSignOut: "http://localhost:8080/",
        responseType: "code",
      },
    },
  };
  