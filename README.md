# Nick Arnold's resume

This is an HTML/PDF resume built with a templating engine and deployed to a 
server using GitHub Actions. It uses [Tailwind CSS](https://tailwindcss.com/) 
for styling, and [Playwright](https://playwright.dev/) for PDF generation and 
EJS templating in Node.js to generate the HTML.

The resume data is stored in `./src/resume-data.yml` and is rendered to HTML 
first, before invoking Playwright to generate the PDF from the markup. GitHub 
Actions are used to deploy the resulting HTML and PDF files to a web server 
using `scp`.

I find that HTML/CSS is a simpler and more approachable way to build a resume
for most developers. If you like LaTeX, great! There are plenty of those
examples floating around out there.


## Goal

Have a simple developer-friendly way of updating my resume while keeping both 
the HTML and PDF versions in sync with each other.


## How to use

1. Clone this repository
2. Install the dependencies with `npm install`
3. Install Playwright browsers with `npx playwright install --with-deps`
3. Edit the `resume-data.yml` file to add your own information
4. Run `npm run build` to generate the resume
5. Commit your changes and push to your repository
6. Go to your repository's GitHub Actions page and ensure the "Secure Copy 
Deployment" workflow is not disabled
7. Setup the requisite secrets in your repository's settings (see below)
8. Trigger the workflow manually or push a change to the `main`/`master` branch
9. Your resume should be live at `<SSH_HOST>` at the path `<DEPLOY_DIR>`

This assumes that you've already configured the target deployment server to for
SSH access and have the requisite SSH keys in place (e.g. public key in target 
server's authorized_keys file and private key in this repository's secrets).


## Github Actions

This repository contains one workflow:

- `deploy.yml`: This workflow is triggered on pushes to the `main` or `master` 
branches. It builds the resume and deploys it to the server specified in the 
`SSH_HOST` variable (see below). 


### Repo Secrets

The following repository secrets are used in the deploy workflow:

- `DEPLOY_DIR`: The directory on the server where the resume should be deployed
- `RESUME_DATA`: (_optional_) The YAML containing the resume data to use during
   HTML and PDF rendering. If not provided, the default `./src/resume-data.yml`
   data will be used.
- `SSH_DEPLOY_KEY`: The private key for the SSH server
- `SSH_USERNAME`: The username for the SSH server


### Repo Variables

The following not-secret variables are used in the deploy:

- `SSH_HOST`: The hostname of the server where the resume should be deployed


## Caveats

I'm primarily a backend engineer, so if you focus more on the frontend you'll 
likely find ways to improve the styling and/or layout. I'm trying not to let
perfect be the enemy of good-enough here. Your expertise and contributions are
welcomed! :)
