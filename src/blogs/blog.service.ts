import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { BlogInterface } from './blog.model';


@Injectable()
export class BlogsService {

  constructor(@InjectModel('Blog') private readonly blogModel: Model<BlogInterface>) {}
  // Up in the Constructor we are Injecting BLOG schema from Module
  // and saving it into "blogModel" and setting type to Model<BlogInterface>

  async addBlog(title: string, description: string) {
    try{
      const newBlog = new this.blogModel({title: title, description: description});
      const result =  await newBlog.save();
      return result;
    }
    catch(error){
      throw new NotFoundException('ERROR AT ADD BLOG') 
    }
  };

  async getAllBlogs() {
    try{
      const allBlogs = await this.blogModel.find().exec();
      return allBlogs.map(e => ({     // Just reshaping output here by using MAP
        id: e.id,
        title: e.title,
        description: e.description
      }));
    }
    catch(error){
      throw new NotFoundException('ERROR AT FIND ALL BLOGS')

    }
  };

  async getABlog(blogId: string) {
    try{
      const blog = await this.blogModel.findById(blogId)
      if(!blog){
        throw new NotFoundException('No Blog Found')
      }
      else{
        return blog;
      }
    }
    catch(error){
      throw new NotFoundException('ERROR AT GET A BLOG')
    }  
  };

  async updateBlog(blogId: string, title: string, description: string) {
    const blog = await this.getABlog(blogId);
    if(title){
      blog.title = title;
    };
    if(description){
      blog.description = description
    };
    return await blog.save();
  };

  async deleteBlog(blogId: string) {
    try{
      return this.blogModel.deleteOne({_id: blogId})
    }
    catch(error){
      throw new NotFoundException('ERROR AT DELETE A BLOG')
    }
  }

};

