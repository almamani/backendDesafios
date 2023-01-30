import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "colleen.kozey@ethereal.email",
    pass: "pBgDZSH1rUHyQvMhvA",
  },
});
