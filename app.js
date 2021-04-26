const RegisterPoinService = require('./src/RegisterPointService');
const SendEmailService = require("./src/SendEmailService");

const main = async () => {
    const registerService = new RegisterPoinService();
    await registerService.register().catch(console.error);

    const emailService = new SendEmailService();
    emailService.sendEmail();
};

main();