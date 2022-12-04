import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserModel } from '../../domain/user.schema';
import { QueryUsersRepositoryInterface } from '../../interfaces/query.users.repository.interface';
import { MainQueryRepository } from '../../../shared/infrastructure/query/main.query.repository';

@Injectable()
export class QueryUsersRepository
	extends MainQueryRepository<UserModel>
	implements QueryUsersRepositoryInterface
{
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserModel>,
	) {
		super(userModel);
	}

	public searchTerm(login: string | undefined, email: string | undefined): Record<string, unknown> {
		let searchString = {};

		const searchLoginTerm = login
			? {
					login: { $regex: login, $options: 'i' },
			  }
			: null;
		const searchEmailTerm = email
			? {
					email: { $regex: email, $options: 'i' },
			  }
			: null;

		if (searchLoginTerm) searchString = searchLoginTerm;
		if (searchEmailTerm) searchString = searchEmailTerm;

		if (searchLoginTerm && searchEmailTerm)
			searchString = {
				$or: [searchLoginTerm, searchEmailTerm],
			};

		return searchString;
	}
}
