/**
 * Misc exchange data helpers.
 */

export type ExchangeNameInfo = {
	name: string;
	version: number;
};

/**
 * Split the server side versioned name to name and version pat.
 * @param name
 */
export function parseExchangeName(name: string): ExchangeNameInfo {
	const match = name.match(/(.*) v?(\d)$/);
	if (match) {
		return {
			name: match[1],
			version: Number.parseInt(match[2])
		};
	} else {
		return {
			name: name,
			version: 1
		};
	}
}

const exchangeLabels = {
	uniswap_v2: 'Uniswap v2 like',
	uniswap_v2_incompatible: 'Uniswap v2 (incompatible)',
	uniswap_v3: 'Uniswap v3'
};

export function exchangeTypeLabel(type: string) {
	// @ts-ignore
	return exchangeLabels[type] || type;
}
