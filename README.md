# gh-docs

A single page document HTML template using an iframe.

## Directory Structure

```text
.
├── dist/
│   ├── all.css
│   ├── all.css.map
│   ├── all.min.css
│   ├── all.min.css.map
│   ├── all.js
│   ├── all.js.map
│   ├── all.min.js
│   └── all.min.js.map
└── src/
    ├── assets/
    │   ├── image/
    │   ├── js/
    │   └── scss/
    ├── data/
    ├── template-parts/
    │   ├── breadcrumb.html
    │   └── hero.html
    ├── templates/
    ├── footer.html
    ├── header.html
    ├── index.html
    ├── sidebar-1.html
    └── sidebar-2.html
```

Directory tree created by [tree.nathanfriend.io](https://tree.nathanfriend.io/)

## CDN

stylesheet

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.2.3/dist/all.min.css" />
```

script

```html
<script src="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.2.3/dist/all.min.js">
```

## Dependency

- [normalize](https://github.com/necolas/normalize.css/)  
  A modern alternative to CSS resets

- [bootstrap-icons](https://github.com/twbs/icons)  
  Official open source SVG icon library for Bootstrap.

- [webfont](https://github.com/typekit/webfontloader)  
  Web Font Loader gives you added control when using linked fonts via @font-face.

- [gsap](https://github.com/greensock/GSAP)  
  GreenSock's GSAP JavaScript animation library (including Draggable).

## License

This project is licensed under the [MIT LICENSE](LICENSE).
