require('dotenv').config();
const puppeterr = require("puppeteer");

class RegisterPoinService {

    async register() {
        const browser = await puppeterr.launch({
            headless: false, // true, run in background
            args: ["--no-sandbox"]
        });

        const page = await browser.newPage();

        try {
            // geolocation
            await page.evaluateOnNewDocument(function () {
                navigator.geolocation.getCurrentPosition = function (cb) {
                    setTimeout(() => {
                        cb({
                            'coords': {
                                accuracy: 21,
                                latitude: -19.948175394650995, // define your location
                                longitude: -43.94276098871361, // define your location
                            }
                        })
                    }, 1000)
                }
            });

            // open page
            await page.goto(process.env.PAGE, { waitUntil: 'networkidle2' });

            // login
            await page.type('input[name="login"]', process.env.LOGIN);
            await page.type('input[name="password"]', process.env.PASSWORD);
            await page.click('button[type="submit"]');

            // register
            await page.waitForSelector('button[ng-click="save()"]', { visible: true })
            await page.click('button[ng-click="save()"]');

            // screenshoot
            await page.goto(process.env.LIST_PAGE, { waitUntil: 'networkidle0' });
            await page.waitForSelector(".table", { visible: true });
            await page.screenshot({ path: 'register.jpg' });

        } catch (e) {
            console.log(e);
        }

        browser.close();
    };
}

module.exports = RegisterPoinService;