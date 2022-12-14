import { IsNotEmpty, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { trim } from '../../../common/helpers';

export class UpdateBlogDto {
	@IsNotEmpty()
	@Transform(({ value }) => trim(value))
	@MaxLength(15)
	name: string;

	@IsNotEmpty()
	@Matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/)
	@MaxLength(100)
	websiteUrl: string;

	@IsNotEmpty()
	@Transform(({ value }) => trim(value))
	@MaxLength(500)
	description: string;
}
