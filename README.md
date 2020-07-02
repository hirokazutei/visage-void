<h1 align="center">
    VISAGE VOID 
</h1>
<p align="center">
    <a href="https://opensource.org/licenses/GPL-3.0">
        <img src="https://img.shields.io/badge/License-gpl-blue.svg?style=for-the-badge" />
    </a>
    <a href="https://github.com/hirokazutei/visage-void/commits/master">
        <img src="https://img.shields.io/github/last-commit/hirokazutei/visage-void.svg?style=for-the-badge" />
    </a>
    <a href="https://github.com/hirokazutei/visage-void/pulls">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge" />
    </a>
</p>

<p align="center">
    <a href="https://facebook.github.io/react/">
        <img src="https://img.shields.io/badge/-React-black.svg?style=for-the-badge&logo=react&logoColor=white&color=61DAFB">
    </a>
    <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/-Typescript-black.svg?style=for-the-badge&logo=typescript&color=007ACC">
    </a>
</p>

# About

Visage Void is a non-profit project seeking to raise awareness about protecting the privacy of protesters, and making obscuring identifiable features easier. The police and vigilantes have been known to use photos taken during the protest against the protesters. Please be sure to cover any identifiable features of the protesters in your photos and scrub the meta-data before posting them online.

Check it out [HERE](https://nomore.icu/).

<p align="center">
  <img src="https://raw.githubusercontent.com/hirokazutei/visage-void/master/.github/images/screenshot.png" width="600" />
</p>

# Features

### Face Detection

Using [face-api.js](https://github.com/justadudewhohacks/face-api.js/), the app detects faces in uploaded pictures and covers it up with an opaque mask as a way to obscure the individual's identity.

### Removes Photo's Metadata

The uploaded picture is redrawn with [p5.js](https://github.com/processing/p5.js/), removing any original metadata associated with the image.

### Everything Done on Client Side

None of the uploaded files ever leave the client.

### Manual Adjustment

The detected masks can be manually resized, mobed, added, and removed. You are able to also replace them with emojis.

# Development

## Getting Started

**Clone the Repository**

```
git@github.com:hirokazutei/visage-void.git
```

**Install Node Modules**

```
cd visage-void && yarn
```

**Start Development Server**

```
yarn start
```

## Tests and Checks

**CI Tests Checks For the Following**

- ESLint linting and formatting.
- TypeScript type checking.

## Future Plans

Please checkout the [Issues Section](https://github.com/hirokazutei/visage-void/issues)!

## Questions, Feedback & Concerns

Please do not hesitate to contact me on the contacts/social media links provided for any questions, feedback or concerns about the project.

Thank you!

<h2 align="center">
    Contacts & Social Media
</h2>
<p align="center">
    <a href="https://twitter.com/asublimeaddict">
        <img src="https://img.shields.io/badge/-Twitter-black.svg?style=for-the-badge&logo=twitter&logoColor=white&color=1DA1F2">
    </a>
    <a href="https://www.linkedin.com/in/hirokazutei/">
        <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&color=0077B5">
    </a>
    <a href="https://www.instagram.com/hirokazutei/">
        <img src="https://img.shields.io/badge/-Instagram-black.svg?style=for-the-badge&logo=instagram&logoColor=white&color=E4405F">
    </a>
    <a href="https://medium.com/@hirokazutei/enforcing-component-spacing-in-react-react-native-556b8ef90dea">
        <img src="https://img.shields.io/badge/-Medium-black.svg?style=for-the-badge&logo=Medium&logoColor=white&color=12100E">
    </a>
    <a href="https://hirokazutei.me">
        <img src="https://img.shields.io/badge/-Blog-black.svg?style=for-the-badge&logo=about.me&logoColor=white&color=gray">
    </a>
</p>
