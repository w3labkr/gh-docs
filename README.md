# gh-docs

A single page document HTML template using an iframe.

## Directory Structure

```text
.
├── dist/
│   ├── gh-docs.css
│   ├── gh-docs.css.map
│   ├── gh-docs.min.css
│   ├── gh-docs.min.css.map
│   ├── gh-docs.js
│   ├── gh-docs.js.map
│   ├── gh-docs.min.js
│   └── gh-docs.min.js.map
└── src/
    ├── assets/
    │   ├── images/
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

Directory tree generated using [tree.nathanfriend.io](https://tree.nathanfriend.io/).

## CDN

stylesheet

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.2.6/dist/gh-docs.min.css" />
```

script

```html
<script src="https://cdn.jsdelivr.net/gh/w3labkr/gh-docs@1.2.6/dist/gh-docs.min.js"></script>
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
