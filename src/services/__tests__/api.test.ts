import axios from 'axios';
import api, {
  register,
  login,
  createBottle,
  createAnonymousBottle,
  getRandomBottle,
  storeBottle,
  getStoredBottles,
  getStoredBottle,
  deleteStoredBottle,
  getUserInfo,
} from '../api';

jest.mock('axios', () => {
  const mockApi = {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  };
  const mockCreate = jest.fn(() => mockApi);
  const mockPost = jest.fn();
  const axiosDefault = { create: mockCreate, post: mockPost, __mockApi: mockApi };

  return {
    __esModule: true,
    default: axiosDefault,
    create: mockCreate,
    post: mockPost,
    __mockApi: mockApi,
  };
});

describe('api service', () => {
  const axiosMock = axios as jest.Mocked<typeof axios>;
  const mockApi = (axios as any).__mockApi as {
    post: jest.Mock;
    get: jest.Mock;
    delete: jest.Mock;
  };

  beforeEach(() => {
    mockApi.post.mockClear();
    mockApi.get.mockClear();
    mockApi.delete.mockClear();
    axiosMock.post.mockClear();
  });

  it('should create axios client with base config', () => {
    expect(axiosMock.create).toHaveBeenCalledWith({
      baseURL: 'https://unsatiating-clustered-phoenix.ngrok-free.dev',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(api).toBe(mockApi);
  });

  it('should call auth endpoints', () => {
    register({ username: 'user1', password: 'pass1' });
    login({ username: 'user2', password: 'pass2' });

    expect(mockApi.post).toHaveBeenCalledWith('/auth/register', {
      username: 'user1',
      password: 'pass1',
    });
    expect(mockApi.post).toHaveBeenCalledWith('/auth/login', {
      username: 'user2',
      password: 'pass2',
    });
  });

  it('should call bottle endpoints', () => {
    createBottle({ content: 'hello', type: 'public' });
    createAnonymousBottle({ content: 'anon', type: 'private' });
    getRandomBottle();

    expect(mockApi.post).toHaveBeenCalledWith('/sea/bottle', {
      content: 'hello',
      type: 'public',
    });
    expect(axiosMock.post).toHaveBeenCalledWith(
      'https://unsatiating-clustered-phoenix.ngrok-free.dev/sea/bottle',
      { content: 'anon', type: 'private' },
      { headers: { 'Content-Type': 'application/json' } }
    );
    expect(mockApi.get).toHaveBeenCalledWith('/sea/bottle');
  });

  it('should call stored bottle endpoints', () => {
    storeBottle({ bottle_id: '123' });
    getStoredBottles();
    getStoredBottle('456');
    deleteStoredBottle('789');

    expect(mockApi.post).toHaveBeenCalledWith('/api/store-bottle', { bottle_id: '123' });
    expect(mockApi.get).toHaveBeenCalledWith('/api/store-bottle');
    expect(mockApi.get).toHaveBeenCalledWith('/api/store-bottle/456');
    expect(mockApi.delete).toHaveBeenCalledWith('/api/store-bottle/789');
  });

  it('should call user info endpoint', () => {
    getUserInfo();

    expect(mockApi.get).toHaveBeenCalledWith('/api/me');
  });
});
