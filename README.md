# Grantbii's Design System

Storybook's viewport triggers media query for small screens (e.g. mobile) by default.  
View in full screen to see how components look on big screens (e.g. desktop).

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

### Structure

The actual UI components live in `core/`.

Storybook stories live in `stories/`.

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

Check which files would be published:

```bash
npm run build
cd dist/
npm publish --dry-run
```

When a commit is pushed to the `prod` branch, the GitHub Actions workflow `deploy-prod.yaml` will automatically:

- build the package with `npm run build`
- publish the package to npm from `dist/`
- build Storybook with `npm run build-storybook`
- publish Storybook to GitHub Pages
