import { Resend } from 'resend';
import { RESEND_KEY, FRONTEND_URL } from './env-config';

const resend = new Resend(RESEND_KEY);

export const sendEmailVerification = async ({
  email,
  token,
  username,
}: {
  email: string;
  token: string;
  username: string;
}) => {
  const url = `${FRONTEND_URL}/authentification/confirmation?token=${token}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #10b981;">Bienvenue dans la team ! 💪</h2>
        <p>${username} tu viens de rejoindre notre plateforme sportive. Pour activer ton compte, clique sur le bouton ci-dessous :</p>
        <a href="${url}" style="
          display: inline-block;
          margin: 20px 0;
          padding: 12px 20px;
          background-color: #10b981;
          color: white;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        ">Confirmer mon adresse email</a>
        <p>Si tu n'es pas à l’origine de cette inscription, tu peux ignorer ce message.</p>
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eaeaea;" />
        <p style="font-size: 12px; color: #888;">Team SportApp – Ensemble, plus forts !</p>
      </div>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: 'SportGroup <onboarding@resend.dev>',
    to: [email],
    subject: 'Active ton compte SportGroup 🏃‍♂️',
    html: htmlContent,
  });

  if (error) {
    throw new Error(
      'Erreur lors de l’envoi de l’email de vérification.'
    );
  }
};

export const sendPasswordResetEmail = async ({
  email,
  token,
  username,
}: {
  email: string;
  token: string;
  username: string;
}) => {
  const url = `${FRONTEND_URL}/authentification/nouveau-mot-de-passe?token=${token}`;

  const { error } = await resend.emails.send({
    from: 'Sport group <onboarding@resend.dev>',
    to: [email],
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family: sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
        <h2>Réinitialisation mot de passe</h2>
        <p>${username} tu as demandé à réinitialiser ton mot de passe. Cliquez sur le bouton ci-dessous pour continuer :</p>
        <a href="${url}" 
           style="display: inline-block; background-color: #007BFF; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; margin-top: 20px;">
           Réinitialiser mon mot de passe
        </a>
        <p style="margin-top: 30px; color: #555;">Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet e-mail.</p>
        <p style="font-size: 12px; color: #aaa;">Ce lien expirera dans 30 minutes.</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(
      'Une erreur est survenue lors de l’envoi de l’e-mail.'
    );
  }
};
