export class Cache {
	#cacheValuesMap = new Map();
	#cacheRequestsLog = [];

	addValueByKey({ key, value, requests = 1 }) {
		if (!key) {
			throw new Error("Key isn't valid");
		}

		this.#cacheValuesMap.set(key, { value, requests });
	}

	getValueByKey(key) {
		if (!this.#cacheValuesMap.has(key)) {
			return null;
		}

		const keyValue = this.#cacheValuesMap.get(key);
		const updatedKeyValue = { ...keyValue, requests: keyValue.requests - 1 };

		this.#cacheRequestsLog.unshift({ ...updatedKeyValue, key });

		if (keyValue.requests == 0) {
			this.#cacheValuesMap.delete(key);
			return null;
		}

		this.#cacheValuesMap.set(updatedKeyValue);

		return keyValue.value;
	}

	get getStat() {
		return this.#cacheRequestsLog;
	}

	get getStatAsText() {
		if (this.#cacheRequestsLog.length < 1) {
			return '';
		}

		return this.#cacheRequestsLog
			.map(({ key, value, requests }, index) => {
				return `${ index + 1 }: key: ${ key }, value: ${ value }, requests: ${ requests };`;
			})
			.join('\r\n');
	}
}