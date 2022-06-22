import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { BlogsService } from './blog.service';

@Controller('blogs')
export class BlogsController {

  constructor(private readonly blogService: BlogsService) {}

  @Post('post')
  async addBlogs(
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    const generatedId = await this.blogService.addBlog(title, description);
    return generatedId;
  };


  @Get('get')
  async getAllBlogs() {
    return await this.blogService.getAllBlogs();
  };

  @Get(':id')
  async getABlog(@Param('id') blogId:string) {
    return await this.blogService.getABlog(blogId);
  };

  @Patch(':id')
  async updateBlog(
    @Param('id') blogId: string,
    @Body('title') title: string,
    @Body('description') description: string
  ) {
    return await this.blogService.updateBlog(blogId, title, description)
  };

  @Delete(':id')
  async deleteBlog(@Param('id') blogId: string) {
    return await this.blogService.deleteBlog(blogId)
  };

};

