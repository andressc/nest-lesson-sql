import { Injectable } from '@nestjs/common';
import { BlogsRepository } from '../infrastructure/repository/blogs.repository';
import { BlogModel } from '../../entity/blog.schema';
import { ValidationService } from './validation.service';
import { CreateBlogDto } from '../dto/blogs/create-blog.dto';
import { UpdateBlogDto } from '../dto/blogs/update-blog.dto';
import { BlogNotFoundException } from '../../common/exceptions';
import { createDate } from '../../common/helpers';

@Injectable()
export class BlogsService {
	constructor(
		private readonly blogsRepository: BlogsRepository,
		private readonly validationService: ValidationService,
	) {}

	async createBlog(data: CreateBlogDto): Promise<string> {
		await this.validationService.validate(data, CreateBlogDto);

		return this.blogsRepository.createBlog({ ...data, createdAt: createDate() });
	}

	async updateBlog(id: string, data: UpdateBlogDto): Promise<void> {
		await this.validationService.validate(data, UpdateBlogDto);

		const blog: BlogModel = await this.checkBlogExists(id);
		await this.blogsRepository.updateBlog(blog, data);
	}

	async removeBlog(id: string): Promise<void> {
		const blog: BlogModel = await this.checkBlogExists(id);
		await this.blogsRepository.removeBlog(blog);
	}

	private async checkBlogExists(id: string): Promise<BlogModel> {
		const blog: BlogModel | null = await this.blogsRepository.findBlogModel(id);
		if (!blog) throw new BlogNotFoundException(id);
		return blog;
	}
}
