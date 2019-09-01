<p align="center">
  <a href="https://rxjs.dev">
    <img src="https://rxjs.dev/assets/images/logos/Rx_Logo_S.png" height="50">
  </a>
  <a href="#readme">
    <img src="https://rx-ts.github.io/assets/heart.svg" height="50">
  </a>
  <a href="https://reactjs.org">
    <img src="https://rx-ts.github.io/assets/react.svg"  height="50">
  </a>
</p>

[![Travis](https://img.shields.io/travis/com/rx-ts/react.svg)](https://travis-ci.com/rx-ts/react)
[![Codacy Grade](https://img.shields.io/codacy/grade/7c86462361344d6f8b6566b1dd5fa2ea)](https://www.codacy.com/app/JounQin/react)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Freact%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![GitHub release](https://img.shields.io/github/release/rx-ts/react)](https://github.com/rx-ts/react/releases)
[![David Dev](https://img.shields.io/david/dev/rx-ts/react.svg)](https://david-dm.org/rx-ts/react?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org)
[![codechecks.io](https://raw.githubusercontent.com/codechecks/docs/master/images/badges/badge-default.svg?sanitize=true)](https://codechecks.io)

> Make [React][] great again with [RxTS][].

## TOC <!-- omit in toc -->

- [Homepage](#homepage)
- [Packages](#packages)
- [Install](#install)
- [Changelog](#changelog)
- [License](#license)

## Homepage

<a href="https://rx-react.now.sh" target="_blank">rx-react</a>

## Packages

This repository is a monorepo managed by [Lerna][] what means we actually publish several packages to npm from same codebase, including:

| Package                                    | Description                                          | Version                                                                                                           | Peer Dependencies                                                                                                                                                            | Dependencies                                                                                                                                             |
| ------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`react-rx`](/packages/react-rx)           | 👁️ RxJS integration for React.                       | [![npm](https://img.shields.io/npm/v/@rxts/react-rx.svg)](https://www.npmjs.com/package/@rxts/react-rx)           | [![David Peer](https://img.shields.io/david/peer/rx-ts/react-rx.svg?path=packages/react-rx)](https://david-dm.org/rx-ts/react-rx?path=packages/react-rx&type=peer)           | [![David](https://img.shields.io/david/rx-ts/react-rx.svg?path=packages/react-rx)](https://david-dm.org/rx-ts/react-rx?path=packages/react-rx)           |
| [`react-storage`](/packages/react-storage) | 🔥 React hooks for using localStorage/sessionStorage | [![npm](https://img.shields.io/npm/v/@rxts/react-storage.svg)](https://www.npmjs.com/package/@rxts/react-storage) | [![David Peer](https://img.shields.io/david/peer/rx-ts/react-rx.svg?path=packages/react-storage)](https://david-dm.org/rx-ts/react-rx?path=packages/react-storage&type=peer) | [![David](https://img.shields.io/david/rx-ts/react-rx.svg?path=packages/react-storage)](https://david-dm.org/rx-ts/react-rx?path=packages/react-storage) |

## Install

```sh
# yarn
yarn add @rxts/react-{rx,storage}

# npm
npm i @rxts/react-{rx,storage}
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[rxts]: https://rxjs.dev
[react]: https://reactjs.org
[jounqin]: https://GitHub.com/JounQin
[lerna]: https://github.com/lerna/lerna
[mit]: http://opensource.org/licenses/MIT
