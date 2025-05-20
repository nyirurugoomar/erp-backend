// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    const users = service.findAll();
    expect(users).toEqual([{ id: 1, name: 'Omar' }]);
  });

  it('should return one user by id', () => {
    const user = service.findOne(1);
    expect(user).toEqual({ id: 1, name: 'Omar' });
  });

  it('should return undefined if user not found', () => {
    const user = service.findOne(99);
    expect(user).toBeUndefined();
  });
});
