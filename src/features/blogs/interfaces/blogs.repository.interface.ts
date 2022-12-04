import { MainRepositoryInterface } from '../../shared/interfaces/main.repository.interface';
import { BlogModel } from '../domain/blog.schema';
import { CreateBlogExtendsDto } from '../dto';
import { BanModel } from '../domain/ban.schema';
import { BanUnbanBlogOfUserExtendsDto } from '../dto/ban-unban-blog-of-user-extends.dto';

/* eslint-disable */
export interface BlogsRepositoryInterface
	extends MainRepositoryInterface<BlogModel, CreateBlogExtendsDto> {
	findBanByBlogIdAndUserId(blogId: string, userId: string): Promise<BanModel | null>
	createBanModel(data: BanUnbanBlogOfUserExtendsDto): Promise<BanModel>
	saveBanModel(model: BanModel): Promise<BanModel>
	deleteAllBan(): Promise<void>
}
