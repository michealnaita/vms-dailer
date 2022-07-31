import { getToken } from 'next-auth/jwt';
import twilio from 'twilio';

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;
export default async function twilioTokenHandler(req, res) {
  const session = await getToken({ req });
  if (session) {
    const {
      TWILIO_ACCOUNT_SID,
      TWIML_APP_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET,
    } = process.env;
    const accessToken = new AccessToken(
      TWILIO_ACCOUNT_SID,
      TWILIO_API_KEY,
      TWILIO_API_SECRET
    );
    accessToken.identity = 'browser';
    const grant = new VoiceGrant({
      outgoingApplicationSid: TWIML_APP_SID,
      incomingAllow: true,
    });
    accessToken.addGrant(grant);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ token: accessToken.toJwt() }));
  } else {
    res.status(401).send('Get out of here man');
    res.end();
  }
}
