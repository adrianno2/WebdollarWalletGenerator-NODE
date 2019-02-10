# WebdollarWalletGenerator

Simple script to generate a Webdollar random wallet or from mnemonic. Run this on your server then access the API to generate. 

### Installation

This script requires [Node.js](https://nodejs.org/) v8.2.1 to run.

```sh
git clone https://github.com/adrianno2/WebdollarWalletGenerator-NODE.git
cd WebdollarWalletGenerator-NODE
npm install
```

### Launch
By default it runs on port ```3333```, you can change it by editing ```main.js``` and search for  ```listen(3333)```

Simple start

```sh
node main.js
```
Start with PM2

```sh
pm2 start main.js
```
Start with screen

```sh
screen node main.js
```

### Usage

PHP random wallet:
```php
<?php
    $wallet = file_get_contents('http://127.0.0.1:3333/wallet/simple');
    // save the wallet as is or decode it:
    $wallet = json_decode($wallet);
    echo $wallet->address;
    echo $wallet->publicKey;
    echo $wallet->privateKey;
?>
```

PHP Wallet from mnemonic:
```php
<?php
    $mnemonic = "obvious clerk essence hurry jar love recipe tenant belt sunset tiny reduce";
    $wallet = file_get_contents('http://127.0.0.1:3333/wallet/mnemonic?mnemonic=' . urlencode($mnemonic));
    // save the wallet as is or decode it:
    $wallet = json_decode($wallet);
    echo $wallet->address;
    echo $wallet->publicKey;
    echo $wallet->privateKey;
?>
```

Python random wallet:
```python
import requests
response = requests.get('http://127.0.0.1:3333/wallet/simple')
wallet = response.text
```

Python Wallet from mnemonic:
```python
import requests
mnemonic = 'obvious clerk essence hurry jar love recipe tenant belt sunset tiny reduce'
payload = {'mnemonic': mnemonic}
response = requests.get('http://127.0.0.1:3333/wallet/mnemonic', params=payload)
wallet = response.text
```
