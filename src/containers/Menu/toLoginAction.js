export const TO_LOGIN = 'TO_LOGIN';

export function toLoginAction(isLogin) {
  return {
        type: TO_LOGIN,
        payload: isLogin
  };
}
