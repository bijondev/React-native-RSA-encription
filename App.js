import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import forge from 'node-forge';

export default function App() {

  // const generateRSAKeys = () => {
  //   const keys = forge.pki.rsa.generateKeyPair(2048);
  //   return {
  //     publicKey: forge.pki.publicKeyToPem(keys.publicKey),
  //     privateKey: forge.pki.privateKeyToPem(keys.privateKey),
  //   };
  // };

  const publicKeyPem = `
  -----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgF96iehqvtvJ83/YH5gT
TisvL032M8+u3w20N9jT4+L3hzz0J9Va+JCcMO+5pWQBpzYmcTopl6C3hWRuSrxs
ZkRkd7dOAkV3hNfr7k/YUFIAph2Q6CgjhK/JDCh95xVhEklC+o2QqihsIalhI4vL
dukiLzA/jcdIcR+V0NffjSGnY/W7z+kl7W8aGl/daWOxtYovnEKq0+in6hCvHIzK
e/giz4FCah8IirpCO/kG/Es0obYIACYk1HiU+EMvgNHeKfT+bh49w56iX6naWO/A
X+U6P3G2uE1KsNOnCXaNqdq67JsbajUqlv8jKlpkWTc5RqvX7hCwVFyPMOXAYoYR
XwIDAQAB
-----END PUBLIC KEY-----
  `;

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

  // const { publicKey, privateKey } = generateRSAKeys();

  // console.log('publicKey:', publicKey);
  // console.log('privateKey:', privateKey);

  const message = "Hello, World!";
  const encryptedMessage = rsaEncrypt(publicKeyPem, message);
  console.log('Encrypted:', encryptedMessage);

  // const decryptedMessage = rsaDecrypt(privateKey, encryptedMessage);
  // console.log('Decrypted:', decryptedMessage);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
