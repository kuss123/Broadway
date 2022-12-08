import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
  debug: true,
  logger: true,
});

export const sendMail = async (email, token, host) => {
  try {
    var mailOptions = {
      from: "someone@gmail.com",
      to: email,
      subject: "reset password",
      html: `
            <h1> click the link to reset the password </h1>
            <a href="http://${host}/reset/${token}"> Link ho hai </a>
        `,
    };

    const mail = await transporter.sendMail(mailOptions);
    if (mail) {
      return res.status(200).json("Email send successfully");
    }
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
