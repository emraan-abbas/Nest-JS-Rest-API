import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose"

import { BlogsController } from "./blog.controller";
import { BlogSchema } from "./blog.model";
import { BlogsService } from "./blog.service";

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Blog', schema: BlogSchema}])
  ],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogModule {

}

