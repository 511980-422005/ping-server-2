const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nithyaganesh12345@gmail.com',
    pass: 'fzfu nmrw rcbd qtkl',
  },
});

async function sendMailToMh(email, name, message) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Message Received</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
        .email-container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; }
        .header { background-color: #181818; color: gold; text-align: center; padding: 20px; }
        .content { padding: 20px; }
        .footer { background-color: #181818; color: white; text-align: center; padding: 10px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Ng's Blog</h1>
        </div>
        <div class="content">
            <h2>New Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        </div>
        <div class="footer">
            <p>Ng's Blog | Inspiring Writers Worldwide</p>
        </div>
    </div>
</body>
</html>`;

  await transporter.sendMail({
    from: name,
    to: 'nithyaganesh12345@gmail.com',
    subject: `New Message from ${name}`,
    html: htmlContent,
  });
}

async function sendMailToUser(email, name) {
 const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You ${name}</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
        .email-container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; }
        .header { background-color: #181818; color: gold; text-align: center; padding: 20px; }
        .content { padding: 20px; }
        .footer { background-color: #181818; color: white; text-align: center; padding: 10px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Ng's Blog</h1>
        </div>
        <div class="content">
            <h2>Thank You, ${name}!</h2>
            <p>Thanks for subscribing to Ng's Blog! You will get an email when a new blog is added.</p>
            <p>We appreciate your message. Our team will get back to you soon!</p>
            <p>Meanwhile, explore our latest blog posts at <a href="https://blog-app-home.vercel.app/" target="_blank">Ng's Blog</a>.</p>
        </div>
        <div class="footer">
            <p>Ng's Blog | Inspiring Writers Worldwide</p>
        </div>
    </div>
</body>
</html>`;


  await transporter.sendMail({
    from: 'Ngs Blog',
    to: email,
    subject: 'Thank You for Contacting Ngs Blog',
    html: htmlContent,
  });
}
async function subscribing(email, name, blog) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Blog Post by ${blog}</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
        .email-container { max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 8px; }
        .header { background-color: #181818; color: gold; text-align: center; padding: 20px; }
        .content { padding: 20px; }
        .footer { background-color: #181818; color: white; text-align: center; padding: 10px; }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Ng's Blog</h1>
        </div>
        <div class="content">
            <h2>Hello, ${name}!</h2>
            <p>A new blog post has been added by <strong>${blog}</strong>!</p>
            <p>Check it out now on <a href="https://blog-app-home.vercel.app/" target="_blank">Ng's Blog</a>.</p>
            <p>Thanks for subscribing! You'll receive updates whenever a new blog is posted.</p>
        </div>
        <div class="footer">
            <p>Ng's Blog | Inspiring Writers Worldwide</p>
        </div>
    </div>
</body>
</html>`;

  await transporter.sendMail({
    from: "Ng's Blog",
    to: email,
    subject: `New Blog Post by ${blog}`,
    html: htmlContent,
  });
}

module.exports = { sendMailToMh, sendMailToUser, subscribing };
