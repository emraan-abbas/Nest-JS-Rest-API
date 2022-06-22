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
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  };

  @Get(':id')
  getABlog(@Param('id') blogId:string) {
    return this.blogService.getABlog(blogId);
  };

  @Patch(':id')
  updateBlog(
    @Param('id') blogId: string,
    @Body('title') title: string,
    @Body('description') description: string
  ) {};

  @Delete(':id')
  deleteBlog(@Param('id') blogId: string) {};

};

