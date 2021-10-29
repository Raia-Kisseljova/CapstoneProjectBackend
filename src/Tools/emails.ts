import sgMail from "@sendgrid/mail";
import { IUser, IOrganisation } from "../types";

export const sendEmailUser = async (user: IUser) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to: "ev1lcapybara96@gmail.com",
    from: "ev1lcapybara96@gmail.com",
    subject: "New user just registered ",
    text: "User with email ${user.email} just created an account",
    html: `<strong>User with email ${user.email} just created an account</strong>`,
  };
  await sgMail.send(msg);
};

export const sendEmailOrg = async (organisation: IOrganisation) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to: "ev1lcapybara96@gmail.com",
    from: "ev1lcapybara96@gmail.com",
    subject: `New organisation just registered. ${organisation.name}`,
    text: `<strong>Organisation with email ${organisation.email} just created an account</strong>`,
    html: `<strong>Organisation with email ${organisation.email} just created an account</strong>`,
  };
  await sgMail.send(msg);
};
