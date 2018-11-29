module.exports = class Cape {
    constructor(_key='',salt=0){
        var _reduced_key=0;
        this._key=_key;
        this.salt=salt;
        this._reduced_key = 0;
        for(let i = 0; i < _key.length; i++) {
            _reduced_key ^= (_key.charCodeAt(i) << (i % 8));
        }
        this._reduced_key=_reduced_key%256;
    }

        hash(source) {
        let destination=[];
        for(let i = 0; i < source.length; i++){
            destination[i]=((this._reduced_key ^ source[i] ^ this.salt ^ i) ^ this._key.charCodeAt((this._reduced_key ^ this.salt ^ i) % this._key.length));
            console.log(destination[i]);
        }
        return destination;
    }

    decrypt(source){
        let destination=[];
        for(let i = 0; i < source.length; i++){
            destination[i]=((this._reduced_key ^ source[i] ^ this.salt ^ i) ^ this._key.charCodeAt((this._reduced_key ^ this.salt ^ i) % this._key.length));
        }
        destination[source.length-1] ^= (this._reduced_key ^ this.salt);
        for(let i = 0; i < source.length-1; i++){
            let code=this._key.charCodeAt(((256-(this.salt ^ (i) ^ this._reduced_key))*(-1))% this._key.length);
            destination[i] ^= ((destination[source.length-1] ^ i) ^ code);
        }
        let destination2=[];
        for(let i = 0; i < source.length-1; i++){
            destination2[i]=((this._reduced_key ^ destination[i] ^ this.salt ^ i) ^ this._key.charCodeAt((this._reduced_key ^ this.salt ^ i) % this._key.length));
        }
        let retVal='';
        for(let i = 0; i < source.length-1; i++) {
            retVal+=String.fromCharCode(destination2[i]);
        }
        return retVal;
    }
};
