export const fallbackUrl = 'https://rpc2.mix-blockchain.org:8647';
export const maxBlocksPerPage = 10;

export const tableFields = {
  blocks: [
    {
      key: 'number',
      label: 'Block',
    },
    {
      key: 'time',
      label: 'Time',
    },
    {
      key: 'transactions',
      label: '# of Tx',
    },
    {
      key: 'miner',
      label: 'Mined by',
    },
  ],
  transactions: [
    {
      key: 'hash',
      label: 'Tx Hash',
    },
    {
      key: 'amount',
      label: 'Amount',
    },
  ],
};
