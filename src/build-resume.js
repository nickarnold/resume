const fs = require('fs');

const ejs = require('ejs');
const yaml = require('yaml');
const playwright = require('playwright');
const datefns = require('date-fns');
const { parseArgs } = require('util');
const { de } = require('date-fns/locale');

const OUTPUT_DIRECTORY = `${__dirname}/../output`;
const STYLES_FILE = `${OUTPUT_DIRECTORY}/style.css`;
const TEMPLATE_FILE = `${__dirname}/templates/index.ejs`;
const TEMPLATE_VALUES_FILE = `${__dirname}/resume-data.yml`;

(async () => {
    const scriptArgs = parseArgs({
        options: {
            html: { type: 'boolean', default: true },
            pdf: { type: 'boolean', default: true }
        }
    });

    const valuesFile = fs.readFileSync(TEMPLATE_VALUES_FILE, 'utf8');
    const styles = fs.readFileSync(STYLES_FILE, 'utf8');
    const resumeData = yaml.parse(valuesFile);

    // render the HTML file
    const renderedHTML = await ejs.renderFile(
        TEMPLATE_FILE,
        { ...resumeData, datefns, styles },
        { rmWhitespace: true }
    );

    // write out the HTML file
    if (scriptArgs.values.html) {
        fs.writeFileSync(`${OUTPUT_DIRECTORY}/resume.html`, renderedHTML);
        console.log('HTML generated successfully');
    }
    

    // print and write out the PDF file
    if (scriptArgs.values.pdf) {
        const browser = await playwright.chromium.launch();
        const page = await browser.newPage();
        await page.emulateMedia({ media: 'print' });
        await page.setContent(renderedHTML);
        await page.pdf({
            path: `${OUTPUT_DIRECTORY}/resume.pdf`,
            printBackground: true
        });
        console.log('PDF generated successfully');
        await browser.close();
    }

    console.log("\nResume generation complete");
})();
