# WebdollarWalletGenerator

Simple script to generate a Webdollar wallet. Run this on your server then access the API to generate a wallet. 

### Installation

This script requires [Node.js](https://nodejs.org/) v8.2.1 to run.

```sh
$ git clone https://github.com/adrianno2/WebdollarWalletGenerator.git
$ cd WebdollarWalletGenerator
$ npm install
```

### Launch
By default it runs on port ```3333```, you can change it by editing ```main.js``` and search for  ```listen(3333)```

Simple start

```sh
$ node main.js
```
Start with PM2

```sh
$ pm2 start main.js
```
Start with screen

```sh
$ screen node main.js
```

### Usage

PHP:
```sh
<?php
    $wallet = file_get_contents('http://127.0.0.1:3333/wallet/simple');
    // save the wallet as is or decode it:
    $wallet = json_decode($wallet);
    echo $wallet->address;
    echo $wallet->publicKey;
    echo $wallet->privateKey;
?>
```
Python:
```sh
>>> import requests
>>> r = requests.get('http://127.0.0.1:3333/wallet/simple')
>>> wallet = r.text
```
