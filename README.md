# Grantbii's Design System

Based on Grantbii's Global Design Library in Figma.

## Prerequisites

Node 22

```bash
node -v  # expected output: v22.14.xx
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

Use the `webp` format for images as it is lossless but more efficient than `png`.

Get started by installing [`cwebp`](https://developers.google.com/speed/webp/docs/cwebp).

Convert an image from `png` to `webp` like so:

```bash
cwebp -exact -lossless -progress your_image.png -o your_image.webp
```

## Deploy

Deployment is automatic with [AWS Amplify](https://aws.amazon.com/amplify).

Once a commit has been made on the `prod` branch, a build would be triggered.
