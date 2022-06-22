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
      return {
        Message:'Error at Add Blog',
        error
      }
    }
  };

  async getAllBlogs() {
    try{
      const allBlogs = await this.blogModel.find()
      return allBlogs;
    }
    catch(error){
      return {
        Message:'Error at Get All Blogs',
        error
      }
    }
  };

  getABlog(blogId: string) {
    try{
      const blog = this.blogModel.findById(blogId)
      if(!blog){
        throw new NotFoundException('No Blog Found')
      }
      else{
        return blog;
      }
    }
    catch(error){
      return {
        message:'Error at Get A Blog',
        error
      }
    }  
  };

  updateBlog(blogId: string, title: string, description: string) {
    
  };

};

