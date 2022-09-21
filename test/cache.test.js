import { Cache } from "../src/cache";

describe('Cache test', () => {
	describe('Cache: addValueByKey tests', () => {
		const cache = new Cache();

		test('addValueByKey method should throw error', () => {
			const testData = {
				key: undefined,
			};

			expect(() => cache.addValueByKey(testData)).toThrowError(new Error("Key isn't valid"));
		});

		test('addValueByKey method should add key with value', () => {
			const testData = {
				key: 'foo1',
				value: 728,
				requests: 2
			};

			cache.addValueByKey(testData);

			expect(cache.getValueByKey(testData.key)).toBe(testData.value);
		});

		test('addValueByKey method should set number of requests to 1 by default', () => {
			const testData = {
				key: 'foo2',
				value: 2
			};

			cache.addValueByKey(testData);
			cache.getValueByKey(testData.key);

			expect(cache.getStat[0].requests).toBe(0);
		});
	});

	describe('Cache: getValueByKey tests', () => {
		const cache = new Cache();

		test('getValueByKey method should return null by on non-existing key pass', () => {
			expect(cache.getValueByKey('key')).toBeNull();
		});

		test('getValueByKey method should return null by on key with zero requests ', () => {
			const testData = {
				key: 'foo1',
				value: 1,
				requests: 0
			};

			cache.addValueByKey(testData);

			expect(cache.getValueByKey(testData.key)).toBeNull();
		});

		test('getValueByKey method should return value on valid key pass', () => {
			const testData = {
				key: 'foo2',
				value: 852
			};

			cache.addValueByKey(testData);

			expect(cache.getValueByKey(testData.key)).toBe(testData.value);
		});
	});

	describe('Cache: getStatAsText tests', () => {
		const cache = new Cache();
		
		test('getStat method should return empty string on empty requests log', () => {
			expect(cache.getStatAsText).toBe('');
		});

		test('getStat method should return target text on non-empty requests log', () => {
			const testData1 = {
				key: 'foo1',
				value: 111,
				requests: 2
			};

			const testData2 = {
				key: 'foo2',
				value: 222,
				requests: 2
			};

			const targetTextLinesArray = [
				`1: key: ${ testData2.key }, value: ${ testData2.value }, requests: ${ testData2.requests - 1 };`,
				`2: key: ${ testData1.key }, value: ${ testData1.value }, requests: ${ testData1.requests - 1 };`
			];

			cache.addValueByKey(testData1);
			cache.getValueByKey(testData1.key);
			cache.addValueByKey(testData2);
			cache.getValueByKey(testData2.key);

			expect(cache.getStatAsText).toBe(targetTextLinesArray.join('\r\n'));
		});
	});
});;
