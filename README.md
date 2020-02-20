# Vue Input Spinner


> Vue 2.x component for spinning inputs

![](https://kaangokdemir.me/vue-input-spinner.png)

[![NPM](https://nodei.co/npm/vue-input-spinner.png?stars&downloads)](https://nodei.co/npm/vue-input-spinner/)

[![npm package](https://img.shields.io/npm/v/vue-input-spinner.svg?style=flat-square)](https://www.npmjs.org/package/vue-input-spinner)

[![NPM downloads](http://img.shields.io/npm/dm/vue-input-spinner.svg?style=flat-square)](https://npmjs.org/package/vue-input-spinner)


## Demo

[https://vue-input-spinner.netlify.com/](https://vue-input-spinner.netlify.com/)

## Installation

```bash
# Yarn
yarn add vue-input-spinner
```
```bash
# NPM
npm i vue-input-spinner
```

## How to use

### Import at individual .vue files

```javascript
import VueInputSpinner from 'vue-input-spinner'

export default {
  components: {
    VueInputSpinner
  },
// ...
};
```

### Or register as a global component

```javascript
import Vue from 'vue'
import VueInputSpinner from 'vue-input-spinner'

Vue.use(VueInputSpinner)

/* Or you can set options */

Vue.use(VueInputSpinner, {
  buttonClass: 'fancy-class',
  minValue: 10,
  editable: false,
  // ...
})
```

### Template

```html
<vue-input-spinner v-model="myData"></vue-input-spinner>
```

#### or use with props

```html
<vue-input-spinner 
  v-model="myData"
  minValue="1"
  maxValue="10"
  step="0.5"
  inputClass="fancy-input"
  buttonClass="fancy-button"
  buttonLeftClass="this-class-will-overwrite"
  buttonRightClass="this-one-as-well"
  buttonLeftText="Minus (-)"
  buttonRightText="Plus (+)"
  :editable="false"
  :readonly="false"
  >
</vue-input-spinner>
```

### Available Props

| Attribute         | Type             | Default           | Description                          	                         |
|-------------------|------------------|-------------------|---------------------------------------------------------------- |
| :value            | Number           | 0                 | Value for binding                                               |
| :minValue         | Number           | 0                 | Minimum value                                                   |
| :maxValue         | Number           | 10**1000          | Maximum value (default infinite)                                |
| :step             | Number           | 1                 | Step between increase and decreases                             |
| :inputClass       | String           | vis-default-input | width: 50px; height: 44px; text-align: center; font-size: 24px; |
| :buttonClass      | String           | vis-default-button| width: 50px; height: 50px;                                      |
| :buttonLeftClass  | String           | ""                | This will overwrite buttonClass                                 |
| :buttonRightClass | String           | ""                | This will overwrite buttonClass                                 |
| :buttonLeftText   | String           | -                 | Text in left button                                             |
| :buttonRightText  | String           | +                 | Text in right button                                            |
| :editable         | Boolean          | true              | Toggling this converts input into a label                       |
| :readonly         | Booelan          | false             | Readonly input                                                  |


### Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

### Contributors

Kaan Gökdemir - Author ([@kaangokdemir](https://twitter.com/kaangokdemir)) - [kaangokdemir.com](https://kaangokdemir.com) 

### License

MIT

