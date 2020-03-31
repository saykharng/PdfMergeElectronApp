Pdf Merge App for Windows

Application helps you to merge multiple pdf files into one.

The application uses Electron to provide a user interface. Electron then sends the commandline information to executable created using python to  merge the pdf file.

Get it up and running follow these step.

Install Nodejs if dont have it already.

Clone and build application:

```bash
git clone git@github.com:saykharng/PdfMergeElectronApp.git
npm install electron --save-dev
npm run package-win
npm run create-installer-win
'''
