import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserExtendsDto } from '../../dto';
import { User, UserModel } from '../../domain/user.schema';
import { UsersRepositoryInterface } from '../../interfaces/users.repository.interface';
import { MainRepository } from '../../../shared/infrastructure/repository/main.repository';

@Injectable()
export class UsersRepository
	extends MainRepository<UserModel, CreateUserExtendsDto>
	implements UsersRepositoryInterface
{
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserModel>,
	) {
		super(userModel);
	}

	async findUserByLogin(login: string): Promise<UserModel | null> {
		return this.userModel.findOne({ login });
	}

	async findUserByEmail(email: string): Promise<UserModel | null> {
		return this.userModel.findOne({ email });
	}

	async findUserByEmailOrLogin(emailOrLogin: string): Promise<UserModel | null> {
		return this.userModel.findOne({ $or: [{ login: emailOrLogin }, { email: emailOrLogin }] });
	}

	async findUserByConfirmationCode(confirmationCode: string): Promise<UserModel | null> {
		return this.userModel.findOne({
			confirmationCode,
		});
	}
}
