import * as t from '../actions/types';
import middleware from './blocks';

describe('middleware/blocks', () => {
  let mockStore, mockNext, mockAction, mockDispatch, mockGetState,
      mockAdapter;

  beforeEach(() => {
    mockStore = {
      dispatch: mockDispatch,
      getState: mockGetState,
    };
    mockNext = jest.fn();
    mockDispatch = jest.fn();
    mockAdapter = {};
  });

  it('should forward unrecognized actions', () => {
    mockAction = {
      type: 'test/TEST_ACTION',
    };

    middleware(mockStore)(mockNext)(mockAction);

    expect(mockNext).toBeCalledWith(mockAction);
  });

  it('should call getBlocks for the amount of blocks specified', async () => {
    mockAction = {
      type: t.FETCH_BLOCKS,
      payload: {
        endingBlockNumber: 20,
        amountBlocks: 4,
      },
    };
    mockAdapter.getBlocks = jest.fn(numbers => numbers.map(n => ({ number: `N${n}` })));

    await middleware(mockStore, mockAdapter)(mockNext)(mockAction);

    const expectedBlocksLoaded = ['N20', 'N19', 'N18', 'N17'];
    const expectedBlocksByNumber = {
      N20: { number: 'N20' },
      N19: { number: 'N19' },
      N18: { number: 'N18' },
      N17: { number: 'N17' },
    };
    const nextAction = mockNext.mock.calls[0][0];
    expect(nextAction).toHaveProperty('type', t.FETCH_BLOCKS);
    expect(nextAction).toHaveProperty('payload');
    expect(nextAction.payload).toHaveProperty('blocksLoaded', expectedBlocksLoaded);
    expect(nextAction.payload).toHaveProperty('byNumber', expectedBlocksByNumber);
  });
});
