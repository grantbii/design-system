# Grantbii's Design System

Based on Grantbii's Global Design Library in Figma.

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

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The pages auto-updates as you edit the files.

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

Publishing to NPM is automatic with [GitHub Actions](.github/workflows/continuous-delivery.yaml).

Once a commit has been made on the `prod` branch, a build would be triggered.
