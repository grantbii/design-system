# Grantbii's Design System

Storybook's viewport triggers media query for small screen (e.g. mobile) by default.  
View in full screen to see components for big screen (e.g. desktop).

Based on Grantbii's Global Design Library in Figma.

Approach: Atomic Design

## Prerequisites

Node 22

```bash
node -v  # expected output: v22.xx.xx
```

## Set-up

Install dependencies

```bash
npm i
```

## Run

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the result.

The pages auto-update as you edit the files.

## Develop

### Versioning

Bump version number in `package.json`

### Images

Use the `webp` format for images as it is lossless but more efficient than `png`.

Get started by installing [`cwebp`](https://developers.google.com/speed/webp/docs/cwebp).

Convert an image from `png` to `webp` like so:

```bash
cwebp -exact -lossless -progress your_image.png -o your_image.webp
```

## Publish

Bump version in `package.json`

Check which files would be published with `npm publish --dry-run`

The package is published to npm automatically with [GitHub Actions](.github/workflows/continuous-delivery.yaml).

Documentation is published automatically to GitHub pages with [GitHub Actions](.github/workflows/continuous-delivery.yaml).

Once a commit has been made on the `prod` branch, a build would be triggered.
