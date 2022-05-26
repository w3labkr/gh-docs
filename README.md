# gh-docs

A single page document HTML template using an iframe.

## Directory Structure

```text
.
└── docs/
    ├── inc/
    │   ├── ex1.html
    │   ├── ex2.html
    │   └── ex3.html
    ├── content-sidebar.html
    ├── content.html
    ├── index.html
    ├── sidebar-content.html
    └── sidebar-sidebar-content.html
```

Directory tree created by [tree.nathanfriend.io](https://tree.nathanfriend.io/)

## DNS-prefetch

DNS-prefetch is an attempt to resolve domain names before resources get requested.
This could be a file loaded later or link target a user tries to follow.

```html
<head>
  <meta http-equiv="x-dns-prefetch-control" content="on">

  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
  <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
  <link rel="preconnect" href="https://ajax.googleapis.com" crossorigin>
  <link rel="dns-prefetch" href="https://ajax.googleapis.com">
</head>
```

## CDN

filename: content, content-sidebar, sidebar-content, sidebar-sidebar-content

**stylesheet**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.1.1/dist/reset.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.1.1/dist/{filename}.css">
```

**script**

```html
<script src="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.1.1/dist/{filename}.js">
```

## Dependency

A modern alternative to CSS resets

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css">
```

Official open source SVG icon library for Bootstrap.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
```

Web Font Loader gives you added control when using linked fonts via @font-face.

```html
<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
<script>
var WebFontConfig = {
  google: {
    families: ['Noto Sans KR:100'],
    text: ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~'
  }
};
WebFont.load(WebFontConfig);
</script>
```

GreenSock's GSAP JavaScript animation library (including Draggable).

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3.9.1/dist/gsap.min.js"></script>
```

## License

This software is licensed under the [MIT LICENSE](LICENSE).
