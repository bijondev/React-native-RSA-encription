# React-native-RSA-encription
React native RSA encription


Implementing RSA encryption in a React Native Expo app requires a combination of JavaScript libraries, as Expo doesn't support native modules out of the box. One of the most common libraries for cryptographic operations in JavaScript is the node-forge library.

Below is a step-by-step guide on how to implement RSA encryption with the specified padding ("RSA/ECB/OAEPWithSHA-256AndMGF1Padding") in a React Native Expo app using node-forge:

Step 1: Install necessary libraries
First, install the required library:

npm install node-forge


Step 2: RSA Encryption
Here's a sample code snippet that demonstrates generating RSA keys and encrypting a message using the given padding:

import forge from 'node-forge';

// Generate RSA keys
const generateRSAKeys = () => {
  const keys = forge.pki.rsa.generateKeyPair(2048);
  return {
    publicKey: forge.pki.publicKeyToPem(keys.publicKey),
    privateKey: forge.pki.privateKeyToPem(keys.privateKey),
  };
};

// Encrypt data using RSA public key and specified padding
const rsaEncrypt = (publicKeyPem, message) => {
  const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

  const encrypted = publicKey.encrypt(message, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });

  return forge.util.encode64(encrypted);
};

// Decrypt data using RSA private key and specified padding
const rsaDecrypt = (privateKeyPem, encryptedBase64) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  const encrypted = forge.util.decode64(encryptedBase64);

  const decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
    mgf1: {
      md: forge.md.sha256.create(),
    },
  });

  return decrypted;
};

// Sample usage
const { publicKey, privateKey } = generateRSAKeys();
const message = "Hello, World!";
const encryptedMessage = rsaEncrypt(publicKey, message);
console.log('Encrypted:', encryptedMessage);

const decryptedMessage = rsaDecrypt(privateKey, encryptedMessage);
console.log('Decrypted:', decryptedMessage);


Note: Always make sure to use strong key lengths (2048 bits or more) and never expose private keys. The above example is for educational purposes, and in a real-world scenario, it's essential to handle keys and cryptographic operations with great care.

Also, keep in mind that RSA encryption is suited for encrypting small amounts of data, like symmetric keys. If you're encrypting large data, you might consider using a hybrid encryption approach: RSA to encrypt a symmetric key (like an AES key) and then AES to encrypt the actual data.

If you want to use your own RSA key pair, rather than generating one on-the-fly, you can do so with `node-forge`. However, you need to make sure that your keys are in the correct format (PEM format is commonly used).

Let's assume you have an RSA private key and public key in PEM format. You can use them directly with the encryption and decryption functions from the previous example. Here's how:

### 1. Your RSA keys in PEM format:

```javascript
const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
... (Your private key data here) ...
-----END RSA PRIVATE KEY-----`;

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
... (Your public key data here) ...
-----END PUBLIC KEY-----`;
```

### 2. Use the given keys for encryption and decryption:

You can directly use the `rsaEncrypt` and `rsaDecrypt` functions from the previous example with these keys.

```javascript
import forge from 'node-forge';

// The rsaEncrypt and rsaDecrypt functions remain unchanged from the previous example

// Encrypt data using your RSA public key
const message = "Hello, World!";
const encryptedMessage = rsaEncrypt(publicKeyPem, message);
console.log('Encrypted:', encryptedMessage);

// Decrypt data using your RSA private key
const decryptedMessage = rsaDecrypt(privateKeyPem, encryptedMessage);
console.log('Decrypted:', decryptedMessage);
```

Remember:

- **Security Concern**: Never hard-code private keys directly into your application code. Especially if your code is in a client-side app, this poses a significant security risk. Always fetch private keys securely at runtime or store them in a secure environment.
  
- **PEM Format**: The keys should be correctly formatted. PEM format starts and ends with specific headers, like `-----BEGIN PUBLIC KEY-----` for public keys and `-----BEGIN RSA PRIVATE KEY-----` for private RSA keys. Ensure your keys have the appropriate headers and footers.

- const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
... (Your private key data here) ...
-----END RSA PRIVATE KEY-----`;

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
... (Your public key data here) ...
-----END PUBLIC KEY-----`;


2. Use the given keys for encryption and decryption:
You can directly use the rsaEncrypt and rsaDecrypt functions from the previous example with these keys.

import forge from 'node-forge';

// The rsaEncrypt and rsaDecrypt functions remain unchanged from the previous example

// Encrypt data using your RSA public key
const message = "Hello, World!";
const encryptedMessage = rsaEncrypt(publicKeyPem, message);
console.log('Encrypted:', encryptedMessage);

// Decrypt data using your RSA private key
const decryptedMessage = rsaDecrypt(privateKeyPem, encryptedMessage);
console.log('Decrypted:', decryptedMessage);


Remember:

Security Concern: Never hard-code private keys directly into your application code. Especially if your code is in a client-side app, this poses a significant security risk. Always fetch private keys securely at runtime or store them in a secure environment.

PEM Format: The keys should be correctly formatted. PEM format starts and ends with specific headers, like -----BEGIN PUBLIC KEY----- for public keys and -----BEGIN RSA PRIVATE KEY----- for private RSA keys. Ensure your keys have the appropriate headers and footers.

To declare an RSA public key in a variable, you usually store it as a string in PEM format. PEM format is a Base64 encoded representation of the key data enclosed between header and footer lines.

Here's an example of how you can declare a public key in a variable:

```javascript
const publicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxUllHypxJZ/LZgwZt6G5
o/0eWVM+XxrNg8U+EJKO7A3Z5G5H/Dr0RjyBZcr6enZ+Z9yZcCJ4cAHDZoM5shPQ
p7AVO/uxc8aFP7DBsIzUjAIyo2kLjHA5Bxb9IsF5ndQSJkdGjEj6RbPOYRbfsDjG
OLuhC2kTsEJ+YQ+M0tj2w8hFqCg8htUpQzjGKbFE1/xOmnw3ckuuO8Ds6ZWUOsGy
MUbMxTz8ZjhSlVWU0ZkEotPiWoEAU7LeSF8C/h7tCQeX1aTJPDN7DrWH3Din5qEP
A70KRtEXH6tO3xme8kn+zBo6t+JlNewXNmtOgZ5povofRphPbBpY+L2ZaZDCJfhs
twIDAQAB
-----END PUBLIC KEY-----
`;

console.log(publicKeyPem);
```

Few things to note:

1. **Spacing and Newlines**: Ensure there are no extra spaces or missing newlines. The beginning and end lines (`-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`) are crucial for many parsers to recognize the key.

2. **Security**: While it's typically safe to include a public key directly in your code (since it's public information), you still might want to fetch it dynamically if it changes frequently or if you have some other organizational concerns.

3. **Avoid Hardcoding**: As a general rule of thumb, avoid hardcoding any keys (private or public) directly into your application. Instead, use environment variables, configuration files, or secure key management services.

Remember, the example above is just that — an example. You'd replace the actual key data between the `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----` lines with your public key's data.

The error "Invalid PEM formatted message" typically arises when you're trying to parse or use a PEM-encoded message (like an RSA key) but the content is not properly formatted or is corrupted. The following are some potential causes and solutions:

### 1. **Header/Footer Mismatch**:
Ensure that the PEM string has both the correct BEGIN and END tags, and they match the type of data you're working with.

For instance:
- RSA Private Key: `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`
- Public Key: `-----BEGIN PUBLIC KEY-----` and `-----END PUBLIC KEY-----`

### 2. **Extra Whitespaces or Newlines**:
Check if there are any extra spaces, tabs, or newlines before the BEGIN tag or after the END tag.

### 3. **Base64 Content**:
The content between the BEGIN and END tags should be Base64 encoded. Ensure there are no invalid characters or broken lines. Some editors might inadvertently introduce line breaks or other characters.

### 4. **Complete Key Data**:
Ensure that your key data is complete and hasn't been truncated. If a PEM string is cut off, it will not be valid.

### 5. **Avoid Hardcoding**:
If you're hardcoding the PEM string into a JavaScript file, ensure you're handling multi-line strings correctly. For instance:

```javascript
const publicKeyPem = `
-----BEGIN PUBLIC KEY-----
MIIBIjAN...
...
twIDAQAB
-----END PUBLIC KEY-----
`;
```

Notice the use of backticks (`) for the multi-line string.

### 6. **Reading from File or Environment Variable**:
If you're reading the PEM data from a file or an environment variable, double-check that the content is being read correctly without any unintentional modifications.

### 7. **Correct Key Type**:
Ensure you're using the right key type for the operation. For instance, don't try to use a private key where a public key is expected, and vice versa.

### 8. **Library or Package Issues**:
It's also possible (though less likely) that there's an issue with the library or package you're using. Ensure you're using the latest version and check if there are any known issues related to PEM parsing.

If you've checked all of these and are still encountering the error, it might be helpful to provide the exact code or context where you're seeing this issue so that more specific guidance can be provided. Remember not to share any private key data when sharing your code or errors.
