export default class HashZone {
	static createHash(data) {
		const hash = crypto.createHash(this.algorithm);
		hash.update(data);
		return hash.digest('hex');
	  }
	
	static verifyHash(data, hash) {
		const calculatedHash = this.createHash(data);
		return calculatedHash === hash;
	  }
}