# Developer at Droppe - React refactoring task

## Changes made

### Versions

I have updated most of the packages to the latest versions<br />
I have also changed the typescript target to es6

### Structure

I changed the file structure in the componens directory to include a "base" directory for buttons, inputs, typography and so on, "elements" directory for components like the product card, product listing and the form, "layout" directory for headers and footers.<br />

Every component is now in their own directory with an index file an the component and a module.css file if one is needed. The component file is called index to make the imports cleaner "import { Button } from './components/base/button~~/button~~'".<br />

I made a "pages" directory for the pages and the layout and a little todo here is to implement the same directory structure as for the components ("pages/page/index.tsx").

### Routing

I added routing to the project for future needs when the app grows and we might want some product pages and other ones like about and careers...<br />

I also renamed the "shopApp" page to be only "shop"

### State

I cleaned up the shop page and used state to handle the data and also "useEffect" to handle the fetching of the products from the api. Here I pass the state down to the child components but to make the components more independent I would add a Redux store maybe even with the Redux Toolkit to handle the state data and fetch it from there in the components. It would just make everyones life a lot easier.

### Components

I split the page into multiple smaller components with the idea that one component should handle just one thing. I could have split it up even more like made Images, buttons with different layouts and functionallity, inputs and so on but with the limited time I chose not to and see it as a TODO as it is something that can easily be done after the initial launch.<br />

I also made a header component and added it to the layout so that in the future when we add more pages we don't have to add it to every page.

### Tests

I made a very basic test just to see if the product card component renders the correct text when it is favorited vs not favorited.

### TODOS

Add meta tags to the application<br />
Fix styles and remove inline styles (do we really need css modules?) I suggest BEM notation for class names<br />
Add SASS<br />
Add a Redux store<br />
Add a 404 page<br />
Add image alts<br />
Move images and css (sass) to assets directory<br />
Create base components with versions like button primary, secondary, plain


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
