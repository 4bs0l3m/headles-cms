import { ContentTypeService } from './services/content-type.service';
import { ContentService } from './services/content.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from './env.const';
import { User } from './common/dtos/auth/User.dto';
import { UserSchema } from './common/schemas/user.schema';
import { Content } from './common/dtos/cms/Content.dto';
import { ContentSchema } from './common/schemas/content.schema';
import { ContentType } from './common/dtos/cms/ContentType.dto';
import { ContentTypeSchema } from './common/schemas/content-type.schema';
import { AuthController } from './controllers/auth.controller';
@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoURL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Content.name, schema: ContentSchema },
      { name: ContentType.name, schema: ContentTypeSchema },
    ]),
  ],
  controllers: [AppController, AuthController],
  providers: [
    ContentTypeService,
    ContentService,
    AppService,
    UserService,
    DataService,
  ],
  exports: [MongooseModule],
})
export class AppModule {}
