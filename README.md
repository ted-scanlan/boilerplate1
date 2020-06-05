# React App Boilerplate

This first boilerplate uses some technologies used in the create-react-app template, and some alternatives ive chosen to explore. 


## Task runner:
I've chosen to use yarn, as it is slightly faster than npm. However, i think the difference between npm and yarn is fairly minimal, particularly as the latest version of npm have addressed the issues which for a while put it behind yarn. 

> Yarn is a secure dependency management client for JavaScript, that ensures consistent project dependencies across different machines. It automates a lot of work, from installing sub-dependencies to configuring your dependency tree.

Benefits of yarn: 
* In your package.json, Yarn allows you to add a property “resolutions.” Yarn will resolve the versions listed in this field. This is useful if you are depending on a package that is not updated frequently, which depends on another package that got an important upgrade. It's a good way to ensure that all dependencies are using the same version of a specific package.  
* It has an autoclean feature that is not matched in npm, that lets you automatically remove any dependencies in the .yarnclean file after installing or adding dependencies. This lets you remove any uneccessary files that takes up space and arn't neccessary to run the modules. 
* A dedicated lock file that keeps dependencies locked to a specific version. (Although once yarn had released this, npm bought out a similar feature, pakcage-lock.json, that does the same thing)
* Not thats its appropiate for this project, but yarn has a 'workspaces' feature that makes working on full stack projects much easier by allowing you to install dependencies from multiple package.json files in subfolders of a single root package.



## Bundler:
I'm using use Webpack for this boilerplate, which is also the bundler that comes with the 'create-react-app' template. Although there are other options, I wanted to learn a bit more about what is still the most widely used JS bundler. 

> Webpack is a static module bundler for JavaScript applications. To put it simply, it takes all the code from your application, merges it together, and makes it usable in a web browser. During this process, it builds a dependency graph which maps out the modules that your project needs and generates one or more bundles. A bundle is a distinct grouping of connected code that has been compiled and transformed for the browser.

It can be broken down into 5 key processes: (these can be configured in the webpak.config.js file)

* ENTRY 

is the entry point for the application. It is the first module (JavaScript file)that Webpack will process to build out the full dependency graph. It will look at the files that are imported into the entry, and these are added to the dependency graph. It then continues to walk through all the imported files until it has accounted for all the code needed to run the applications.

  `entry: "./app/index.js"`
  
* OUTPUT

 The Output point is where the files are to be written on disk with thename of the files. The main output file is written as ./dist/main.js and any other files are added to the dist directory. The output is set at the same location as the entry point. The output can also use hash or chunk names for the content, allow it to be dynamically updated when the code changes.

  `output: {

         path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js",

  }`

Its important to note here that using the Webpack server (script: 'webpack-dev-server'), as i have to run my files off my local machine, will not result in tthe files being written on disk, so the dist folder will not be updated. 

* LOADERS 

Loaders are used to extend functionality to process other file types by converting them into modules for your application.
Loaders are essentially just pure JavaScript functions: they take some data as input and do something to that data and returns a transformed version of the data. A range of different loaders are required in order to get web pack to handle different types of files besides JS. They dictate how files should be preprocessed as they are imported. 

e.g. to use CSS in your webpack app, you need to set up a new loader. Out-of-the-box, webpack only understands Javascript and JSON. 

    `{
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },`

There are 2 configuration options required to add a loader — 'test' which identifies file or file types should be transformed and 'use' which tells Webpack which loader to use in order to transform these files. You can add options to specificy additional requirements e.g.  'modules: true'  will enable webpack to bundle css code that is structured in the css-module format.  

* PLUGINS

Plugins handle the additional tasks that can’t be completed by a loader. This includes things such as bundle optimization, defining environment variables, etc. Another example would be extracting a style sheet or generating an index.html file for a single page web application.

  `plugins: 
    [
         new HtmlWebpackPlugin({
            template: "./app/index.html",

    }),`

* MODE 

Mode tells Webpack which configuration and optimizations to use for your application. This triggers some mode-specific plugins for Webpack that are built into Webpack, building it for the correct environment. The modes are 'development'', 'production', or 'none'.


The benefits of Webpack:

* Very easy to make compatibile with things like postcss and css-modules. its just a case of adding the appropiate loaders to the webpack config file. 

Also added web pack dev-server, so it runs off a local server on your machine 




## Transpilers:

### Babel:

Ive chosen to use Babel, as it is by far the most widely used JS transipler and I wanted to improve my understanding of it. 

Babel is a JavaScript transpiler that converts edge JavaScript into plain old ES5 JavaScript, that can run in any browser.
It makes available all the syntactical sugar that was added to JavaScript with the ES6 specification and beyond. For my boilerplate, it is required to convert the JSX ill be using into vanilla JS.

Benefits:

* Babel has the greatest level of compatibility with the ES6 spec onwards, exceeding other compile-to-JS systems such as CoffeeScript and Traceur. 

* It lets you use virtually all of the new features of the latest speicifications of Javascript, without sacrificing backwards compatibility for older browsers.

* It has first class support for dozens of different build & test systems which makes integration with your current toolchain very simple.

Install:
`yarn add -D @babel/core @babel/preset-env @babel/preset-react`

To use babel in conjuction with Webpack to bundle the javascipt, i need to add a particular loader to the webpack config file that enables me to do this. 

`use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },`




### PostCSS:
For transpiling CSS im using postCSS. It's a really important tool for improving your workflow and enabling you to write up to date CSS.

PostCSS is a transpiler that parses your CSS, using Javascript under the hood, turning it into the raw AST (abstract syntax tree) and then performs transformations to the CSS that today's browsers will understand and render.


There are many different plugins available to enhance your processor.  e.g. an autoprexies plugin can be installed to add vendor prefixes to your CSS to save you the effort of doing so. Prefixes are required to make sure the CSS you write is up to date and compatible with all browsers. e.g. a new CSS property might need to have prefixes so its compatible with older versions of browsers. You would previously have to do this manually by using —webkit or other equivalent tools. But postCSS automates this for you.

To install a plugin you just need to add it to your postcss.config.js file. 

`module.exports = {
  plugins: [require("autoprefixer")],
};`

`yarn add autoprefixer postcss-loader --save-dev`

Now when you run webpack, PostCSS will be run on all your CSS files.
 



## Testing:

For testing, im using the React Testing Library (alongside Jest), as i am used to using Jest in conjunction with Enzyme for testing React components, so it would be good to explore a different framework. 

Its a framwork that leans you towards testing user behavior, as opposed to testing implementation (state and props).



Benefits of using React Testing Library:

*  tends to support new features of React, e.g Hooks. 

* It requires you to think more about your users within your tests, thinking about how they interact with it rather than thinking about how the props and state objects look (implementation).

* React-testing-library arguably guides you to think more about best practices. e.g. the selectors used to get access to elements.

* a DOM testing library, which means that instead of dealing with instances of rendered React components, it handles DOM elements and how they behave in front of real users. That's important because with a test you ultimately only care about the final outcome i.e. the DOM element on the page.



## Styling:

Ive decided to use CSS-modules because its lot easier to read, and I personally like to prioritise separation of concerns, as it helps me organise a project in a way that makes sense to me. 

CSS-modules are CSS files in which all class names are scoped locally by default. CSS modules are scoped to the component where they are used.

For normal css and html, a class is applied in html and that class is styled in CSS. In CSS-modules, instead of writing plain html, we write all of our markup in a JS file, we import the styles from a separate css file then during our build step, the compiler would search through the style sheet and look through the javascript we’ve written and make the class (e.g. .title)accessible via the style sheet (e.g. styles.title). 
Our build then processes both of these things into new separate html and css files (with a new string of characters replacing the html and css selector class names - this is why if you look at the source code in the browser the classname will be different e.g. class=“_styles_title_3089575”)

To install 

If you are using webpack, configuring CSS modules is quite similar to configuring CSS. 

` {
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        modules: true
      }
    }
  ]
}`

Its just a case of telling the CSS-loader to enable CSS-modules. No extra dependencies are needed.


## Linters:


Ive chosen to use Eslint for catching JS errors and spotting where code can be optimised. 

Benefits of ESLint:

 * Error messages are more succinct and clearer than ESHint. They also provide a small snippet of the code with a carat to indicate where the error triggered during evaluation. You can also define your own output format for errors. JSHint errors arnt so versatile. 
* Initial set up is simpler. You can even get ESLint to examine your code base and set rules based off the patters it sees. Code never goes from valid to invalid. 
* More suitable if you need a linter that understands react I.e. JSX (the extension of javascript that is used by react ui library to create dynamic ui components that combine JS syntax with html snippets). It supports JSX right out of the box.


To install: 

 add the following loader to the webpack.config.js file 

 `{
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: {
          loader: "eslint-loader",
          options: {
            configFile: __dirname + "/.eslintrc",
          },
        },`


CSS:

For linting CSS im using stylelint  

Benefits:

Stylelint - 
* Powered by PostCSS (CSS lint was created before PostCSS).
* 170 built in rules. 
* More flexible, and can be used with future CSS syntax as it understands everything that PostCSS understand.
* Has a large and growing community. (Facebook/github/wordpress)

To install:

`yarn add stylelint --save-dev`

`yarn add stylelint-webpack-plugin --save-dev`

Then in Webpack config file:

`const StylelintPlugin = require('stylelint-webpack-plugin');`
 
`module.exports = {
  // ...
  plugins: [new StylelintPlugin(options)],
  // ...
};`


