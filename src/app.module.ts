import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [ProductsModule,
    AuthModule,
    MongooseModule
      .forRoot(`mongodb+srv://asad:K5dynW5f1qC6x6bH@cluster0-3u6fq.mongodb.net/test?retryWrites=true&w=majority`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
