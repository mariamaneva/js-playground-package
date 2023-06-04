# Description

This is a simple JS/TS code playground framework that I created in order to test code snippets, play Advent of Code, etc.

All the playground files are displayed in a sidebar explorer. To test the output you can use both the DOM and Devtools console.

You can see the updated output after each save as well.

<br/>
<br/>

# Usage

<br/>

1. Install the package

```
npm install @mariamaneva/js-playground
```

2. In your root package.json file, add the following script commands:

```
"scripts": {
  // add these lines
  "start": "npm run start --prefix node_modules/@mariamaneva/js-playground",
  "new-page": "npm run new-page --prefix node_modules/@mariamaneva/js-playground",
  "update-nav": "npm run update-nav --prefix node_modules/@mariamaneva/js-playground",
  "help": "npm run help --prefix node_modules/@mariamaneva/js-playground"
}
```

3. Create a new playground page:

```
npm run new-page --path <your_page_name>.js
```

OR

```
npm run new-page --path <your_page_name>.ts
```

4. Start the project

```
npm start
```

5.  Open **`_your_page_name_`** file from the sections folder and start playing around.

Repeat step 3 and re-run the project every time you need a new playground file.

If you deleted any files from the sections folder, run **`npm run update-nav`** and re-start the project to update the sidebar explorer
