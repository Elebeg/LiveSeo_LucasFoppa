import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    new User({
      id: 1,
      name: 'Ana',
      email: 'ana@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new User({
      id: 2,
      name: 'Pedro',
      email: 'pedro@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];
  private nextId = 3;

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User> {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User({
      id: this.nextId++,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.users.push(newUser);
    
    return newUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    Object.assign(user, {
      ...updateUserDto,
      updatedAt: new Date(),
    });
    
    return user;
  }

  async remove(id: number): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    this.users.splice(index, 1);
  }
}