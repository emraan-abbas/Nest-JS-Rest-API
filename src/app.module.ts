import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { BlogModule } from './blogs/blog.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/NestJS'),
    BlogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
