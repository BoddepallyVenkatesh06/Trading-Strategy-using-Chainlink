import { fetchPublicApi } from '$lib/helpers/public-api';

export type LendingReserve = {
	reserve_id: number;
	reserve_slug: string;
	protocol_slug: string;
	protocol_name: string;
	chain_id: number;
	chain_slug: string;
	chain_name: string;
	asset_id: number;
	asset_name: string;
	asset_symbol: string;
	asset_address: Address;
	atoken_id: number;
	atoken_address: Address;
	stable_debt_token_id: number;
	stable_debt_token_address: Address;
	variable_debt_token_id: number;
	variable_debt_token_address: Address;
	interest_rate_strategy_address: Address;
	additional_details: {
		supply_apr_latest: number;
		stable_borrow_apr_latest: number;
		variable_borrow_apr_latest: number;
		aggregated_reserve_data?: Record<string, string | number>;
		base_currency_info?: Record<string, number>;
	};
};

export type LendingReserveIndexParams = Partial<{
	protocol_slug: string;
	chain_slug: string;
	page_size: number | string;
	page: number | string | null;
	sort: string;
	direction: 'asc' | 'desc';
}>;

type LendingReserveSearchKey = keyof LendingReserveIndexParams;

export type LendingReserveIndexResponse = {
	rows: LendingReserve[];
	totalRowCount: number;
};

const defaultParams: LendingReserveIndexParams = {
	page_size: 10,
	page: 0,
	sort: 'variable_borrow_apr_latest',
	direction: 'asc'
};

const allKeys: LendingReserveSearchKey[] = ['page_size', 'page', 'sort', 'direction', 'protocol_slug', 'chain_slug'];

export async function fetchLendingReserves(fetch: Fetch, params: LendingReserveIndexParams) {
	const apiParams: Record<string, string> = {};

	for (const key of allKeys) {
		const value = params[key] || defaultParams[key];
		if (value) apiParams[key] = String(value);
	}

	const data = await fetchPublicApi(fetch, 'lending-reserves', apiParams, true);

	return {
		rows: data.results,
		totalRowCount: data.total
	} as LendingReserveIndexResponse;
}
