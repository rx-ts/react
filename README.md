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
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/rx-ts/react.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/rx-ts/react/context:javascript)
[![type-coverage](https://img.shields.io/badge/dynamic/json.svg?label=type-coverage&prefix=%E2%89%A5&suffix=%&query=$.typeCoverage.atLeast&uri=https%3A%2F%2Fraw.githubusercontent.com%2Frx-ts%2Freact%2Fmaster%2Fpackage.json)](https://github.com/plantain-00/type-coverage)
[![GitHub release](https://img.shields.io/github/release/rx-ts/react)](https://github.com/rx-ts/react/releases)

[![Conventional Commits](https://img.shields.io/badge/conventional%20commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![changesets](https://img.shields.io/badge/maintained%20with-changesets-176de3.svg)](https://github.com/atlassian/changesets)

> Make [React][] greater with [RxTS][].

## TOC <!-- omit in toc -->

- [Homepage](#homepage)
- [Packages](#packages)
- [Install](#install)
- [Sponsors](#sponsors)
- [Backers](#backers)
- [Changelog](#changelog)
- [License](#license)

## Homepage

<a href="https://react-rx.vercel.app" target="_blank">react-rx</a>

## Packages

This repository is a monorepo managed by [changesets][] what means we actually publish several packages to npm from same codebase, including:

| Package                                                                    | Description                                                 | Version                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@react-enhanced/eslint-plugin`](/packages/@react-enhanced/eslint-plugin) | An incredible ESLint plugin for @react-enhanced Hooks       | [![npm](https://img.shields.io/npm/v/@react-enhanced/eslint-plugin.svg)](https://www.npmjs.com/package/@react-enhanced/eslint-plugin) [![View changelog](https://img.shields.io/badge/changelog-explore-brightgreen)](https://changelogs.xyz/@react-enhanced/eslint-plugin) |
| [`@react-enhanced/hooks`](/packages/@react-enhanced/hooks)                 | 🔥 Enhanced React Hooks                                     | [![npm](https://img.shields.io/npm/v/@react-enhanced/hooks.svg)](https://www.npmjs.com/package/@react-enhanced/hooks) [![View changelog](https://img.shields.io/badge/changelog-explore-brightgreen)](https://changelogs.xyz/@react-enhanced/hooks)                         |
| [`react-qrcode`](/packages/react-qrcode)                                   | 🤳 A React component for QR code generation with [qrcode][] | [![npm](https://img.shields.io/npm/v/react-qrcode.svg)](https://www.npmjs.com/package/react-qrcode) [![View changelog](https://img.shields.io/badge/changelog-explore-brightgreen)](https://changelogs.xyz/react-qrcode)                                                    |
| [`react-qrious`](/packages/react-qrious)                                   | 🤳 A React component for QR code generation with [qrious][] | [![npm](https://img.shields.io/npm/v/react-qrious.svg)](https://www.npmjs.com/package/react-qrious) [![View changelog](https://img.shields.io/badge/changelog-explore-brightgreen)](https://changelogs.xyz/react-qrious)                                                    |

## Install

```sh
# yarn
yarn add @react-enhanced/hooks react-{qrcode,qrious}

# pnpm
pnpm add @react-enhanced/hooks react-{qrcode,qrious}

# npm
npm i @react-enhanced/hooks react-{qrcode,qrious}
```

## Sponsors

| 1stG                                                                                                                               | RxTS                                                                                                                               | UnTS                                                                                                                               |
| ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/organizations.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/organizations.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/organizations.svg)](https://opencollective.com/unts) |

## Backers

| 1stG                                                                                                                             | RxTS                                                                                                                             | UnTS                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [![1stG Open Collective backers and sponsors](https://opencollective.com/1stG/individuals.svg)](https://opencollective.com/1stG) | [![RxTS Open Collective backers and sponsors](https://opencollective.com/rxts/individuals.svg)](https://opencollective.com/rxts) | [![UnTS Open Collective backers and sponsors](https://opencollective.com/unts/individuals.svg)](https://opencollective.com/unts) |

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
