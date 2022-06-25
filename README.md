<p align="center">
  <a href="https://rxjs.dev">
    <img src="https://rxjs.dev/assets/images/logos/Rx_Logo_S.png" height="50" />
  </a>
  <a href="#readme">
    <img src="https://rx-ts.github.io/assets/heart.svg" height="50" />
  </a>
  <a href="https://reactjs.org">
    <img src="https://rx-ts.github.io/assets/react.svg"  height="50" />
  </a>
</p>

[![GitHub Actions](https://github.com/rx-ts/react/workflows/CI/badge.svg)](https://github.com/rx-ts/react/actions/workflows/ci.yml)
[![Codacy Grade](https://img.shields.io/codacy/grade/789ccd82b1464108b8ec254b852e0f2b)](https://www.codacy.com/gh/rx-ts/react)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Freact%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![GitHub release](https://img.shields.io/github/release/rx-ts/react)](https://github.com/rx-ts/react/releases)
[![David Dev](https://img.shields.io/david/dev/rx-ts/react.svg)](https://david-dm.org/rx-ts/react?type=dev)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/atlassian/changesets)

> Make [React][] greater with [RxTS][].

## TOC <!-- omit in toc -->

- [Homepage](#homepage)
- [Packages](#packages)
- [Install](#install)
- [Changelog](#changelog)
- [License](#license)

## Homepage

<a href="https://react-rx.vercel.app" target="_blank">react-rx</a>

## Packages

This repository is a monorepo managed by [changesets][] what means we actually publish several packages to npm from same codebase, including:

| Package                                                    | Description                                                 | Version                                                                                                               | Peer Dependencies                                                                                                                                                                      | Dependencies                                                                                                                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@react-enhanced/hooks`](/packages/@react-enhanced/hooks) | 🔥 Enhanced React Hooks                                     | [![npm](https://img.shields.io/npm/v/@react-enhanced/hooks.svg)](https://www.npmjs.com/package/@react-enhanced/hooks) | [![David Peer](https://img.shields.io/david/peer/rx-ts/react.svg?path=packages/@react-enhanced/hooks)](https://david-dm.org/rx-ts/react?path=packages/@react-enhanced/hooks&type=peer) | [![David](https://img.shields.io/david/rx-ts/react.svg?path=packages/@react-enhanced/hooks)](https://david-dm.org/rx-ts/react?path=packages/@react-enhanced/hooks) |
| [`react-rx`](/packages/react-rx)                           | 👁️ RxJS integration for React                               | [![npm](https://img.shields.io/npm/v/@rxts/react-rx.svg)](https://www.npmjs.com/package/@rxts/react-rx)               | [![David Peer](https://img.shields.io/david/peer/rx-ts/react.svg?path=packages/react-rx)](https://david-dm.org/rx-ts/react?path=packages/react-rx&type=peer)                           | [![David](https://img.shields.io/david/rx-ts/react.svg?path=packages/react-rx)](https://david-dm.org/rx-ts/react?path=packages/react-rx)                           |
| [`react-qrcode`](/packages/react-qrcode)                   | 🤳 A React component for QR code generation with [qrcode][] | [![npm](https://img.shields.io/npm/v/react-qrcode.svg)](https://www.npmjs.com/package/react-qrcode)                   | [![David Peer](https://img.shields.io/david/peer/rx-ts/react.svg?path=packages/react-qrcode)](https://david-dm.org/rx-ts/react?path=packages/react-qrcode&type=peer)                   | [![David](https://img.shields.io/david/rx-ts/react.svg?path=packages/react-qrcode)](https://david-dm.org/rx-ts/react?path=packages/react-qrcode)                   |
| [`react-qrious`](/packages/react-qrious)                   | 🤳 A React component for QR code generation with [qrious][] | [![npm](https://img.shields.io/npm/v/react-qrious.svg)](https://www.npmjs.com/package/react-qrious)                   | [![David Peer](https://img.shields.io/david/peer/rx-ts/react.svg?path=packages/react-qrious)](https://david-dm.org/rx-ts/react?path=packages/react-qrious&type=peer)                   | [![David](https://img.shields.io/david/rx-ts/react.svg?path=packages/react-qrious)](https://david-dm.org/rx-ts/react?path=packages/react-qrious)                   |
| [`react-storage`](/packages/react-storage)                 | 🔥 React hooks for using localStorage/sessionStorage        | [![npm](https://img.shields.io/npm/v/@rxts/react-storage.svg)](https://www.npmjs.com/package/@rxts/react-storage)     | [![David Peer](https://img.shields.io/david/peer/rx-ts/react.svg?path=packages/react-storage)](https://david-dm.org/rx-ts/react?path=packages/react-storage&type=peer)                 | [![David](https://img.shields.io/david/rx-ts/react.svg?path=packages/react-storage)](https://david-dm.org/rx-ts/react?path=packages/react-storage)                 |

## Install

```sh
# yarn
yarn add @react-enhanced/hooks @rxts/react-{rx,storage} react-{qrcode,qrious}

# pnpm
pnpm add @react-enhanced/hooks @rxts/react-{rx,storage} react-{qrcode,qrious}

# npm
npm i @react-enhanced/hooks @rxts/react-{rx,storage} react-{qrcode,qrious}
```

## Changelog

Detailed changes for each release are documented in [CHANGELOG.md](./CHANGELOG.md).

## License

[MIT][] © [JounQin][]@[1stG.me][]

[1stg.me]: https://www.1stg.me
[changesets]: https://github.com/atlassian/changesets
[jounqin]: https://GitHub.com/JounQin
[mit]: http://opensource.org/licenses/MIT
[qrcode]: https://github.com/soldair/node-qrcode
[qrious]: https://github.com/neocotic/qrious
[react]: https://reactjs.org
[rxts]: https://rxjs.dev
