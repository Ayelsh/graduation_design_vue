<template>
    <div class="encryption-page">
        <div class="input-container">
            <label for="plaintext">{{ encryptionType==="encrypt" ? '明文' : '密文'}}：</label>
            <input id="plaintext" v-model="plaintext" placeholder="输入要加密/解密的文本">
        </div>
        <div class="input-container">
            <label for="key">密钥：</label>
            <input id="key" v-model="key" placeholder="输入密钥">
        </div>
        <div class="select-container">
            <label for="encryptionType">选择{{ encryptionType==="encrypt" ? '加密' : '解密'}}类型：</label>
            <select id="encryptionType" v-model="encryptionType">
                <option value="encrypt">加密</option>
                <option value="decrypt">解密</option>
            </select>
        </div>
        <div class="select-container">
            <label for="algorithm">选择算法：</label>
            <select id="algorithm" v-model="algorithm">
                <option value="DES">DES</option>
                <option value="3DES">3DES</option>
                <option value="AES128">AES-128</option>
            </select>
        </div>
        <div class="button-container">
            <button @click="performEncryptionOrDecryption" class="encrypt-button">{{ encryptionType==="encrypt" ? '加密' : '解密'}}</button>
        </div>
        <div class="result-container">
            <div class="result-box">
                <label>结果：</label>
                <textarea rows="5" v-model="resultText" readonly></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js';

export default {
    data() {
        return {
            plaintext: '',
            key: '',
            encryptionType: 'encrypt',
            algorithm: 'DES',
            isEncryptMode: true,
            resultText: ''
        };
    },
    methods: {
        performEncryptionOrDecryption() {
            if (this.encryptionType === 'encrypt') {
                this.resultText = this.encryptText(this.plaintext, this.key, this.algorithm);
            } else {
                this.resultText = this.decryptText(this.plaintext, this.key, this.algorithm);
                if (this.resultText === '') {
                    this.resultText = '错误的密文'
                }
            }
        },
        encryptText(plainText, key, algorithm) {
            switch (algorithm) {
                case 'DES':
                    return CryptoJS.DES.encrypt(plainText, key).toString();
                case '3DES':
                    return CryptoJS.TripleDES.encrypt(plainText, key).toString();
                case 'AES128':
                    return CryptoJS.AES.encrypt(plainText, key).toString();
                default:
                    return '';
            }
        },
        decryptText(cipherText, key, algorithm) {
            switch (algorithm) {
                case 'DES':
                    return CryptoJS.DES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
                case '3DES':
                    return CryptoJS.TripleDES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
                case 'AES128':
                    return CryptoJS.AES.decrypt(cipherText, key).toString(CryptoJS.enc.Utf8);
                default:
                    return '';
            }
            // const bytes = CryptoJS[algorithm].decrypt(cipherText, key);
            // return bytes.toString(CryptoJS.enc.Utf8);
        }
    }
};
</script>

<style scoped>
.app {
    font-family: Arial, sans-serif;
}

body {
    overflow: hidden;
    /* 防止页面溢出 */
}

.encryption-page {
    margin: auto auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 90%;
}

.input-container {
    margin-bottom: 10px;
}

input,
select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.select-container {
    margin-bottom: 20px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.encrypt-button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.encrypt-button:hover {
    background-color: #0056b3;
}

.result-container {
    display: flex;
    justify-content: center;
}

.result-box {
    width: 100%;
}

textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
}
</style>